/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { HairArrangementAggregate } from './Arrangement';

describe('BDD: ヘアアレンジメント集約 (HairArrangementAggregate)', () => {
  let arrangement: HairArrangementAggregate;

  beforeEach(() => {
    arrangement = new HairArrangementAggregate('medium', '#5D4037');
  });

  it('Given 空のキャンバス When お団子を配置する Then アイテムが追加されIDが発行される', () => {
    const item = arrangement.addItem({
      itemId: 'bun_fluffy',
      category: 'bun',
      name: 'ふんわりおだんご',
      x: 30,
      y: 25,
      scale: 1,
      rotation: 0,
    });

    expect(item.id).toBeTruthy();
    expect(arrangement.getItems().length).toBe(1);
    expect(arrangement.getItems()[0].x).toBe(30);
  });

  it('Given 左右対称モード When 左側にお団子を配置する Then 右側にも鏡面対称のお団子が自動で追加される', () => {
    const [left, right] = arrangement.addSymmetricPair({
      itemId: 'bun_fluffy',
      category: 'bun',
      name: 'ふんわりおだんご',
      x: 28,
      y: 25,
      scale: 1,
      rotation: -10,
    });

    expect(left.x).toBe(28);
    expect(right.x).toBe(72); // 100 - 28 = 72
    expect(right.rotation).toBe(10); // Mirrored rotation
    expect(arrangement.getItems().length).toBe(2);
  });

  it('Given 配置されたアイテム When 位置を移動する Then 座標が0〜100%の範囲内に安全に制限されて更新される', () => {
    const item = arrangement.addItem({
      itemId: 'pin_star',
      category: 'pin',
      name: 'お星さまピン',
      x: 50,
      y: 50,
      scale: 1,
      rotation: 0,
    });

    arrangement.updateItemPosition(item.id, 120, -10);
    const updated = arrangement.getItemById(item.id);
    expect(updated?.x).toBe(95); // Clamped max
    expect(updated?.y).toBe(5); // Clamped min
  });

  it('Given 配置されたアイテム When 削除する Then リストから除外される', () => {
    const item = arrangement.addItem({
      itemId: 'pin_star',
      category: 'pin',
      name: 'お星さまピン',
      x: 50,
      y: 50,
      scale: 1,
      rotation: 0,
    });

    expect(arrangement.getItems().length).toBe(1);
    arrangement.removeItem(item.id);
    expect(arrangement.getItems().length).toBe(0);
  });

  it('Given 複数のアイテム When クリアを実行する Then 全アイテムが削除される', () => {
    arrangement.addItem({ itemId: '1', category: 'bun', name: 'お団子', x: 20, y: 20, scale: 1, rotation: 0 });
    arrangement.addItem({ itemId: '2', category: 'pin', name: 'ピン', x: 60, y: 30, scale: 1, rotation: 0 });
    expect(arrangement.getItems().length).toBe(2);

    arrangement.clear();
    expect(arrangement.getItems().length).toBe(0);
  });
});
