/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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
import { Sparkles, Undo2, RotateCcw, HelpCircle, Check, Palette } from 'lucide-react';

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

type TabType = 'bun' | 'braid' | 'tail' | 'curl' | 'ribbon' | 'pin' | 'tiara' | 'flower' | 'sparkle' | 'color';

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
  const [activeTab, setActiveTab] = useState<TabType>('bun');

  const tabs: { id: TabType; label: string; icon: string; count: number }[] = [
    { id: 'bun', label: 'おだんご', icon: '🍡', count: 3 },
    { id: 'braid', label: 'みつあみ', icon: '🎀', count: 3 },
    { id: 'tail', label: 'テール', icon: '🦄', count: 3 },
    { id: 'curl', label: 'カール', icon: '✨', count: 2 },
    { id: 'ribbon', label: 'リボン', icon: '🎀', count: 4 },
    { id: 'pin', label: 'ヘアピン', icon: '⭐', count: 3 },
    { id: 'tiara', label: 'ティアラ', icon: '👑', count: 2 },
    { id: 'flower', label: 'お花', icon: '🌸', count: 2 },
    { id: 'sparkle', label: 'きらきら', icon: '💫', count: 2 },
    { id: 'color', label: 'ヘアカラー', icon: '🎨', count: 6 },
  ];

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

  const getFilteredItems = (): HairItemDefinition[] => {
    if (['bun', 'braid', 'tail', 'curl'].includes(activeTab)) {
      return HAIR_PART_DEFINITIONS.filter(item => item.category === activeTab);
    }
    return ACCESSORY_DEFINITIONS.filter(item => item.category === (activeTab as ItemCategory));
  };

  const filteredItems = getFilteredItems();

  return (
    <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl border-3 border-pink-200 shadow-xl p-3 sm:p-4 flex flex-col gap-3">
      {/* 1. Header controls: Twin Mode, Guides, Undo, Clear */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-pink-100 pb-2.5">
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
                ? 'bg-pink-500 text-white shadow-pink-200 ring-2 ring-pink-300'
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
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
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
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold transition-colors"
            title="ぜんぶはずす"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>クリア</span>
          </button>
        </div>
      </div>

      {/* 2. Category Tabs (Scrollable on mobile) */}
      <div className="flex items-center gap-1.5 overflow-x-auto touch-pan-x overscroll-x-contain pb-1.5 scrollbar-thin scrollbar-thumb-pink-200">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                playCutePop();
              }}
              className={`flex items-center gap-1 px-3.5 py-1.5 rounded-2xl whitespace-nowrap text-xs sm:text-sm font-bold transition-all shrink-0 ${
                isActive
                  ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-md shadow-pink-200 scale-105'
                  : 'bg-pink-50/70 text-pink-700 hover:bg-pink-100/70'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Items Selector Shelf */}
      {activeTab === 'color' ? (
        <div className="flex sm:grid sm:grid-cols-8 gap-2 py-2 overflow-x-auto touch-pan-x overscroll-x-contain pb-1">
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
                className={`flex flex-col items-center gap-1 p-2 rounded-2xl border-2 transition-transform active:scale-95 shrink-0 min-w-[70px] ${
                  isCurrent
                    ? 'border-pink-500 bg-pink-50 scale-105 shadow-md'
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-[170px] overflow-y-auto pr-1">
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
                className={`relative flex items-center gap-2 p-2 rounded-2xl border-2 text-left transition-all active:scale-95 ${
                  isSelected
                    ? 'border-pink-500 bg-gradient-to-r from-pink-50 to-purple-50 shadow-md ring-2 ring-pink-300'
                    : 'border-pink-100 bg-white/80 hover:border-pink-300 hover:bg-pink-50/40'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-pink-100/50 flex items-center justify-center p-1.5 shrink-0 border border-pink-200/60 shadow-inner">
                  {/* Thumbnail emoji or preview */}
                  <span className="text-2xl select-none">
                    {item.category === 'bun'
                      ? '🍡'
                      : item.category === 'braid'
                      ? '🥨'
                      : item.category === 'tail'
                      ? '🐴'
                      : item.category === 'curl'
                      ? '🌀'
                      : item.category === 'ribbon'
                      ? '🎀'
                      : item.category === 'pin'
                      ? '⭐'
                      : item.category === 'tiara'
                      ? '👑'
                      : item.category === 'flower'
                      ? '🌸'
                      : '✨'}
                  </span>
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-xs sm:text-sm font-extrabold text-slate-800 truncate">
                      {item.name}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-pink-500 shrink-0 animate-ping" />
                    )}
                  </div>
                  <span className="text-[10px] text-pink-600/90 font-medium truncate">
                    {item.description}
                  </span>
                </div>

                {!isSuitable && (
                  <span className="absolute top-1 right-1 text-[9px] font-bold text-amber-700 bg-amber-100/90 px-1 rounded">
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
