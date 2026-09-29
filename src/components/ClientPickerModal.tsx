/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ClientRequest } from '../domain/types';
import { X, Heart, Sparkles, Check } from 'lucide-react';
import { playCutePop } from '../utils/audio';

interface ClientPickerModalProps {
  clients: ClientRequest[];
  currentClientId: string;
  onSelectClient: (client: ClientRequest) => void;
  onClose: () => void;
}

export const ClientPickerModal: React.FC<ClientPickerModalProps> = ({
  clients,
  currentClientId,
  onSelectClient,
  onClose,
}) => {
  const lengthJapanese = {
    short: 'ショートヘア',
    bob: 'ボブヘア',
    medium: 'セミロング',
    long: 'ロングヘア',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-pink-950/40 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-gradient-to-b from-pink-50 via-white to-pink-50 rounded-3xl border-4 border-pink-300 shadow-2xl p-5 sm:p-7 flex flex-col gap-4 my-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-pink-200 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-400 flex items-center justify-center text-white shadow-md text-xl">
              👧
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-pink-800">
                おきゃくさまをえらぶ
              </h2>
              <p className="text-xs font-bold text-pink-600/80">
                なりたい髪型を叶えてあげたい女の子をタップしてね♡
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

        {/* Client cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 overflow-y-auto p-1">
          {clients.map(client => {
            const isSelected = client.id === currentClientId;
            return (
              <button
                key={client.id}
                type="button"
                onClick={() => {
                  onSelectClient(client);
                  playCutePop();
                  onClose();
                }}
                className={`relative flex flex-col text-left p-3.5 rounded-2xl border-3 transition-all active:scale-95 ${
                  isSelected
                    ? 'border-pink-500 bg-pink-100/70 shadow-md ring-2 ring-pink-300'
                    : 'border-pink-200 bg-white hover:border-pink-300 hover:bg-pink-50/50'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                )}

                <div className="flex items-center gap-2.5 mb-2">
                  <div
                    className="w-12 h-12 rounded-2xl shadow-inner border-2 border-white flex items-center justify-center text-2xl shrink-0"
                    style={{ backgroundColor: client.hairColor }}
                  >
                    👧
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-base font-black text-slate-800 truncate">
                      {client.clientName}ちゃん
                    </span>
                    <span className="text-[11px] font-bold text-purple-700">
                      {lengthJapanese[client.hairLength]}
                    </span>
                  </div>
                </div>

                <div className="inline-block px-2 py-0.5 rounded-md bg-pink-100 text-pink-700 text-[11px] font-extrabold mb-1.5 w-fit">
                  ✨ {client.nuanceLabel}
                </div>

                <p className="text-xs font-bold text-slate-700 leading-snug line-clamp-2">
                  「{client.speechText}」
                </p>

                <div className="flex flex-wrap gap-1 mt-2">
                  {client.targetKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
