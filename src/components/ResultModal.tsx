/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { ScoreEvaluationResult, ClientRequest, PlacedHairItem } from '../domain/types';
import { playFanfare, playCameraShutter, playCutePop, playSparkleSound } from '../utils/audio';
import { Star, Camera, Sparkles, Heart, ArrowRight, RotateCcw, CheckCircle2 } from 'lucide-react';
import { ClientGirlAvatar } from './ClientGirlAvatar';
import { HairGraphicPart } from './HairGraphicPart';

interface ResultModalProps {
  client: ClientRequest;
  placedItems: PlacedHairItem[];
  hairColor: string;
  result: ScoreEvaluationResult;
  onNextClient: () => void;
  onRetry: () => void;
  onSaveToAlbum: (photoData: { score: number; stars: number; stamp: string }) => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  client,
  placedItems,
  hairColor,
  result,
  onNextClient,
  onRetry,
  onSaveToAlbum,
}) => {
  const [selectedStamp, setSelectedStamp] = useState<string>('きらきら');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    // Play fanfare and trigger joyful confetti
    playFanfare();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF69B4', '#BA68C8', '#4DB6AC', '#FFD54F', '#FF4081'],
    });
  }, []);

  const stamps = [
    { id: 'きらきら', text: '✨ きらきら ✨' },
    { id: '100てん', text: '💯 100てんまんてん！' },
    { id: 'てんし', text: '👼 まほうのてんし♡' },
    { id: 'かわいい', text: '💖 超かわいい！' },
    { id: 'プリンセス', text: '👑 プリンセス' },
  ];

  const handleTakePhoto = () => {
    playCameraShutter();
    setSavedSuccess(true);
    onSaveToAlbum({
      score: result.totalScore,
      stars: result.stars,
      stamp: selectedStamp,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-pink-950/40 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-white via-pink-50/50 to-white rounded-3xl border-4 border-pink-300 shadow-2xl p-5 sm:p-8 flex flex-col items-center gap-5 my-auto animate-in zoom-in-95 duration-200">
        {/* Celebration Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-pink-100 text-pink-700 text-xs sm:text-sm font-extrabold shadow-inner mb-2">
            <Sparkles className="w-4 h-4 text-pink-500 inline" />
            <span>{result.rankTitle}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-rose-500 drop-shadow-sm">
            {result.praiseTitle}
          </h2>

          {/* Stars display */}
          <div className="flex items-center justify-center gap-2 mt-2">
            {[1, 2, 3].map(starNum => {
              const active = starNum <= result.stars;
              return (
                <div
                  key={starNum}
                  className={`transition-transform duration-300 ${
                    active ? 'scale-110 text-amber-400 drop-shadow-md' : 'text-slate-200'
                  }`}
                >
                  <Star className="w-8 h-8 sm:w-10 h-10 fill-current" />
                </div>
              );
            })}
          </div>

          {/* Total score pill */}
          <div className="mt-2 text-3xl sm:text-4xl font-black text-pink-600 tabular-nums">
            {result.totalScore}
            <span className="text-lg font-bold text-slate-500 ml-1">てん！</span>
          </div>
        </div>

        {/* Client Photo & Speech Preview */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {/* Finished Character Portrait */}
          <div className="relative w-full max-w-[260px] mx-auto aspect-[4/5] rounded-2xl overflow-hidden border-4 border-pink-200 shadow-md">
            <ClientGirlAvatar
              hairLength={client.hairLength}
              hairColor={hairColor}
              eyeColor={client.eyeColor}
              outfitColor={client.outfitColor}
              mood={result.clientReaction}
            >
              {placedItems.map(item => {
                const baseSize = item.category === 'bun' ? 88 : item.category === 'tail' ? 96 : item.category === 'braid' ? 84 : 64;
                const size = (baseSize * (item.scale || 1)) * 0.65; // Scale for smaller preview
                return (
                  <div
                    key={item.id}
                    style={{
                      left: `${item.x}%`,
                      top: `${item.y}%`,
                      width: `${size}px`,
                      height: `${size}px`,
                      transform: `translate(-50%, -50%) rotate(${item.rotation || 0}deg)`,
                    }}
                    className="absolute pointer-events-none"
                  >
                    <HairGraphicPart
                      item={item}
                      baseHairColor={hairColor}
                    />
                  </div>
                );
              })}
            </ClientGirlAvatar>

            {/* Selected Photo Stamp Badge */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/95 px-3 py-1 rounded-full text-xs font-black text-pink-600 border border-pink-300 shadow">
              {stamps.find(s => s.id === selectedStamp)?.text}
            </div>
          </div>

          {/* Client Speech & Evaluation Breakdown */}
          <div className="flex flex-col gap-3">
            {/* Customer speech bubble */}
            <div className="relative bg-gradient-to-r from-pink-100 to-purple-100 p-3.5 rounded-2xl border-2 border-pink-300 shadow-sm">
              <div className="flex items-center gap-1.5 mb-1">
                <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                <span className="font-extrabold text-pink-800 text-xs sm:text-sm">
                  {client.clientName}ちゃん より:
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed">
                「{result.comment}」
              </p>
            </div>

            {/* Criteria Checklist */}
            <div className="bg-white p-3 rounded-2xl border border-pink-100 shadow-sm flex flex-col gap-2">
              <span className="text-[11px] font-black text-slate-400">しんさけっか</span>
              {result.criteria.map((crit, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 truncate">
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 ${
                        crit.pass ? 'text-emerald-500' : 'text-slate-300'
                      }`}
                    />
                    <span className="font-bold text-slate-700 truncate">{crit.note}</span>
                  </div>
                  <span className="font-black text-pink-600 shrink-0 tabular-nums ml-2">
                    +{crit.score}
                  </span>
                </div>
              ))}
            </div>

            {/* Photo Stamp Picker */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-pink-800">しゃしんのスタンプをえらぶ:</span>
              <div className="flex flex-wrap gap-1.5">
                {stamps.map(stamp => (
                  <button
                    key={stamp.id}
                    type="button"
                    onClick={() => {
                      setSelectedStamp(stamp.id);
                      playSparkleSound();
                    }}
                    className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                      selectedStamp === stamp.id
                        ? 'bg-pink-500 text-white shadow ring-2 ring-pink-300'
                        : 'bg-pink-50 text-pink-700 hover:bg-pink-100'
                    }`}
                  >
                    {stamp.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-pink-100">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Take Photo button */}
            <button
              type="button"
              onClick={handleTakePhoto}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all shadow-md ${
                savedSuccess
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white shadow-amber-200'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>{savedSuccess ? 'アルバムに保存したよ！' : 'アルバムに保存！'}</span>
            </button>

            {/* Retry button */}
            <button
              type="button"
              onClick={() => {
                onRetry();
                playCutePop();
              }}
              className="flex items-center justify-center gap-1 px-3 py-2.5 rounded-2xl bg-pink-100 hover:bg-pink-200 text-pink-700 font-bold text-xs sm:text-sm transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>もういちど</span>
            </button>
          </div>

          {/* Next Client button */}
          <button
            type="button"
            onClick={() => {
              onNextClient();
              playCutePop();
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-black text-sm sm:text-base shadow-lg shadow-pink-300 active:scale-95 transition-transform"
          >
            <span>つぎのお客さまへ</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
