/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect } from 'vitest';
import { evaluateHairArrangement } from './Scorer';
import { ClientRequest, PlacedHairItem } from '../types';

describe('BDD: ヘアスタイリスト採点サービス (ArrangementScorer)', () => {
  const sampleTwinBunClient: ClientRequest = {
    id: 'req_1',
    clientName: 'ゆめちゃん',
    hairLength: 'medium',
    hairColor: '#4A2E1B',
    eyeColor: '#E65100',
    outfitColor: '#F8BBD0',
    speechText: 'ふんわりツインおだんごでおでかけしたいな♪ かわいいリボンもつけてね！',
    nuanceLabel: 'ふんわりキュート',
    targetKeywords: ['おだんご', 'ツイン', 'リボン'],
    rules: {
      targetPartCategory: 'bun',
      targetAccessoryCategory: 'ribbon',
      requireSymmetry: true,
      idealPartCount: { min: 2, max: 4 },
      idealAccessoryCount: { min: 1, max: 4 },
      targetNuance: 'cute_fluffy',
    },
    avatarMood: 'excited',
  };

  it('Given お客さまがツインおだんご＆リボンを希望している When 左右にお団子とリボンを配置した Then 100点満点・星3つ・カリスマスタイリストになる', () => {
    const placedItems: PlacedHairItem[] = [
      {
        id: '1',
        itemId: 'bun_fluffy_left',
        category: 'bun',
        name: 'ふんわりおだんご',
        x: 28, // left
        y: 25,
        scale: 1,
        rotation: 0,
      },
      {
        id: '2',
        itemId: 'bun_fluffy_right',
        category: 'bun',
        name: 'ふんわりおだんご',
        x: 72, // right
        y: 25,
        scale: 1,
        rotation: 0,
      },
      {
        id: '3',
        itemId: 'ribbon_pink_1',
        category: 'ribbon',
        name: 'ピンクリボン',
        x: 28,
        y: 35,
        scale: 1,
        rotation: 0,
      },
      {
        id: '4',
        itemId: 'ribbon_pink_2',
        category: 'ribbon',
        name: 'ピンクリボン',
        x: 72,
        y: 35,
        scale: 1,
        rotation: 0,
      },
    ];

    const result = evaluateHairArrangement(sampleTwinBunClient, placedItems);

    expect(result.totalScore).toBeGreaterThanOrEqual(95);
    expect(result.stars).toBe(3);
    expect(result.rankTitle).toContain('カリスマ');
    expect(result.celebrationLevel).toBe('rainbow');
    expect(result.criteria.find(c => c.criterion === 'ヘアスタイル')?.pass).toBe(true);
    expect(result.criteria.find(c => c.criterion === 'アクセサリー')?.pass).toBe(true);
    expect(result.criteria.find(c => c.criterion === 'バランス')?.pass).toBe(true);
  });

  it('Given 三つ編みを希望している When お団子しかつけていない Then ヘアスタイル判定で適切なアドバイスがある', () => {
    const braidClient: ClientRequest = {
      ...sampleTwinBunClient,
      speechText: 'みつあみにしてほしいな♪',
      rules: {
        ...sampleTwinBunClient.rules,
        targetPartCategory: 'braid',
      },
    };

    const placedBunsOnly: PlacedHairItem[] = [
      {
        id: '1',
        itemId: 'bun_1',
        category: 'bun',
        name: 'おだんご',
        x: 50,
        y: 25,
        scale: 1,
        rotation: 0,
      },
    ];

    const result = evaluateHairArrangement(braidClient, placedBunsOnly);

    expect(result.totalScore).toBeLessThan(80);
    const styleCriterion = result.criteria.find(c => c.criterion === 'ヘアスタイル');
    expect(styleCriterion?.pass).toBe(false);
  });

  it('Given 6歳の子供向けに点数が低くても優しく温かい励ましのコメントが返る', () => {
    const emptyItems: PlacedHairItem[] = [];
    const result = evaluateHairArrangement(sampleTwinBunClient, emptyItems);

    expect(result.stars).toBe(1);
    expect(result.comment).toBeTruthy();
    // Must be warm and gentle
    expect(result.comment).toContain('ステキ');
  });
});
