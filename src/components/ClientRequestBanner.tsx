/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ClientRequest, HairLength } from '../domain/types';
import { Sparkles, Heart, Users, Shuffle, Compass } from 'lucide-react';
import { playCutePop } from '../utils/audio';

interface ClientRequestBannerProps {
  client: ClientRequest;
  gameMode: 'request' | 'free';
  freeHairLength: HairLength;
  onSelectClientModal: () => void;
  onRandomClient: () => void;
  onToggleGameMode: (mode: 'request' | 'free') => void;
  onChangeFreeLength: (len: HairLength) => void;
}

export const ClientRequestBanner: React.FC<ClientRequestBannerProps> = ({
  client,
  gameMode,
  freeHairLength,
  onSelectClientModal,
  onRandomClient,
  onToggleGameMode,
  onChangeFreeLength,
}) => {
  const lengthJapanese = {
    short: 'ショートヘア',
    bob: 'ボブヘア',
    medium: 'セミロング',
    long: 'ロングヘア',
  };

  return (
    <div className="w-full bg-white/90 backdrop-blur-md rounded-3xl border-3 border-pink-200 shadow-md p-3 sm:p-4 flex flex-col gap-3">
      {/* Top mode switch & client changer */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-pink-100 pb-2.5 overflow-x-auto touch-pan-x">
        <div className="flex items-center gap-1.5 p-1 bg-pink-100/70 rounded-2xl">
          <button
            type="button"
            onClick={() => {
              onToggleGameMode('request');
              playCutePop();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
              gameMode === 'request'
                ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-sm'
                : 'text-pink-700 hover:text-pink-900'
            }`}
          >
            💖 おねがいモード
          </button>
          <button
            type="button"
            onClick={() => {
              onToggleGameMode('free');
              playCutePop();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
              gameMode === 'free'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-400 text-white shadow-sm'
                : 'text-purple-700 hover:text-purple-900'
            }`}
          >
            🎨 じゆうモード
          </button>
        </div>

        {gameMode === 'request' ? (
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                onSelectClientModal();
                playCutePop();
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-pink-100/80 hover:bg-pink-200/80 text-pink-700 font-bold text-xs transition-colors"
            >
              <Users className="w-3.5 h-3.5" />
              <span>お客さまをえらぶ</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onRandomClient();
                playCutePop();
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-100/80 hover:bg-purple-200/80 text-purple-700 font-bold text-xs transition-colors"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>別のお客さま</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            {(['short', 'bob', 'medium', 'long'] as HairLength[]).map(len => (
              <button
                key={len}
                type="button"
                onClick={() => {
                  onChangeFreeLength(len);
                  playCutePop();
                }}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                  freeHairLength === len
                    ? 'bg-purple-500 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {lengthJapanese[len]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Request Speech Bubble */}
      {gameMode === 'request' ? (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-gradient-to-r from-pink-50 via-purple-50/50 to-pink-50 p-3 rounded-2xl border border-pink-200/70">
          <div className="flex items-start gap-3">
            {/* Client Avatar Pill Badge */}
            <div className="flex flex-col items-center shrink-0">
              <div
                className="w-11 h-11 rounded-2xl shadow-inner border-2 border-white flex items-center justify-center text-xl"
                style={{ backgroundColor: client.hairColor }}
              >
                👧
              </div>
              <span className="text-[11px] font-black text-pink-700 mt-1 whitespace-nowrap">
                {client.clientName}ちゃん
              </span>
            </div>

            {/* Speech bubble */}
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="font-black text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                  {lengthJapanese[client.hairLength]}
                </span>
                <span className="font-extrabold text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full">
                  ✨ {client.nuanceLabel}
                </span>
              </div>
              <p className="text-sm sm:text-base font-black text-slate-800 tracking-tight leading-snug">
                「{client.speechText}」
              </p>
            </div>
          </div>

          {/* Keywords Tag Badges */}
          <div className="flex sm:flex-col items-end gap-1 shrink-0 self-end sm:self-center">
            <span className="text-[10px] font-bold text-slate-400">おねがいキーワード:</span>
            <div className="flex flex-wrap gap-1">
              {client.targetKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-lg bg-pink-200/70 text-pink-800 text-[11px] font-black"
                >
                  #{kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 bg-purple-50 p-3 rounded-2xl border border-purple-200/70 text-purple-900 text-xs sm:text-sm font-bold">
          <Compass className="w-5 h-5 text-purple-600 shrink-0" />
          <span>
            じゆうモードだよ！髪の長さやヘアカラーをえらんで、すきなアレンジをじゆうにためしてみてね♪
          </span>
        </div>
      )}
    </div>
  );
};
