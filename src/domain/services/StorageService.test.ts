/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  StorageService,
  STORAGE_KEY_SESSION,
  STORAGE_KEY_ALBUM,
  StylingSessionState,
} from './StorageService';
import { PlacedHairItem, SavedAlbumEntry } from '../types';

describe('BDD: ローカルストレージ自動保存・復元 (StorageService Spec)', () => {
  let mockStore: Record<string, string> = {};

  beforeEach(() => {
    mockStore = {};
    const mockStorage = {
      getItem: (key: string) => mockStore[key] ?? null,
      setItem: (key: string, value: string) => {
        mockStore[key] = String(value);
      },
      removeItem: (key: string) => {
        delete mockStore[key];
      },
      clear: () => {
        mockStore = {};
      },
      length: 0,
      key: () => null,
    };

    (globalThis as unknown as { window: { localStorage: unknown } }).window = { localStorage: mockStorage };
    (globalThis as unknown as { localStorage: unknown }).localStorage = mockStorage;
    vi.restoreAllMocks();
  });

  const mockPlacedItems: PlacedHairItem[] = [
    {
      id: 'item-1',
      itemId: 'ribbon-pink',
      name: 'ピンクリボン',
      category: 'ribbon',
      x: 30,
      y: 40,
      scale: 1.2,
      rotation: 15,
    },
  ];

  const mockSession: StylingSessionState = {
    clientId: 'client-sakura',
    gameMode: 'request',
    freeHairLength: 'long',
    placedItems: mockPlacedItems,
    hairColor: '#FF69B4',
    isTwinMode: true,
    showGuides: true,
  };

  it('Given スタイリング中のデータ When saveSession を実行する Then localStorage にJSON形式で保存される', () => {
    StorageService.saveSession(mockSession);

    const storedRaw = localStorage.getItem(STORAGE_KEY_SESSION);
    expect(storedRaw).not.toBeNull();
    const parsed = JSON.parse(storedRaw!);
    expect(parsed.clientId).toBe('client-sakura');
    expect(parsed.placedItems).toHaveLength(1);
    expect(parsed.placedItems[0].itemId).toBe('ribbon-pink');
    expect(parsed.hairColor).toBe('#FF69B4');
    expect(parsed.isTwinMode).toBe(true);
  });

  it('Given 保存済みのセッションデータ When loadSession を実行する Then リロード後も前回の状態を正確に復元できる', () => {
    StorageService.saveSession(mockSession);

    const loaded = StorageService.loadSession();
    expect(loaded).not.toBeNull();
    expect(loaded?.clientId).toBe('client-sakura');
    expect(loaded?.placedItems).toEqual(mockPlacedItems);
    expect(loaded?.hairColor).toBe('#FF69B4');
    expect(loaded?.gameMode).toBe('request');
    expect(loaded?.freeHairLength).toBe('long');
  });

  it('Given ストレージが空または破損したデータの場合 When loadSession を実行する Then クラッシュせず null またはデフォルト値を安全に返す', () => {
    localStorage.setItem(STORAGE_KEY_SESSION, 'INVALID_JSON{[[');

    const loaded = StorageService.loadSession();
    expect(loaded).toBeNull();
  });

  it('Given アルバム保存データ When saveAlbum と loadAlbum を実行する Then 写真データが永続化される', () => {
    const mockAlbum: SavedAlbumEntry[] = [
      {
        id: 'album-1',
        clientName: 'さくらちゃん',
        hairLength: 'long',
        hairColor: '#FF69B4',
        score: 95,
        stars: 3,
        stamp: 'たいへんよくできました',
        dateStr: '9/29',
      },
    ];

    StorageService.saveAlbum(mockAlbum);
    const loaded = StorageService.loadAlbum();
    expect(loaded).toHaveLength(1);
    expect(loaded[0].clientName).toBe('さくらちゃん');
    expect(loaded[0].score).toBe(95);
  });

  it('Given clearSession を実行する When セッションが削除される Then placedItemsやセッション設定のみクリアされる', () => {
    StorageService.saveSession(mockSession);
    expect(StorageService.loadSession()).not.toBeNull();

    StorageService.clearSession();
    expect(StorageService.loadSession()).toBeNull();
  });
});
