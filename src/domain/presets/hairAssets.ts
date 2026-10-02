/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HairItemDefinition } from '../types';

export const HAIR_PART_DEFINITIONS: HairItemDefinition[] = [
  // おだんご (buns)
  {
    id: 'bun_fluffy',
    name: 'ふんわりおだんご',
    category: 'bun',
    description: 'ふわっと まるい かわいいおだんご',
    thumbnail: 'bun_fluffy',
    suitableLengths: ['medium', 'long'],
  },
  {
    id: 'bun_mini_twin',
    name: 'ちょこんとおだんご',
    category: 'bun',
    description: 'ちいさくて キュートなおだんご',
    thumbnail: 'bun_mini',
    suitableLengths: ['short', 'bob', 'medium', 'long'],
  },
  {
    id: 'bun_rose',
    name: 'ローズおだんご',
    category: 'bun',
    description: 'バラのはなびらみたいな おだんご',
    thumbnail: 'bun_rose',
    suitableLengths: ['medium', 'long'],
  },

  // みつあみ (braids)
  {
    id: 'braid_twin',
    name: 'ツインみつあみ',
    category: 'braid',
    description: 'おさげが かわいいみつあみ',
    thumbnail: 'braid_twin',
    suitableLengths: ['bob', 'medium', 'long'],
  },
  {
    id: 'braid_crown',
    name: 'カチューシャみつあみ',
    category: 'braid',
    description: 'あたまのうえを ぐるっとかざるみつあみ',
    thumbnail: 'braid_crown',
    suitableLengths: ['medium', 'long'],
  },
  {
    id: 'braid_loose',
    name: 'ゆるふわサイドあみ',
    category: 'braid',
    description: 'サイドにたらす おしゃれなみつあみ',
    thumbnail: 'braid_loose',
    suitableLengths: ['medium', 'long'],
  },

  // ポニーテール・ツインテール (tails)
  {
    id: 'tail_high_pony',
    name: 'たかめポニーテール',
    category: 'tail',
    description: 'すずしげで げんきなポニーテール',
    thumbnail: 'tail_high',
    suitableLengths: ['medium', 'long'],
  },
  {
    id: 'tail_twintail',
    name: 'ふわふわツインテール',
    category: 'tail',
    description: 'ゆれる かわいいツインテール',
    thumbnail: 'tail_twin',
    suitableLengths: ['bob', 'medium', 'long'],
  },
  {
    id: 'tail_side_pony',
    name: 'サイドポニー',
    category: 'tail',
    description: 'よこで ゆれる おとなっぽテール',
    thumbnail: 'tail_side',
    suitableLengths: ['medium', 'long'],
  },
  {
    id: 'tail_pop_curly',
    name: 'ポップカールツイン',
    category: 'tail',
    description: 'ぴょんぴょん弾む ポップで元気なカールツインテール',
    thumbnail: 'tail_pop',
    suitableLengths: ['short', 'bob', 'medium', 'long'],
  },

  // カール (curls)
  {
    id: 'curl_wavy',
    name: 'ふんわりウェーブ',
    category: 'curl',
    description: 'やさしく ゆれる ウェーブカール',
    thumbnail: 'curl_wavy',
    suitableLengths: ['bob', 'medium', 'long'],
  },
  {
    id: 'curl_spiral',
    name: 'プリンセスカール',
    category: 'curl',
    description: 'くるくる まほうの おひめさまカール',
    thumbnail: 'curl_spiral',
    suitableLengths: ['medium', 'long'],
  },
];

