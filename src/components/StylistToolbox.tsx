/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  HairItemDefinition,
  ItemCategory,
  HairLength,
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
} from 'lucide-react';

interface StylistToolboxProps {
  currentHairLength: HairLength;
  currentHairColor: string;
  selectedTool: HairItemDefinition | null;
  isTwinMode: boolean;
  showGuides: boolean;
  onSelectTool: (item: HairItemDefinition | null) => void;
  onToggleTwinMode: () => void;
  onToggleGuides: () => void;
  onUndo: () => void;
  onClear: () => void;
  onChangeHairColor: (color: string) => void;
}

type MainCategoryTab = 'parts' | 'accessories' | 'color';

export const StylistToolbox: React.FC<StylistToolboxProps> = ({
  currentHairLength,
  currentHairColor,
  selectedTool,
  isTwinMode,
  showGuides,
  onSelectTool,
  onToggleTwinMode,
  onToggleGuides,
  onUndo,
  onClear,
  onChangeHairColor,
}) => {
  // Main category tab: 'parts' (ヘアパーツ) | 'accessories' (アクセサリー) | 'color' (ヘアカラー)
  const [mainTab, setMainTab] = useState<MainCategoryTab>('parts');

  // Sub category filter
  const [subPartCategory, setSubPartCategory] = useState<string>('all');
  const [subAccCategory, setSubAccCategory] = useState<string>('all');

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

  const getItemEmoji = (category: ItemCategory) => {
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

      {/* 2. Main Classification Tabs (タブレット・スマホ対応の大分類タブ) */}
      <div className="grid grid-cols-3 gap-2 bg-pink-50/80 p-1.5 rounded-2xl border border-pink-100">
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
            setMainTab('color');
            playCutePop();
          }}
          className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
            mainTab === 'color'
              ? 'bg-white text-pink-700 shadow-md scale-[1.02] border border-pink-200'
              : 'text-slate-600 hover:text-pink-600 hover:bg-pink-100/50'
          }`}
        >
          <span className="text-base">🎨</span>
          <span>ヘアカラー</span>
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
                {getItemEmoji(selectedTool.category)}
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
            パーツやアクセサリーをタップして選んでね！ここに詳しい部位の説明や使い方のヒントが表示されるよ♡
          </span>
        </div>
      )}

      {/* 5. Items Selector Shelf */}
      {mainTab === 'color' ? (
        <div className="flex sm:grid sm:grid-cols-4 md:grid-cols-8 gap-2.5 py-2 overflow-x-auto touch-pan-x overscroll-x-contain pb-1">
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
                className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl border-2 transition-transform active:scale-95 shrink-0 min-w-[76px] ${
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
                <span className="text-[11px] font-bold text-slate-700 text-center leading-tight">
                  {preset.name}
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-2.5 max-h-[260px] md:max-h-[300px] overflow-y-auto pr-1">
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
                    {getItemEmoji(item.category)}
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
    </div>
  );
};
