/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ClientRequest, PlacedHairItem, ScoreEvaluationResult, CriterionResult } from '../types';

export function evaluateHairArrangement(
  client: ClientRequest,
  placedItems: PlacedHairItem[]
): ScoreEvaluationResult {
  const criteria: CriterionResult[] = [];
  const rules = client.rules;

  // 1. ヘアスタイル（髪パーツ）の判定 (最大35点)
  let styleScore = 0;
  const hairParts = placedItems.filter(item =>
    ['bun', 'braid', 'tail', 'curl'].includes(item.category)
  );

  if (rules.targetPartCategory) {
    const matchingParts = hairParts.filter(p => p.category === rules.targetPartCategory);
    if (matchingParts.length > 0) {
      styleScore += 25;
      if (rules.idealPartCount) {
        if (
          matchingParts.length >= rules.idealPartCount.min &&
          matchingParts.length <= rules.idealPartCount.max
        ) {
          styleScore += 10;
        } else {
          styleScore += 5;
        }
      } else {
        styleScore += 10;
      }
      criteria.push({
        criterion: 'ヘアスタイル',
        score: styleScore,
        maxScore: 35,
        pass: true,
        note: `おねがいの ${getCategoryJapaneseName(rules.targetPartCategory)} がばっちり！`,
      });
    } else {
      styleScore = Math.max(5, hairParts.length > 0 ? 10 : 0);
      criteria.push({
        criterion: 'ヘアスタイル',
        score: styleScore,
        maxScore: 35,
        pass: false,
        note: `${getCategoryJapaneseName(rules.targetPartCategory)} をつけてみてね♪`,
      });
    }
  } else {
    // 自由指定またはアクセサリー中心（ショートヘアなど）
    const minRequired = rules.idealPartCount?.min ?? 0;
    if (minRequired === 0) {
      styleScore = 35;
    } else {
      styleScore = hairParts.length >= minRequired ? 35 : 15;
    }
    criteria.push({
      criterion: 'ヘアスタイル',
      score: styleScore,
      maxScore: 35,
      pass: true,
      note: 'すてきなヘアアレンジ！',
    });
  }

  // 2. アクセサリーの判定 (最大25点)
  let accessoryScore = 0;
  const accessories = placedItems.filter(item =>
    ['ribbon', 'pin', 'tiara', 'flower', 'sparkle'].includes(item.category)
  );

  if (rules.targetAccessoryCategory) {
    const matchingAccessories = accessories.filter(a => a.category === rules.targetAccessoryCategory);
    const matchingSecondary = rules.secondaryAccessoryCategory
      ? accessories.filter(a => a.category === rules.secondaryAccessoryCategory)
      : [];

    if (matchingAccessories.length > 0 || matchingSecondary.length > 0) {
      accessoryScore = 25;
      const matchedName = matchingAccessories.length > 0
        ? getCategoryJapaneseName(rules.targetAccessoryCategory)
        : getCategoryJapaneseName(rules.secondaryAccessoryCategory!);
      criteria.push({
        criterion: 'アクセサリー',
        score: 25,
        maxScore: 25,
        pass: true,
        note: `だいすきな ${matchedName} がかわいい！`,
      });
    } else if (accessories.length > 0) {
      accessoryScore = 15;
      criteria.push({
        criterion: 'アクセサリー',
        score: 15,
        maxScore: 25,
        pass: false,
        note: `${getCategoryJapaneseName(rules.targetAccessoryCategory)} をえらぶともっとすてき！`,
      });
    } else {
      accessoryScore = 5;
      criteria.push({
        criterion: 'アクセサリー',
        score: 5,
        maxScore: 25,
        pass: false,
        note: 'かわいいアクセサリーもかざってみてね♡',
      });
    }
  } else {
    accessoryScore = accessories.length > 0 ? 25 : 10;
    criteria.push({
      criterion: 'アクセサリー',
      score: accessoryScore,
      maxScore: 25,
      pass: true,
      note: 'かわいいデコレーション！',
    });
  }

  // 3. バランス＆対称性の判定 (最大20点)
  let balanceScore = 0;
  const leftItems = placedItems.filter(i => i.x < 45);
  const rightItems = placedItems.filter(i => i.x > 55);

  if (rules.requireSymmetry) {
    const hasBothSides = leftItems.length > 0 && rightItems.length > 0;
    if (hasBothSides) {
      balanceScore = 20;
      criteria.push({
        criterion: 'バランス',
        score: 20,
        maxScore: 20,
        pass: true,
        note: 'みぎとひだりのバランスがばっちり！',
      });
    } else {
      balanceScore = 8;
      criteria.push({
        criterion: 'バランス',
        score: 8,
        maxScore: 20,
        pass: false,
        note: 'りょうがわ（左右）におそろいでつけてみてね！',
      });
    }
  } else {
    balanceScore = placedItems.length > 0 ? 20 : 5;
    criteria.push({
      criterion: 'バランス',
      score: balanceScore,
      maxScore: 20,
      pass: true,
      note: '全体のバランスがとてもおしゃれ！',
    });
  }

  // 4. 髪の長さとの相性 (最大10点)
  let lengthBonus = 10;
  if (client.hairLength === 'short' && hairParts.some(p => p.category === 'tail' && p.scale > 1.2)) {
    lengthBonus = 6;
  }
  criteria.push({
    criterion: 'ながさの相性',
    score: lengthBonus,
    maxScore: 10,
    pass: lengthBonus >= 8,
    note: `${getHairLengthJapaneseName(client.hairLength)} にぴったりなアレンジ！`,
  });

  // 5. ニュアンス・センスボーナス (最大10点)
  let nuanceBonus = placedItems.length >= 2 ? 10 : 5;
  criteria.push({
    criterion: 'ニュアンス',
    score: nuanceBonus,
    maxScore: 10,
    pass: true,
    note: `「${client.nuanceLabel}」なきぶんがたっぷり♪`,
  });

  const totalScore = Math.min(
    100,
    Math.max(20, styleScore + accessoryScore + balanceScore + lengthBonus + nuanceBonus)
  );

  let stars: 1 | 2 | 3 = 1;
  let rankTitle = 'みならいスタイリスト';
  let praiseTitle = 'かわいいアレンジ！';
  let comment = 'いっしょうけんめい つくってくれて ありがとう♡ ステキだよ！';
  let celebrationLevel: 'bronze' | 'silver' | 'gold' | 'rainbow' = 'bronze';
  let clientReaction: 'super_happy' | 'happy' | 'smile' = 'smile';

  if (totalScore >= 95) {
    stars = 3;
    rankTitle = 'まほうのカリスマスタイリスト';
    praiseTitle = '100てんまんてん！';
    if (rules.targetNuance === 'princess') {
      comment = 'わぁぁっ！憧れの プリンセスになれたよ♡ まほうみたいに かわいい！だいすき！';
    } else if (rules.targetNuance === 'cool_stylish') {
      comment = 'すずしげで おとなっぽくて 最高におしゃれ☆ とってもお気に入りだよ！';
    } else if (rules.targetNuance === 'pop_genki') {
      comment = 'げんきいっぱい ポップでかわいすぎるーっ！ありがとう！';
    } else if (rules.targetNuance === 'pop_girly') {
      comment = 'げんきポップとキラキラガーリーが最高にマッチしてアイドルみたい♡ ありがとう！';
    } else {
      comment = `わぁぁっ！まさに「${client.nuanceLabel}」なヘアスタイル！まほうみたいに かわいい♡ だいすき！`;
    }
    celebrationLevel = 'rainbow';
    clientReaction = 'super_happy';
  } else if (totalScore >= 85) {
    stars = 3;
    rankTitle = 'おしゃれカリスマスタイリスト';
    praiseTitle = 'だいせいこう！';
    if (rules.targetNuance === 'princess') {
      comment = 'すてきな プリンセスになれたよ♡ おともだちにも じまんしちゃおうっと♪ ありがとう！';
    } else {
      comment = 'すごくかわいい！おともだちにも じまんしちゃおうっと♪ ありがとう！';
    }
    celebrationLevel = 'gold';
    clientReaction = 'super_happy';
  } else if (totalScore >= 70) {
    stars = 2;
    rankTitle = 'きらめきスタイリスト';
    praiseTitle = 'とってもステキ！';
    comment = 'いいかんじ！きょうのおでかけが もっとたのしみになったよ♡';
    celebrationLevel = 'silver';
    clientReaction = 'happy';
  } else {
    stars = 1;
    rankTitle = 'みならいスタイリスト';
    praiseTitle = 'がんばったね！';
    comment = 'あたらしいじぶんにであえたみたい！もっといろんなアレンジもみてみたいな♪ ステキだよ！';
    celebrationLevel = 'bronze';
    clientReaction = 'smile';
  }

  return {
    totalScore,
    stars,
    rankTitle,
    praiseTitle,
    comment,
    criteria,
    celebrationLevel,
    clientReaction,
  };
}

function getCategoryJapaneseName(cat?: string): string {
  switch (cat) {
    case 'bun':
      return 'おだんご';
    case 'braid':
      return 'みつあみ';
    case 'tail':
      return 'ポニーテール';
    case 'curl':
      return 'カール';
    case 'ribbon':
      return 'リボン';
    case 'pin':
      return 'ヘアピン';
    case 'tiara':
      return 'ティアラ';
    case 'flower':
      return 'お花';
    case 'sparkle':
      return 'きらきらデコ';
    default:
      return 'パーツ';
  }
}

function getHairLengthJapaneseName(length: string): string {
  switch (length) {
    case 'short':
      return 'ショートヘア';
    case 'bob':
      return 'ボブヘア';
    case 'medium':
      return 'セミロング';
    case 'long':
      return 'ロングヘア';
    default:
      return 'かみのけ';
  }
}