export const ACCESSORY_DEFINITIONS: HairItemDefinition[] = [
  // リボン (ribbons)
  {
    id: 'ribbon_pink_chiffon',
    name: 'ピンクリボン',
    category: 'ribbon',
    description: 'ふんわり サテンのピンクリボン',
    defaultColor: '#FF69B4',
    thumbnail: 'ribbon_pink',
    suitableLengths: ['short', 'bob', 'medium', 'long'],
  },
  {
    id: 'ribbon_lavender_big',
    name: 'ラベンダーリボン',
    category: 'ribbon',
    description: 'おひめさまカラーの おおきなリボン',
    defaultColor: '#BA68C8',
    thumbnail: 'ribbon_lavender',
    suitableLengths: ['short', 'bob', 'medium', 'long'],
  },
  {
    id: 'ribbon_mint_twin',
    name: 'ミントリボン',
    category: 'ribbon',
    description: 'さわやかな ミントグリーンのリボン',
    defaultColor: '#4DB6AC',
    thumbnail: 'ribbon_mint',
    suitableLengths: ['short', 'bob', 'medium', 'long'],
  },
  {
    id: 'ribbon_ruby_red',
    name: 'ルビーリボン',
    category: 'ribbon',
    description: 'あざやかな まっ赤なリボン',
    defaultColor: '#E91E63',
    thumbnail: 'ribbon_ruby',
    suitableLengths: ['short', 'bob', 'medium', 'long'],
  },
  {
    id: 'ribbon_pop_neon',
    name: 'ポップスターリボン',
    category: 'ribbon',
    description: 'お星さまジュエルがついた元気なビビッドリボン',
    defaultColor: '#FF4081',
    thumbnail: 'ribbon_pop',
    suitableLengths: ['short', 'bob', 'medium', 'long'],
  },

  // ヘアピン・クリップ (pins)
  {
    id: 'pin_star_glitter',
    name: 'きらきら星ピン',
    category: 'pin',
    description: 'おほしさまが キラッとひかるヘアピン',
    defaultColor: '#FFD54F',
    thumbnail: 'pin_star',
    suitableLengths: ['short', 'bob', 'medium', 'long'],
  },
  {
    id: 'pin_pop_candy',
    name: 'キャンディポップピン',
    category: 'pin',
    description: 'カラフルなペロペロキャンディと星のキュートピン',
    defaultColor: '#FF4081',
    thumbnail: 'pin_candy',
    suitableLengths: ['short', 'bob', 'medium', 'long'],
  },
  {
    id: 'pin_heart_jewel',
    name: 'ハートジュエルピン',
    category: 'pin',
    description: 'ルビーのハートが かわいいクリップ',
    defaultColor: '#F06292',
    thumbnail: 'pin_heart',
    suitableLengths: ['short', 'bob', 'medium', 'long'],
  },
  {
    id: 'pin_strawberry',
    name: 'いちごクリップ',
    category: 'pin',
    description: 'あまーい いちごのキュートクリップ',
    defaultColor: '#FF1744',
    thumbnail: 'pin_strawberry',
    suitableLengths: ['short', 'bob', 'medium', 'long'],
  },

  // ティアラ・かんむり (tiaras)
  {
    id: 'tiara_princess_gold',
    name: 'プリンセスティアラ',
    category: 'tiara',
    description: 'きらめく ゴールドのティアラ',
    defaultColor: '#FFD700',
    thumbnail: 'tiara_gold',
    suitableLengths: ['short', 'bob', 'medium', 'long'],
  },
  {
    id: 'tiara_pearl_band',
    name: 'パールカチューシャ',
    category: 'tiara',
    description: 'まあるい パールのカチューシャ',
    defaultColor: '#ECEFF1',
    thumbnail: 'tiara_pearl',
    suitableLengths: ['short', 'bob', 'medium', 'long'],
  },

  // お花 (flowers)
  {
    id: 'flower_cherry_pink',
    name: 'さくらのお花',
    category: 'flower',
    description: 'やさしい ピンクのさくらの花かざり',
    defaultColor: '#F48FB1',
    thumbnail: 'flower_cherry',
    suitableLengths: ['short', 'bob', 'medium', 'long'],
  },
  {
    id: 'flower_sun_daisy',
    name: 'マーガレット',
    category: 'flower',
    description: 'しろい はなびらが かわいいマーガレット',
    defaultColor: '#FFFFFF',
    thumbnail: 'flower_daisy',
    suitableLengths: ['short', 'bob', 'medium', 'long'],
  },

  // きらきらデコ (sparkles)
  {
    id: 'sparkle_fairy_gold',
    name: 'ようせいのきらきら',
    category: 'sparkle',
    description: 'ふわりと まう まほうの光',
    defaultColor: '#FFF176',
    thumbnail: 'sparkle_stars',
    suitableLengths: ['short', 'bob', 'medium', 'long'],
  },
  {
    id: 'sparkle_heart_shower',
    name: 'ハートのシャワー',
    category: 'sparkle',
    description: 'ちいさなハートが いっぱい！',
    defaultColor: '#F8BBD0',
    thumbnail: 'sparkle_hearts',
    suitableLengths: ['short', 'bob', 'medium', 'long'],
  },
];

export const ALL_ITEMS = [...HAIR_PART_DEFINITIONS, ...ACCESSORY_DEFINITIONS];

export function getItemDefinition(id: string): HairItemDefinition | undefined {
  return ALL_ITEMS.find(item => item.id === id);
}
