/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect } from 'vitest';
import { getClientById } from './ClientCatalog';
import { HairArrangementAggregate } from '../entities/Arrangement';
import { evaluateHairArrangement } from './Scorer';

describe('BDD: 6歳のお子さまのゲームプレイ全フロー検証 (Player Journey)', () => {
  it('Scenario: るなちゃん（ロングヘア）がおひめさまになりたい時、三つ編みとティアラを配置して大成功する', () => {
    // 1. お客さま来店
    const luna = getClientById('client_luna');
    expect(luna).toBeDefined();
    if (!luna) return;

    expect(luna.hairLength).toBe('long');
    expect(luna.targetKeywords).toContain('みつあみ');
    expect(luna.targetKeywords).toContain('ティアラ');

    // 2. スタイリストが三つ編みとティアラを配置
    const aggregate = new HairArrangementAggregate(luna.hairLength, luna.hairColor);

    aggregate.addItem({
      itemId: 'braid_twin',
      category: 'braid',
      name: 'ツインみつあみ',
      x: 35,
      y: 40,
      scale: 1,
      rotation: 0,
    });

    aggregate.addItem({
      itemId: 'tiara_princess_gold',
      category: 'tiara',
      name: 'プリンセスティアラ',
      x: 50,
      y: 18,
      scale: 1,
      rotation: 0,
      color: '#FFD700',
    });

    // 3. 審査・採点
    const result = evaluateHairArrangement(luna, aggregate.getItems());

    // 4. 結果の検証
    expect(result.totalScore).toBeGreaterThanOrEqual(90);
    expect(result.stars).toBe(3);
    expect(result.celebrationLevel).toBe('rainbow');
    expect(result.praiseTitle).toMatch(/(100てん|だいせいこう)/);
    expect(result.comment).toContain('プリンセス');
  });

  it('Scenario: あおいちゃん（ショートヘア）に星ピンとキラキラをたくさん飾って高得点になる', () => {
    const aoi = getClientById('client_aoi');
    expect(aoi).toBeDefined();
    if (!aoi) return;

    expect(aoi.hairLength).toBe('short');

    const aggregate = new HairArrangementAggregate(aoi.hairLength, aoi.hairColor);

    aggregate.addItem({
      itemId: 'pin_star_glitter',
      category: 'pin',
      name: 'きらきら星ピン',
      x: 30,
      y: 28,
      scale: 1,
      rotation: -10,
    });

    aggregate.addItem({
      itemId: 'sparkle_fairy_gold',
      category: 'sparkle',
      name: 'ようせいのきらきら',
      x: 70,
      y: 30,
      scale: 1,
      rotation: 0,
    });

    const result = evaluateHairArrangement(aoi, aggregate.getItems());
    expect(result.totalScore).toBeGreaterThanOrEqual(80);
    expect(result.stars).toBeGreaterThanOrEqual(2);
  });
});
