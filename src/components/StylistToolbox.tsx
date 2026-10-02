/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  HairItemDefinition,
  ItemCategory,
  HairLength,
  FashionState,
  OutfitStyle,
  BlushStyle,
  FaceStickerType,
} from '../domain/types';
import {
  HAIR_PART_DEFINITIONS,
  ACCESSORY_DEFINITIONS,
} from '../domain/presets/hairAssets';
import { playCutePop, playSparkleSound } from '../utils/audio';
import {
  Sparkles,
  Undo2,
  RotateCcw,
  HelpCircle,
  Check,
  Palette,
  Info,
  X,
  Heart,
  Eye,
  Shirt,
  Smile,
} from 'lucide-react';

interface StylistToolboxProps {
  currentHairLength: HairLength;
  currentHairColor: string;
  fashion: FashionState;
  selectedTool: HairItemDefinition | null;
  isTwinMode: boolean;
  showGuides: boolean;
  onSelectTool: (item: HairItemDefinition | null) => void;
  onToggleTwinMode: () => void;
  onToggleGuides: () => void;
  onUndo: () => void;
  onClear: () => void;
  onChangeHairColor: (color: string) => void;
  onChangeFashion: (updater: (prev: FashionState) => FashionState) => void;
}

type MainCategoryTab = 'parts' | 'accessories' | 'makeup' | 'fashion';

