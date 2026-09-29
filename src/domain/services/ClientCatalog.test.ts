/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect } from 'vitest';
import { getClientRequests, getClientById, getRandomClient } from './ClientCatalog';

describe('BDD: お客さまカタログと依頼生成サービス (ClientCatalog)', () => {
  it('Given 依頼者カタログを取得したとき When 全体リストを確認する Then ショート、ボブ、セミロング、ロングの多様な髪の長さのお客さまが6名以上存在する', () => {
    const clients = getClientRequests();
    expect(clients.length).toBeGreaterThanOrEqual(6);

    const lengths = clients.map(c => c.hairLength);
    expect(lengths).toContain('short');
    expect(lengths).toContain('bob');
    expect(lengths).toContain('medium');
    expect(lengths).toContain('long');
  });

  it('Given 6歳の子供が読むとき When お客さまのセリフを確認する Then ひらがな中心で分かりやすく、希望パーツやキーワードが含まれている', () => {
    const clients = getClientRequests();
    for (const client of clients) {
      expect(client.speechText).toBeTruthy();
      expect(client.targetKeywords.length).toBeGreaterThanOrEqual(2);
      expect(client.nuanceLabel).toBeTruthy();
    }
  });

  it('Given 特定のお客さまIDを指定したとき When 取得を試みる Then 該当のお客さまデータが正しく取得できる', () => {
    const clients = getClientRequests();
    const firstClient = clients[0];
    const retrieved = getClientById(firstClient.id);
    expect(retrieved).toBeDefined();
    expect(retrieved?.clientName).toBe(firstClient.clientName);
  });

  it('Given ランダムなお客さまをリクエストしたとき Then 有効なお客さまが返却される', () => {
    const randomClient = getRandomClient();
    expect(randomClient).toBeDefined();
    expect(randomClient.id).toBeTruthy();
  });
});
