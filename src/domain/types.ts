/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type HairLength = 'short' | 'bob' | 'medium' | 'long';

export type HairPartCategory = 'bun' | 'braid' | 'tail' | 'curl';
export type AccessoryCategory = 'ribbon' | 'pin' | 'tiara' | 'flower' | 'sparkle';
export type ItemCategory = HairPartCategory | AccessoryCategory;

export type NuanceType =
  | 'cute_fluffy'   // ふんわりキュート (おだんご、パステルリボン)
  | 'princess'      // おひめさま (みつあみ、ティアラ、パール)
  | 'pop_genki'     // ポップ＆げんき (ツインテール、星、カラフルピン)
  | 'pop_girly'     // げんきポップ＆キラキラガーリー (弾むツインテール、星ピン、キラキラリボン)
  | 'cool_stylish'  // すずしげ＆おとなっぽ (サイドテール、お花、シンプル)
  | 'party';        // きらきらパーティー (ゴージャス、羽、リボン)

export type HairZone =
  | 'top_center'
  | 'top_left'
  | 'top_right'
  | 'side_left'
  | 'side_right'
  | 'back_low'
  | 'bangs'
  | 'free';

export interface HairItemDefinition {
  id: string;
  name: string;
  category: ItemCategory;
  description: string;
  defaultColor?: string;
  thumbnail: string;
  suitableLengths: HairLength[];
  minCountRecommended?: number;
}

export interface PlacedHairItem {
  id: string;
  itemId: string;
  category: ItemCategory;
  name: string;
  x: number; // 0 - 100 (%)
  y: number; // 0 - 100 (%)
  scale: number; // 0.6 - 1.4
  rotation: number; // -180 to 180 degrees
  color?: string;
  isMirrored?: boolean;
}

export interface SavedAlbumEntry {
  id: string;
  clientName: string;
  hairLength: string;
  hairColor: string;
  score: number;
  stars: number;
  stamp: string;
  dateStr: string;
  fashion?: FashionState;
}

export type OutfitStyle = 'princess' | 'sailor' | 'frill' | 'parka' | 'ribbon_camisole' | 'genki_pop';

export type BlushStyle = 'round' | 'heart' | 'star' | 'freckles' | 'none';

export type FaceStickerType = 'none' | 'heart' | 'star' | 'glitter' | 'butterfly';

export interface MakeupState {
  blushColor: string; // e.g. '#FF8A80' or 'none'
  blushStyle: BlushStyle;
  lipColor: string; // e.g. '#D81B60'
  lipGloss: boolean;
  eyeShadowColor: string; // e.g. '#F48FB1' or 'none'
  faceSticker: FaceStickerType;
}

export interface FashionState {
  eyeColor: string;
  outfitStyle: OutfitStyle;
  outfitColor: string;
  makeup: MakeupState;
}

export const DEFAULT_MAKEUP: MakeupState = {
  blushColor: '#FF8A80',
  blushStyle: 'round',
  lipColor: '#D81B60',
  lipGloss: true,
  eyeShadowColor: 'none',
  faceSticker: 'none',
};

export const DEFAULT_FASHION: FashionState = {
  eyeColor: '#5D4037',
  outfitStyle: 'princess',
  outfitColor: '#F8BBD0',
  makeup: DEFAULT_MAKEUP,
};

export interface ClientEvaluationRules {
  targetPartCategory?: HairPartCategory;
  secondaryPartCategory?: HairPartCategory;
  targetAccessoryCategory?: AccessoryCategory;
  secondaryAccessoryCategory?: AccessoryCategory;
  requireSymmetry?: boolean; // 左右対称 (ツインおだんご、ツインみつあみ、両サイドリボンなど)
  targetZone?: HairZone | HairZone[];
  idealPartCount?: { min: number; max: number };
  idealAccessoryCount?: { min: number; max: number };
  targetNuance: NuanceType;
}

export interface ClientRequest {
  id: string;
  clientName: string;
  hairLength: HairLength;
  hairColor: string;
  eyeColor: string;
  outfitColor: string;
  speechText: string;
  nuanceLabel: string;
  targetKeywords: string[];
  rules: ClientEvaluationRules;
  avatarMood: 'excited' | 'smiling' | 'shy' | 'dreamy';
}

export interface CriterionResult {
  criterion: string;
  score: number;
  maxScore: number;
  pass: boolean;
  note: string;
}

export interface ScoreEvaluationResult {
  totalScore: number; // 0 - 100
  stars: 1 | 2 | 3;
  rankTitle: string; // e.g. "カリスマスタイリスト"
  praiseTitle: string; // e.g. "100てんまんてん！"
  comment: string; // kid friendly praise
  criteria: CriterionResult[];
  celebrationLevel: 'bronze' | 'silver' | 'gold' | 'rainbow';
  clientReaction: 'super_happy' | 'happy' | 'smile';
}

export interface StylistAlbumItem {
  id: string;
  createdAt: number;
  clientName: string;
  score: number;
  stars: number;
  thumbnailUrl?: string;
  hairLength: HairLength;
  itemsCount: number;
}