export const StylistToolbox: React.FC<StylistToolboxProps> = ({
  currentHairLength,
  currentHairColor,
  fashion,
  selectedTool,
  isTwinMode,
  showGuides,
  onSelectTool,
  onToggleTwinMode,
  onToggleGuides,
  onUndo,
  onClear,
  onChangeHairColor,
  onChangeFashion,
}) => {
  // Main category tab: 'parts' (ヘアパーツ) | 'accessories' (アクセサリー) | 'makeup' (メイク＆アイ) | 'fashion' (お洋服＆カラー)
  const [mainTab, setMainTab] = useState<MainCategoryTab>('parts');

  // Sub category filters
  const [subPartCategory, setSubPartCategory] = useState<string>('all');
  const [subAccCategory, setSubAccCategory] = useState<string>('all');
  const [makeupSubTab, setMakeupSubTab] = useState<'eye' | 'blush' | 'lip' | 'face'>('eye');
  const [fashionSubTab, setFashionSubTab] = useState<'outfit' | 'outfitColor' | 'hairColor'>('outfit');

  // Hair color presets
  const hairColorPresets = [
    { name: 'ショコラ', hex: '#5D4037' },
    { name: 'サクラピンク', hex: '#F48FB1' },
    { name: 'ハニーゴールド', hex: '#FFB74D' },
    { name: 'ミルクティー', hex: '#A1887F' },
    { name: 'ラベンダー', hex: '#D1C4E9' },
    { name: 'ミッドナイト', hex: '#263238' },
    { name: 'パステルミント', hex: '#80CBC4' },
    { name: 'ストロベリー赤', hex: '#E91E63' },
  ];

  // Eye color presets
  const eyeColorPresets = [
    { name: 'ショコラ茶', hex: '#5D4037', emoji: '🍫' },
    { name: 'サファイア青', hex: '#1E88E5', emoji: '💎' },
    { name: 'ルビーピンク', hex: '#E91E63', emoji: '💖' },
    { name: 'エメラルド緑', hex: '#2E7D32', emoji: '🌿' },
    { name: 'アメジスト紫', hex: '#8E24AA', emoji: '💜' },
    { name: 'アンバー金', hex: '#F57F17', emoji: '🍯' },
    { name: 'ナイトブラック', hex: '#212121', emoji: '🌌' },
    { name: 'アクア水色', hex: '#00BCD4', emoji: '🩵' },
  ];

  // Outfit styles
  const outfitStyleOptions: { id: OutfitStyle; name: string; icon: string; desc: string }[] = [
    { id: 'princess', name: 'プリンセスドレス', icon: '👑', desc: 'オフショルダーと大きなリボンの王道お姫様ドレス' },
    { id: 'genki_pop', name: 'げんきポップアイドルワンピ', icon: '🌟', desc: '星バッジとフリルが弾ける元気いっぱいなアイドルワンピ' },
    { id: 'sailor', name: 'セーラーワンピ', icon: '⚓', desc: '白襟とタイリボンがキュートなマリン風ワンピース' },
    { id: 'frill', name: 'ロリータブラウス', icon: '🎀', desc: 'フリルとアンティークブローチの華やかブラウス' },
    { id: 'parka', name: 'くま耳パーカー', icon: '🧸', desc: 'ポンポン紐とポケットがついたカジュアルガーリー' },
    { id: 'ribbon_camisole', name: 'キャミソールワンピ', icon: '🌸', desc: 'レースストラップとミニリボンの爽やかキャミワンピ' },
  ];

  // Outfit colors
  const outfitColorPresets = [
    { name: 'プリンセスピンク', hex: '#F8BBD0' },
    { name: 'スカイサックス', hex: '#80DEEA' },
    { name: 'ラベンダー', hex: '#D1C4E9' },
    { name: 'ミントグリーン', hex: '#A7FFEB' },
    { name: 'レモンイエロー', hex: '#FFF59D' },
    { name: 'ピュアホワイト', hex: '#FFFFFF' },
    { name: 'ストロベリー赤', hex: '#FF4081' },
    { name: 'ナイトブラック', hex: '#37474F' },
  ];

  // Blush styles & colors
  const blushStyleOptions: { id: BlushStyle; name: string; icon: string }[] = [
    { id: 'round', name: 'ふんわり丸チーク', icon: '🌸' },
    { id: 'heart', name: 'ハートチーク', icon: '❤️' },
    { id: 'star', name: 'お星さまチーク', icon: '⭐' },
    { id: 'freckles', name: 'そばかすチーク', icon: '🍓' },
    { id: 'none', name: 'チークなし', icon: '🚫' },
  ];

  const blushColorPresets = [
    { name: 'ふんわりピンク', hex: '#FF8A80' },
    { name: 'コーラルピーチ', hex: '#FF7043' },
    { name: 'ラベンダー', hex: '#CE93D8' },
    { name: 'キャンディ赤', hex: '#E53935' },
  ];

  // Lip colors
  const lipColorPresets = [
    { name: 'ベビーピンク', hex: '#FF80AB' },
    { name: 'チェリーレッド', hex: '#D81B60' },
    { name: 'ぷるぷるピーチ', hex: '#FF7043' },
    { name: 'ローズピンク', hex: '#C2185B' },
    { name: 'ナチュラル', hex: '#FFAB91' },
  ];

  // Eye shadow colors
  const eyeShadowPresets = [
    { name: 'なし', hex: 'none' },
    { name: 'シャイニーピンク', hex: '#F48FB1' },
    { name: 'パールゴールド', hex: '#FFE082' },
    { name: 'ラベンダー', hex: '#E1BEE7' },
    { name: 'スカイブルー', hex: '#B3E5FC' },
  ];

  // Face stickers
  const faceStickerOptions: { id: FaceStickerType; name: string; icon: string }[] = [
    { id: 'none', name: 'シールなし', icon: '🚫' },
    { id: 'heart', name: 'ハートシール', icon: '❤️' },
    { id: 'star', name: 'スターシール', icon: '⭐' },
    { id: 'glitter', name: 'キラキララメ', icon: '✨' },
    { id: 'butterfly', name: 'ちょうちょ', icon: '🦋' },
  ];

  const partSubTabs = [
    { id: 'all', label: 'ぜんぶ', icon: '✨' },
    { id: 'bun', label: 'おだんご', icon: '🍡' },
    { id: 'braid', label: 'みつあみ', icon: '🥨' },
    { id: 'tail', label: 'テール', icon: '🦄' },
    { id: 'curl', label: 'カール', icon: '🌀' },
  ];

  const accSubTabs = [
    { id: 'all', label: 'ぜんぶ', icon: '✨' },
    { id: 'ribbon', label: 'リボン', icon: '🎀' },
    { id: 'pin', label: 'ヘアピン', icon: '⭐' },
    { id: 'tiara', label: 'ティアラ', icon: '👑' },
    { id: 'flower', label: 'お花', icon: '🌸' },
    { id: 'sparkle', label: 'きらきら', icon: '💫' },
  ];

  const filteredItems = useMemo(() => {
    if (mainTab === 'parts') {
      if (subPartCategory === 'all') return HAIR_PART_DEFINITIONS;
      return HAIR_PART_DEFINITIONS.filter(item => item.category === subPartCategory);
    }
    if (mainTab === 'accessories') {
      if (subAccCategory === 'all') return ACCESSORY_DEFINITIONS;
      return ACCESSORY_DEFINITIONS.filter(item => item.category === subAccCategory);
    }
    return [];
  }, [mainTab, subPartCategory, subAccCategory]);

  const getItemEmoji = (itemOrCategory: HairItemDefinition | ItemCategory) => {
    const category = typeof itemOrCategory === 'string' ? itemOrCategory : itemOrCategory.category;
    const id = typeof itemOrCategory === 'object' ? itemOrCategory.id : '';

    if (id === 'pin_pop_candy') return '🍭';
    if (id === 'ribbon_pop_neon') return '🎀';
    if (id === 'tail_pop_curly') return '🦄';

    switch (category) {
      case 'bun':
        return '🍡';
      case 'braid':
        return '🥨';
      case 'tail':
        return '🦄';
      case 'curl':
        return '🌀';
      case 'ribbon':
        return '🎀';
      case 'pin':
        return '⭐';
      case 'tiara':
        return '👑';
      case 'flower':
        return '🌸';
      case 'sparkle':
        return '✨';
      default:
        return '✨';
    }
  };

  const translateLength = (len: HairLength) => {
    switch (len) {
      case 'short':
        return 'ショート';
      case 'bob':
        return 'ボブ';
      case 'medium':
        return 'セミロング';
      case 'long':
        return 'ロング';
    }
  };

  return (
    <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl border-3 border-pink-200 shadow-xl p-3 sm:p-5 flex flex-col gap-3.5">
      {/* 1. Header controls: Twin Mode, Guides, Undo, Clear */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-pink-100 pb-3">
        <div className="flex items-center gap-2">
          {/* Twin Symmetry Button */}
          <button
            type="button"
            onClick={() => {
              onToggleTwinMode();
              playCutePop();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-sm ${
              isTwinMode
                ? 'bg-pink-500 text-white shadow-pink-200 ring-2 ring-pink-300 scale-105'
                : 'bg-pink-100/80 text-pink-700 hover:bg-pink-200/80'
            }`}
          >
            <span>👯‍♀️</span>
            <span>左右おそろい</span>
            {isTwinMode && <Check className="w-3.5 h-3.5 inline stroke-[3]" />}
          </button>

          {/* Guide Spots Toggle */}
          <button
            type="button"
            onClick={() => {
              onToggleGuides();
              playCutePop();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-sm ${
              showGuides
                ? 'bg-purple-500 text-white ring-2 ring-purple-300'
                : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>つけ場所ガイド</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Undo */}
          <button
            type="button"
            onClick={() => {
              onUndo();
              playCutePop();
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold transition-colors"
            title="ひとつもどす"
          >
            <Undo2 className="w-3.5 h-3.5" />
            <span>もどす</span>
          </button>

          {/* Clear */}
          <button
            type="button"
            onClick={() => {
              onClear();
              playCutePop();
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs sm:text-sm font-bold transition-colors"
            title="ぜんぶはずす"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>クリア</span>
          </button>
        </div>
      </div>

      {/* 2. Main Classification Tabs (4大おしゃれ屋さんタブ) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-pink-50/80 p-1.5 rounded-2xl border border-pink-100">
        <button
          type="button"
          onClick={() => {
            setMainTab('parts');
            playCutePop();
          }}
          className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
            mainTab === 'parts'
              ? 'bg-white text-pink-700 shadow-md scale-[1.02] border border-pink-200'
              : 'text-slate-600 hover:text-pink-600 hover:bg-pink-100/50'
          }`}
        >
          <span className="text-base">💇‍♀️</span>
          <span>ヘアパーツ</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setMainTab('accessories');
            playCutePop();
          }}
          className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
            mainTab === 'accessories'
              ? 'bg-white text-pink-700 shadow-md scale-[1.02] border border-pink-200'
              : 'text-slate-600 hover:text-pink-600 hover:bg-pink-100/50'
          }`}
        >
          <span className="text-base">🎀</span>
          <span>アクセサリー</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setMainTab('makeup');
            playCutePop();
          }}
          className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
            mainTab === 'makeup'
              ? 'bg-white text-pink-700 shadow-md scale-[1.02] border border-pink-200'
              : 'text-slate-600 hover:text-pink-600 hover:bg-pink-100/50'
          }`}
        >
          <span className="text-base">💄</span>
          <span>メイク＆アイ</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setMainTab('fashion');
            playCutePop();
          }}
          className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
            mainTab === 'fashion'
              ? 'bg-white text-pink-700 shadow-md scale-[1.02] border border-pink-200'
              : 'text-slate-600 hover:text-pink-600 hover:bg-pink-100/50'
          }`}
        >
          <span className="text-base">👗</span>
          <span>お洋服＆カラー</span>
        </button>
      </div>

      {/* 3. Sub-Category Filter Tabs (ヘアパーツ または アクセサリー選択時) */}
      {mainTab === 'parts' && (
        <div className="flex items-center gap-1.5 overflow-x-auto touch-pan-x overscroll-x-contain pb-1 scrollbar-thin scrollbar-thumb-pink-200">
          {partSubTabs.map(tab => {
            const isActive = subPartCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setSubPartCategory(tab.id);
                  playCutePop();
                }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? 'bg-pink-500 text-white shadow-sm ring-1 ring-pink-300'
                    : 'bg-pink-50 text-pink-700 hover:bg-pink-100'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {mainTab === 'accessories' && (
        <div className="flex items-center gap-1.5 overflow-x-auto touch-pan-x overscroll-x-contain pb-1 scrollbar-thin scrollbar-thumb-pink-200">
          {accSubTabs.map(tab => {
            const isActive = subAccCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setSubAccCategory(tab.id);
                  playCutePop();
                }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? 'bg-pink-500 text-white shadow-sm ring-1 ring-pink-300'
                    : 'bg-pink-50 text-pink-700 hover:bg-pink-100'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* 4. Detail Explanation Box for Selected Tool (説明文が絶対に切れない詳細表示エリア) */}
      {selectedTool ? (
        <div className="bg-gradient-to-r from-pink-50 via-purple-50/70 to-pink-50 border-2 border-pink-300/80 rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col gap-2 transition-all">
          <div className="flex items-center justify-between gap-2 border-b border-pink-200/60 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl p-1 bg-white rounded-xl shadow-xs border border-pink-200">
                {getItemEmoji(selectedTool)}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-black text-slate-800">
                    {selectedTool.name}
                  </span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-pink-500 text-white">
                    せんたく中♡
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                  <span className="text-[11px] font-bold text-pink-700">おすすめの長さ：</span>
                  {selectedTool.suitableLengths.map(len => (
                    <span
                      key={len}
                      className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                        len === currentHairLength
                          ? 'bg-pink-600 text-white shadow-xs'
                          : 'bg-pink-100 text-pink-700'
                      }`}
                    >
                      {translateLength(len)}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectTool(null)}
              className="p-1.5 rounded-xl bg-white/80 hover:bg-white text-slate-500 hover:text-slate-700 transition-colors border border-pink-200"
              title="選択を解除する"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Full description text with zero truncation (すべての説明文を改行含めて全表示) */}
          <div className="bg-white/90 rounded-xl p-2.5 border border-pink-200/50">
            <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed whitespace-pre-wrap">
              {selectedTool.description}
            </p>
          </div>

          {/* Interactive touch hint */}
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold text-pink-700 bg-pink-100/60 px-2.5 py-1.5 rounded-xl">
            <Sparkles className="w-3.5 h-3.5 text-pink-500 shrink-0" />
            <span>
              {isTwinMode
                ? '👯‍♀️ 左右おそろいON：キャンバスをタップすると反対側にも同時にパーツがつきます♪'
                : '💡 キャンバスをタップして配置するか、好きな位置までドラッグしてつけてね！'}
            </span>
          </div>
        </div>
      ) : (
        <div className="bg-pink-50/50 rounded-2xl border border-pink-200/50 p-2.5 sm:p-3 flex items-center gap-2.5 text-xs font-bold text-pink-700">
          <Info className="w-4 h-4 text-pink-400 shrink-0" />
          <span>
            {mainTab === 'makeup'
              ? 'お好みのアイカラー・チーク・リップ・フェイスシールを選んでメイクアップしてね♡'
              : mainTab === 'fashion'
              ? 'お洋服のデザイン・お洋服の色・髪色スプレーを選んで全身コーディネートしよう♪'
              : 'パーツやアクセサリーをタップして選んでね！ここに詳しい部位の説明が表示されるよ♡'}
          </span>
        </div>
      )}

      {/* 5. CONTENT PANELS ACCORDING TO ACTIVE MAIN TAB */}

      {/* --- TAB 1 & 2: HAIR PARTS & ACCESSORIES --- */}
      {(mainTab === 'parts' || mainTab === 'accessories') && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-2.5 max-h-[260px] md:max-h-[300px] overflow-y-auto pr-1">
          {filteredItems.map(item => {
            const isSelected = selectedTool?.id === item.id;
            const isSuitable = item.suitableLengths.includes(currentHairLength);

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (isSelected) {
                    onSelectTool(null);
                  } else {
                    onSelectTool(item);
                    playSparkleSound();
                  }
                }}
                className={`relative flex items-start gap-2 p-2.5 rounded-2xl border-2 text-left transition-all active:scale-95 ${
                  isSelected
                    ? 'border-pink-500 bg-gradient-to-r from-pink-50 to-purple-50 shadow-md ring-2 ring-pink-300'
                    : 'border-pink-100 bg-white/80 hover:border-pink-300 hover:bg-pink-50/40'
                }`}
              >
                <div className="w-11 h-11 rounded-xl bg-pink-100/50 flex items-center justify-center p-1 shrink-0 border border-pink-200/60 shadow-inner">
                  <span className="text-2xl select-none">
                    {getItemEmoji(item)}
                  </span>
                </div>

                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <span className="text-xs sm:text-sm font-black text-slate-800 leading-tight">
                      {item.name}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-pink-500 shrink-0 animate-ping" />
                    )}
                  </div>
                  {/* Clean readable description without truncate clipping */}
                  <span className="text-[11px] text-pink-600/90 font-medium leading-snug line-clamp-2 mt-0.5">
                    {item.description}
                  </span>
                </div>

                {!isSuitable && (
                  <span className="absolute top-1 right-1 text-[9px] font-bold text-amber-700 bg-amber-100/90 px-1 rounded shadow-2xs">
                    おすすめ外
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* --- TAB 3: MAKEUP & EYE COLOR (メイク＆アイ) --- */}
      {mainTab === 'makeup' && (
        <div className="flex flex-col gap-3">
          {/* Makeup Sub Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto touch-pan-x overscroll-x-contain pb-1">
            <button
              type="button"
              onClick={() => setMakeupSubTab('eye')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                makeupSubTab === 'eye'
                  ? 'bg-pink-500 text-white shadow-sm ring-1 ring-pink-300'
                  : 'bg-pink-50 text-pink-700 hover:bg-pink-100'
              }`}
            >
              <span>👁️</span>
              <span>目の色 (カラコン)</span>
            </button>
            <button
              type="button"
              onClick={() => setMakeupSubTab('blush')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                makeupSubTab === 'blush'
                  ? 'bg-pink-500 text-white shadow-sm ring-1 ring-pink-300'
                  : 'bg-pink-50 text-pink-700 hover:bg-pink-100'
              }`}
            >
              <span>🌸</span>
              <span>チーク (ほっぺ)</span>
            </button>
            <button
              type="button"
              onClick={() => setMakeupSubTab('lip')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                makeupSubTab === 'lip'
                  ? 'bg-pink-500 text-white shadow-sm ring-1 ring-pink-300'
                  : 'bg-pink-50 text-pink-700 hover:bg-pink-100'
              }`}
            >
              <span>💋</span>
              <span>リップ (くちびる)</span>
            </button>
            <button
              type="button"
              onClick={() => setMakeupSubTab('face')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                makeupSubTab === 'face'
                  ? 'bg-pink-500 text-white shadow-sm ring-1 ring-pink-300'
                  : 'bg-pink-50 text-pink-700 hover:bg-pink-100'
              }`}
            >
              <span>✨</span>
              <span>アイシャドウ・シール</span>
            </button>
          </div>

          {/* Sub Panel 1: Eye Color */}
          {makeupSubTab === 'eye' && (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-black text-slate-700">お好みの瞳の色を選んでね：</span>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {eyeColorPresets.map(preset => {
                  const isCurrent = fashion.eyeColor === preset.hex;
                  return (
                    <button
                      key={preset.hex}
                      type="button"
                      onClick={() => {
                        onChangeFashion(prev => ({ ...prev, eyeColor: preset.hex }));
                        playSparkleSound();
                      }}
                      className={`flex flex-col items-center gap-1 p-2 rounded-2xl border-2 transition-transform active:scale-95 ${
                        isCurrent
                          ? 'border-pink-500 bg-pink-50 scale-105 shadow-md ring-2 ring-pink-300'
                          : 'border-slate-200 bg-white hover:border-pink-300'
                      }`}
                    >
                      <div
                        className="w-10 h-10 rounded-full shadow-inner border border-black/10 flex items-center justify-center relative"
                        style={{ backgroundColor: preset.hex }}
                      >
                        <span className="text-xs">{preset.emoji}</span>
                        {isCurrent && <Check className="w-5 h-5 text-white drop-shadow stroke-[3] absolute" />}
                      </div>
                      <span className="text-[10px] font-bold text-slate-700 text-center leading-tight">
                        {preset.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sub Panel 2: Blush (ほっぺ) */}
          {makeupSubTab === 'blush' && (
            <div className="flex flex-col gap-3">
              <div>
                <span className="text-xs font-black text-slate-700">チークのかたち：</span>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-1.5">
                  {blushStyleOptions.map(style => {
                    const isSelected = fashion.makeup.blushStyle === style.id;
                    return (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => {
                          onChangeFashion(prev => ({
                            ...prev,
                            makeup: { ...prev.makeup, blushStyle: style.id },
                          }));
                          playCutePop();
                        }}
                        className={`flex items-center gap-1.5 p-2 rounded-xl border text-xs font-bold transition-all ${
                          isSelected
                            ? 'border-pink-500 bg-pink-100 text-pink-800 shadow-sm ring-1 ring-pink-300'
                            : 'border-pink-100 bg-white text-slate-700 hover:bg-pink-50'
                        }`}
                      >
                        <span>{style.icon}</span>
                        <span>{style.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {fashion.makeup.blushStyle !== 'none' && (
                <div>
                  <span className="text-xs font-black text-slate-700">チークのカラー：</span>
                  <div className="grid grid-cols-4 gap-2 mt-1.5">
                    {blushColorPresets.map(preset => {
                      const isCurrent = fashion.makeup.blushColor === preset.hex;
                      return (
                        <button
                          key={preset.hex}
                          type="button"
                          onClick={() => {
                            onChangeFashion(prev => ({
                              ...prev,
                              makeup: { ...prev.makeup, blushColor: preset.hex },
                            }));
                            playSparkleSound();
                          }}
                          className={`flex items-center gap-2 p-2 rounded-xl border-2 transition-all ${
                            isCurrent
                              ? 'border-pink-500 bg-pink-50 shadow-sm'
                              : 'border-slate-200 bg-white hover:border-pink-300'
                          }`}
                        >
                          <div className="w-5 h-5 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: preset.hex }} />
                          <span className="text-xs font-bold text-slate-700 truncate">{preset.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Sub Panel 3: Lip (くちびる) */}
          {makeupSubTab === 'lip' && (
            <div className="flex flex-col gap-3">
              <div>
                <span className="text-xs font-black text-slate-700">リップカラー：</span>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-1.5">
                  {lipColorPresets.map(preset => {
                    const isCurrent = fashion.makeup.lipColor === preset.hex;
                    return (
                      <button
                        key={preset.hex}
                        type="button"
                        onClick={() => {
                          onChangeFashion(prev => ({
                            ...prev,
                            makeup: { ...prev.makeup, lipColor: preset.hex },
                          }));
                          playSparkleSound();
                        }}
                        className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border-2 transition-all ${
                          isCurrent
                            ? 'border-pink-500 bg-pink-50 shadow-sm ring-1 ring-pink-300'
                            : 'border-slate-200 bg-white hover:border-pink-300'
                        }`}
                      >
                        <div className="w-7 h-7 rounded-full shadow-inner border border-black/10" style={{ backgroundColor: preset.hex }} />
                        <span className="text-[11px] font-bold text-slate-700 text-center leading-tight">
                          {preset.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Lip Gloss Toggle */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-pink-50/80 border border-pink-200">
                <div className="flex items-center gap-2">
                  <span className="text-lg">✨</span>
                  <div>
                    <span className="text-xs sm:text-sm font-black text-pink-900">ぷるぷるグロスツヤ感</span>
                    <p className="text-[10px] text-pink-700">くちびるに光のツヤと透明感をプラス♡</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onChangeFashion(prev => ({
                      ...prev,
                      makeup: { ...prev.makeup, lipGloss: !prev.makeup.lipGloss },
                    }));
                    playCutePop();
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-black transition-all ${
                    fashion.makeup.lipGloss
                      ? 'bg-pink-500 text-white shadow-sm ring-2 ring-pink-300'
                      : 'bg-white text-slate-600 border border-slate-300'
                  }`}
                >
                  {fashion.makeup.lipGloss ? 'ツヤON♡' : 'OFF'}
                </button>
              </div>
            </div>
          )}

          {/* Sub Panel 4: Eye Shadow & Face Sticker */}
          {makeupSubTab === 'face' && (
            <div className="flex flex-col gap-3">
              <div>
                <span className="text-xs font-black text-slate-700">アイシャドウ：</span>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-1.5">
                  {eyeShadowPresets.map(preset => {
                    const isCurrent = fashion.makeup.eyeShadowColor === preset.hex;
                    return (
                      <button
                        key={preset.hex}
                        type="button"
                        onClick={() => {
                          onChangeFashion(prev => ({
                            ...prev,
                            makeup: { ...prev.makeup, eyeShadowColor: preset.hex },
                          }));
                          playSparkleSound();
                        }}
                        className={`flex items-center gap-2 p-2 rounded-xl border-2 transition-all ${
                          isCurrent
                            ? 'border-pink-500 bg-pink-50 shadow-sm ring-1 ring-pink-300'
                            : 'border-slate-200 bg-white hover:border-pink-300'
                        }`}
                      >
                        <div
                          className="w-5 h-5 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: preset.hex === 'none' ? '#FFFFFF' : preset.hex }}
                        />
                        <span className="text-xs font-bold text-slate-700 truncate">{preset.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <span className="text-xs font-black text-slate-700">フェイスシール・目元ワンポイント：</span>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-1.5">
                  {faceStickerOptions.map(sticker => {
                    const isSelected = fashion.makeup.faceSticker === sticker.id;
                    return (
                      <button
                        key={sticker.id}
                        type="button"
                        onClick={() => {
                          onChangeFashion(prev => ({
                            ...prev,
                            makeup: { ...prev.makeup, faceSticker: sticker.id },
                          }));
                          playSparkleSound();
                        }}
                        className={`flex items-center gap-1.5 p-2 rounded-xl border text-xs font-bold transition-all ${
                          isSelected
                            ? 'border-pink-500 bg-pink-100 text-pink-800 shadow-sm ring-1 ring-pink-300'
                            : 'border-pink-100 bg-white text-slate-700 hover:bg-pink-50'
                        }`}
                      >
                        <span>{sticker.icon}</span>
                        <span>{sticker.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- TAB 4: OUTFITS & COLORS (お洋服＆カラー) --- */}
      {mainTab === 'fashion' && (
        <div className="flex flex-col gap-3">
          {/* Fashion Sub Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto touch-pan-x overscroll-x-contain pb-1">
            <button
              type="button"
              onClick={() => setFashionSubTab('outfit')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                fashionSubTab === 'outfit'
                  ? 'bg-pink-500 text-white shadow-sm ring-1 ring-pink-300'
                  : 'bg-pink-50 text-pink-700 hover:bg-pink-100'
              }`}
            >
              <span>👗</span>
              <span>お洋服デザイン</span>
            </button>
            <button
              type="button"
              onClick={() => setFashionSubTab('outfitColor')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                fashionSubTab === 'outfitColor'
                  ? 'bg-pink-500 text-white shadow-sm ring-1 ring-pink-300'
                  : 'bg-pink-50 text-pink-700 hover:bg-pink-100'
              }`}
            >
              <span>🎨</span>
              <span>お洋服カラー</span>
            </button>
            <button
              type="button"
              onClick={() => setFashionSubTab('hairColor')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                fashionSubTab === 'hairColor'
                  ? 'bg-pink-500 text-white shadow-sm ring-1 ring-pink-300'
                  : 'bg-pink-50 text-pink-700 hover:bg-pink-100'
              }`}
            >
              <span>💇‍♀️</span>
              <span>ヘアカラー</span>
            </button>
          </div>

          {/* Sub Panel 1: Outfit Designs */}
          {fashionSubTab === 'outfit' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[260px] overflow-y-auto pr-1">
              {outfitStyleOptions.map(opt => {
                const isSelected = fashion.outfitStyle === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      onChangeFashion(prev => ({ ...prev, outfitStyle: opt.id }));
                      playSparkleSound();
                    }}
                    className={`flex items-start gap-2.5 p-3 rounded-2xl border-2 text-left transition-all active:scale-95 ${
                      isSelected
                        ? 'border-pink-500 bg-pink-50 shadow-md ring-2 ring-pink-300'
                        : 'border-pink-100 bg-white hover:border-pink-300'
                    }`}
                  >
                    <span className="text-2xl p-2 bg-pink-100/60 rounded-xl shrink-0">{opt.icon}</span>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs sm:text-sm font-black text-slate-800">{opt.name}</span>
                        {isSelected && <span className="text-[10px] font-bold bg-pink-500 text-white px-1.5 py-0.2 rounded-full">着用中</span>}
                      </div>
                      <span className="text-[11px] font-medium text-pink-700 leading-snug mt-0.5">{opt.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Sub Panel 2: Outfit Colors */}
          {fashionSubTab === 'outfitColor' && (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-black text-slate-700">お洋服のメインカラー：</span>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {outfitColorPresets.map(preset => {
                  const isCurrent = fashion.outfitColor === preset.hex;
                  return (
                    <button
                      key={preset.hex}
                      type="button"
                      onClick={() => {
                        onChangeFashion(prev => ({ ...prev, outfitColor: preset.hex }));
                        playSparkleSound();
                      }}
                      className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl border-2 transition-transform active:scale-95 ${
                        isCurrent
                          ? 'border-pink-500 bg-pink-50 scale-105 shadow-md ring-2 ring-pink-300'
                          : 'border-slate-200 bg-white hover:border-pink-300'
                      }`}
                    >
                      <div
                        className="w-10 h-10 rounded-full shadow-inner border border-black/10 flex items-center justify-center"
                        style={{ backgroundColor: preset.hex }}
                      >
                        {isCurrent && <Check className="w-5 h-5 text-pink-600 drop-shadow stroke-[3]" />}
                      </div>
                      <span className="text-[10px] font-bold text-slate-700 text-center leading-tight">
                        {preset.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sub Panel 3: Hair Color Spray */}
          {fashionSubTab === 'hairColor' && (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-black text-slate-700">髪色チェンジスプレー：</span>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {hairColorPresets.map(preset => {
                  const isCurrent = currentHairColor === preset.hex;
                  return (
                    <button
                      key={preset.hex}
                      type="button"
                      onClick={() => {
                        onChangeHairColor(preset.hex);
                        playSparkleSound();
                      }}
                      className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl border-2 transition-transform active:scale-95 ${
                        isCurrent
                          ? 'border-pink-500 bg-pink-50 scale-105 shadow-md ring-2 ring-pink-300'
                          : 'border-slate-200 bg-white hover:border-pink-300'
                      }`}
                    >
                      <div
                        className="w-10 h-10 rounded-full shadow-inner border border-black/10 flex items-center justify-center"
                        style={{ backgroundColor: preset.hex }}
                      >
                        {isCurrent && <Check className="w-5 h-5 text-white drop-shadow stroke-[3]" />}
                      </div>
                      <span className="text-[10px] font-bold text-slate-700 text-center leading-tight">
                        {preset.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
