/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, X, Sparkles, BookOpen } from 'lucide-react';
import { playCutePop } from '../utils/audio';

export interface SavedAlbumEntry {
  id: string;
  clientName: string;
  hairLength: string;
  hairColor: string;
  score: number;
  stars: number;
  stamp: string;
  dateStr: string;
}

interface StylistAlbumModalProps {
  entries: SavedAlbumEntry[];
  onClose: () => void;
}

export const StylistAlbumModal: React.FC<StylistAlbumModalProps> = ({
  entries,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-pink-950/40 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-gradient-to-b from-pink-50 via-white to-pink-50 rounded-3xl border-4 border-pink-300 shadow-2xl p-5 sm:p-7 flex flex-col gap-4 my-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-pink-200 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center text-white shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-pink-800">
                スタイリストの アルバムちょう
              </h2>
              <p className="text-xs font-bold text-pink-600/80">
                これまでにかわいくした お客さまたちの思い出だよ♡ ({entries.length}まい)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              playCutePop();
            }}
            className="p-2 rounded-2xl bg-pink-100 hover:bg-pink-200 text-pink-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Entries list */}
        {entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
            <Sparkles className="w-12 h-12 text-pink-300 animate-bounce" />
            <p className="text-base font-extrabold text-pink-700">
              まだアルバムのしゃしんがないよ！
            </p>
            <p className="text-xs font-bold text-slate-500">
              アレンジをかんせいさせて「アルバムに保存！」をおしてみてね♪
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 overflow-y-auto p-1">
            {entries.map(entry => (
              <div
                key={entry.id}
                className="bg-white rounded-2xl border-2 border-pink-200 shadow-sm p-3 flex flex-col gap-2 relative overflow-hidden group hover:shadow-md transition-shadow"
              >
                {/* Header tag */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-black text-pink-800">{entry.clientName}ちゃん</span>
                  <span className="text-[10px] text-slate-400 font-medium">{entry.dateStr}</span>
                </div>

                {/* Card visual frame */}
                <div className="w-full aspect-[4/3] rounded-xl bg-gradient-to-br from-pink-100 to-purple-100 flex flex-col items-center justify-center p-3 relative border border-pink-100">
                  <div
                    className="w-12 h-12 rounded-full shadow-inner border-2 border-white flex items-center justify-center mb-1"
                    style={{ backgroundColor: entry.hairColor }}
                  >
                    <span className="text-xl">👧</span>
                  </div>
                  <span className="text-[11px] font-bold text-pink-700 bg-white/80 px-2 py-0.5 rounded-full">
                    {entry.hairLength === 'short'
                      ? 'ショート'
                      : entry.hairLength === 'bob'
                      ? 'ボブ'
                      : entry.hairLength === 'medium'
                      ? 'セミロング'
                      : 'ロング'}
                  </span>

                  {/* Stamp badge */}
                  <span className="absolute bottom-1 right-1 text-[10px] font-black bg-pink-500 text-white px-2 py-0.5 rounded-full shadow">
                    {entry.stamp}
                  </span>
                </div>

                {/* Score & Stars */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[1, 2, 3].map(s => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= entry.stars ? 'fill-current' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-black text-pink-600 tabular-nums">
                    {entry.score}
                    <span className="text-[10px] text-slate-500 font-bold ml-0.5">点</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
