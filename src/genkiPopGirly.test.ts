/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect } from 'vitest';
import { ALL_ITEMS, getItemDefinition } from './domain/presets/hairAssets';
import { CLIENT_REQUESTS } from './domain/services/ClientCatalog';
import { evaluateHairArrangement } from './domain/services/Scorer';
import { PlacedHairItem, OutfitStyle, NuanceType } from './domain/types';

describe('BDD: げんきポップ × キラキラガーリー スタイル仕様 (Genki Pop & Kirakira Girly Spec)', () => {
  it('Given げんきポップ×キラキラガーリーのアイテム When 定義カタログを確認する Then 弾むポップツインやキャンディピン、ポップスターリボンが存在する', () => {
    const popTail = getItemDefinition('tail_pop_curly');
    const candyPin = getItemDefinition('pin_pop_candy');
    const popRibbon = getItemDefinition('ribbon_pop_neon');

    expect(popTail).toBeDefined();
    expect(popTail?.name).toContain('ポップ');
    expect(popTail?.category).toBe('tail');

    expect(candyPin).toBeDefined();
    expect(candyPin?.name).toContain('キャンディ');
    expect(candyPin?.category).toBe('pin');

    expect(popRibbon).toBeDefined();
    expect(popRibbon?.name).toContain('スターリボン');
    expect(popRibbon?.category).toBe('ribbon');
  });

  it('Given きらりちゃん（げんきポップ×キラキラガーリー希望） When クライアント一覧を確認する Then pop_girly ニュアンスのリクエストが存在する', () => {
    const kirari = CLIENT_REQUESTS.find(c => c.clientName === 'きらりちゃん');
    expect(kirari).toBeDefined();
    expect(kirari?.nuanceLabel).toContain('ポップ');
    expect(kirari?.rules.targetNuance).toBe('pop_girly');
  });

  it('Given げんきポップとお姫様キラキラガーリーをミックスした配置 When スコア採点を行う Then pop_girly ニュアンスで高得点（星3つ）を獲得できる', () => {
    const kirari = CLIENT_REQUESTS.find(c => c.clientName === 'きらりちゃん')!;
    
    // Mix of pop tails (twin symmetry) + star pin + kirakira ribbon
    const mixedItems: PlacedHairItem[] = [
      {
        id: '1',
        itemId: 'tail_pop_curly',
        category: 'tail',
        name: 'ポップツインテールL',
        x: 22,
        y: 35,
        scale: 1,
        rotation: 0,
      },
      {
        id: '2',
        itemId: 'tail_pop_curly',
        category: 'tail',
        name: 'ポップツインテールR',
        x: 78,
        y: 35,
        scale: 1,
        rotation: 0,
        isMirrored: true,
      },
      {
        id: '3',
        itemId: 'pin_pop_candy',
        category: 'pin',
        name: 'キャンディポップピン',
        x: 35,
        y: 28,
        scale: 1,
        rotation: 0,
      },
      {
        id: '4',
        itemId: 'ribbon_pop_neon',
        category: 'ribbon',
        name: 'ポップスターリボン',
        x: 65,
        y: 28,
        scale: 1,
        rotation: 0,
      },
    ];

    const result = evaluateHairArrangement(kirari, mixedItems);
    expect(result.totalScore).toBeGreaterThanOrEqual(85);
    expect(result.stars).toBe(3);
    expect(result.comment.length).toBeGreaterThan(0);
  });
});
