/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { StorageService } from './domain/services/StorageService';
import { getClientRequests } from './domain/services/ClientCatalog';

describe('BDD: リロード時のlocalStorage自動復元検証 (Session Persistence Spec)', () => {
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

  it('Given プレイヤーがリボンとお団子をつけて途中でリロードした時 When セッション復元処理を実行する Then 前回のデコレーション状態が完全に維持される', () => {
    const clients = getClientRequests();
    const targetClient = clients[1];

    // Simulate saving before reload
    StorageService.saveSession({
      clientId: targetClient.id,
      gameMode: 'request',
      freeHairLength: 'bob',
      placedItems: [
        {
          id: 'item-bun-1',
          itemId: 'bun-classic',
          name: 'おだんご',
          category: 'bun',
          x: 25,
          y: 20,
          scale: 1,
          rotation: 0,
        },
        {
          id: 'item-ribbon-1',
          itemId: 'ribbon-pink',
          name: 'ピンクリボン',
          category: 'ribbon',
          x: 25,
          y: 20,
          scale: 1,
          rotation: 0,
        },
      ],
      hairColor: '#DDA0DD',
      isTwinMode: false,
      showGuides: true,
    });

    // Simulate page reload
    const restored = StorageService.loadSession();

    expect(restored).not.toBeNull();
    expect(restored?.clientId).toBe(targetClient.id);
    expect(restored?.placedItems).toHaveLength(2);
    expect(restored?.placedItems?.[0].itemId).toBe('bun-classic');
    expect(restored?.placedItems?.[1].itemId).toBe('ribbon-pink');
    expect(restored?.hairColor).toBe('#DDA0DD');
    expect(restored?.showGuides).toBe(true);
  });
});
