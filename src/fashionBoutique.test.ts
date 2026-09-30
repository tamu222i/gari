/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { StorageService } from './domain/services/StorageService';
import { DEFAULT_FASHION, FashionState } from './domain/types';

describe('BDD: おしゃれ屋さん 目の色・お洋服・メイク着せ替え仕様 (Fashion Boutique Spec)', () => {
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
  });

  it('Given おしゃれ屋さんで目の色とお洋服とメイクを変更した時 When セッション保存と復元を行う Then 選択したファッション状態が永続化される', () => {
    const customFashion: FashionState = {
      eyeColor: '#1E88E5', // サファイアブルー
      outfitStyle: 'sailor', // セーラーワンピース
      outfitColor: '#80DEEA', // スカイサックス
      makeup: {
        blushColor: '#FF8A80',
        blushStyle: 'heart',
        lipColor: '#E91E63',
        lipGloss: true,
        eyeShadowColor: '#F48FB1',
        faceSticker: 'star',
      },
    };

    StorageService.saveSession({
      clientId: 'client_sakura',
      gameMode: 'request',
      freeHairLength: 'long',
      placedItems: [],
      hairColor: '#F48FB1',
      isTwinMode: false,
      showGuides: false,
      fashion: customFashion,
    });

    const restored = StorageService.loadSession();

    expect(restored).not.toBeNull();
    expect(restored?.fashion).toBeDefined();
    expect(restored?.fashion?.eyeColor).toBe('#1E88E5');
    expect(restored?.fashion?.outfitStyle).toBe('sailor');
    expect(restored?.fashion?.outfitColor).toBe('#80DEEA');
    expect(restored?.fashion?.makeup.blushStyle).toBe('heart');
    expect(restored?.fashion?.makeup.faceSticker).toBe('star');
    expect(restored?.fashion?.makeup.eyeShadowColor).toBe('#F48FB1');
  });

  it('Given デフォルトのファッション状態 When 初期値を参照する Then 目の色・ドレス・チーク・リップが設定されている', () => {
    expect(DEFAULT_FASHION.eyeColor).toBe('#5D4037');
    expect(DEFAULT_FASHION.outfitStyle).toBe('princess');
    expect(DEFAULT_FASHION.makeup.blushStyle).toBe('round');
    expect(DEFAULT_FASHION.makeup.lipColor).toBe('#D81B60');
  });
});
