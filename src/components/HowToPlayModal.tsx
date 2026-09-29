/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Sparkles, Heart } from 'lucide-react';
import { playCutePop } from '../utils/audio';

interface HowToPlayModalProps {
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-pink-950/40 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-pink-50 via-white to-pink-50 rounded-3xl border-4 border-pink-300 shadow-2xl p-5 sm:p-7 flex flex-col gap-4 my-auto">
        <div className="flex items-center justify-between border-b border-pink-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✨</span>
            <h2 className="text-xl sm:text-2xl font-black text-pink-800">
              あそびかた
            </h2>
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

        <div className="flex flex-col gap-3.5 text-xs sm:text-sm font-bold text-slate-800">
          <div className="flex items-start gap-3 bg-pink-100/60 p-3 rounded-2xl">
            <span className="w-7 h-7 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm font-black shrink-0">
              1
            </span>
            <div>
              <p className="font-extrabold text-pink-900 mb-0.5">おねがいをきこう！</p>
              <p className="text-slate-600">
                おきゃくさまが「おだんごにしたいな」「リボンをつけてね」と教えてくれるよ。
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-purple-100/60 p-3 rounded-2xl">
            <span className="w-7 h-7 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-black shrink-0">
              2
            </span>
            <div>
              <p className="font-extrabold text-purple-900 mb-0.5">パーツをえらんでペタッ！</p>
              <p className="text-slate-600">
                おだんごや三つ編み、リボンをえらんで、あたまのすきな場所をタップ！左右おそろいボタンもおススメだよ♪
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-amber-100/60 p-3 rounded-2xl">
            <span className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-black shrink-0">
              3
            </span>
            <div>
              <p className="font-extrabold text-amber-900 mb-0.5">「かんせい！」でしんさ！</p>
              <p className="text-slate-600">
                おきゃくさまの希望どおりなら100てんまんてん！しゃしんを撮ってアルバムに保存してね♡
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            onClose();
            playCutePop();
          }}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-black text-sm shadow-md hover:from-pink-600 hover:to-rose-500 transition-all"
        >
          わかったよ！あそぶ！
        </button>
      </div>
    </div>
  );
};
