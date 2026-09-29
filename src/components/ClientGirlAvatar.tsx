/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HairLength } from '../domain/types';

interface ClientGirlAvatarProps {
  hairLength: HairLength;
  hairColor: string;
  eyeColor?: string;
  outfitColor?: string;
  mood?: 'excited' | 'smiling' | 'shy' | 'dreamy' | 'super_happy' | 'happy' | 'smile';
  showSnapGuides?: boolean;
  onSnapPointClick?: (x: number, y: number) => void;
  children?: React.ReactNode; // Placed hair items and accessories
}

export const ClientGirlAvatar: React.FC<ClientGirlAvatarProps> = ({
  hairLength,
  hairColor,
  eyeColor = '#5D4037',
  outfitColor = '#F8BBD0',
  mood = 'smiling',
  showSnapGuides = false,
  onSnapPointClick,
  children,
}) => {
  // Guide snap points for 6-year-old child assistance
  const snapSpots = [
    { name: 'てっぺん', x: 50, y: 16 },
    { name: 'ひだりうえ', x: 26, y: 22 },
    { name: 'みぎうえ', x: 74, y: 22 },
    { name: 'ひだりサイド', x: 18, y: 42 },
    { name: 'みぎサイド', x: 82, y: 42 },
    { name: 'うしろ', x: 50, y: 72 },
  ];

  return (
    <div className="relative w-full aspect-[4/5] max-w-[440px] mx-auto select-none overflow-hidden rounded-3xl bg-gradient-to-b from-pink-100/60 via-purple-50/40 to-pink-50/70 border-4 border-pink-200/80 shadow-lg shadow-pink-200/40">
      {/* Background salon bokeh and subtle hearts */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-4 left-6 w-16 h-16 rounded-full bg-pink-300 blur-xl" />
        <div className="absolute top-20 right-8 w-20 h-20 rounded-full bg-purple-300 blur-xl" />
        <div className="absolute bottom-12 left-10 w-24 h-24 rounded-full bg-amber-200 blur-2xl" />
      </div>

      <svg
        viewBox="0 0 400 500"
        className="w-full h-full drop-shadow-sm overflow-visible"
      >
        <defs>
          <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF2EC" />
            <stop offset="100%" stopColor="#FFE4D6" />
          </linearGradient>

          <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={hairColor} />
            <stop offset="100%" stopColor={hairColor} stopOpacity="0.88" />
          </linearGradient>

          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. BACK HAIR LAYER (Behind neck & shoulders) */}
        {hairLength === 'long' && (
          <g id="back-hair-long">
            <path
              d="M100,160 C80,220 50,330 65,440 C85,470 140,460 200,460 C260,460 315,470 335,440 C350,330 320,220 300,160 Z"
              fill={hairColor}
              filter="brightness(0.9)"
            />
            {/* Strand lines */}
            <path d="M120,240 C95,330 90,410 110,450" stroke="#000" strokeOpacity="0.1" strokeWidth="5" fill="none" />
            <path d="M280,240 C305,330 310,410 290,450" stroke="#000" strokeOpacity="0.1" strokeWidth="5" fill="none" />
          </g>
        )}

        {hairLength === 'medium' && (
          <g id="back-hair-medium">
            <path
              d="M110,160 C90,220 75,290 85,360 C110,380 150,375 200,375 C250,375 290,380 315,360 C325,290 310,220 290,160 Z"
              fill={hairColor}
              filter="brightness(0.92)"
            />
          </g>
        )}

        {hairLength === 'bob' && (
          <g id="back-hair-bob">
            <path
              d="M115,160 C100,210 90,270 105,300 C130,320 170,315 200,315 C230,315 270,320 295,300 C310,270 300,210 285,160 Z"
              fill={hairColor}
              filter="brightness(0.92)"
            />
          </g>
        )}

        {/* 2. BODY & DRESS */}
        {/* Neck */}
        <path d="M175,260 L175,320 C175,325 185,332 200,332 C215,332 225,325 225,320 L225,260 Z" fill="url(#skinGrad)" />
        <ellipse cx="200" cy="272" rx="22" ry="6" fill="#000" fillOpacity="0.06" />

        {/* Shoulders and Dress */}
        <path
          d="M175,320 C140,325 100,345 75,385 C65,400 60,440 60,500 L340,500 C340,440 335,400 325,385 C300,345 260,325 225,320 Z"
          fill={outfitColor}
        />
        {/* Dress Frills / Collar */}
        <path
          d="M160,325 C175,340 185,346 200,346 C215,346 225,340 240,325 C255,345 270,355 290,360 C265,375 235,380 200,380 C165,380 135,375 110,360 C130,355 145,345 160,325 Z"
          fill="#FFFFFF"
          stroke="#F8BBD0"
          strokeWidth="2"
        />
        {/* Collar Ribbon / Brooch */}
        <circle cx="200" cy="358" r="8" fill="#FF4081" />
        <ellipse cx="192" cy="358" rx="7" ry="4" fill="#FF80AB" transform="rotate(-20, 192, 358)" />
        <ellipse cx="208" cy="358" rx="7" ry="4" fill="#FF80AB" transform="rotate(20, 208, 358)" />

        {/* 3. FACE & EARS */}
        {/* Ears */}
        <circle cx="118" cy="210" r="18" fill="url(#skinGrad)" />
        <circle cx="282" cy="210" r="18" fill="url(#skinGrad)" />
        <ellipse cx="118" cy="210" rx="9" ry="11" fill="#FFCDD2" opacity="0.6" />
        <ellipse cx="282" cy="210" rx="9" ry="11" fill="#FFCDD2" opacity="0.6" />

        {/* Earring studs */}
        <circle cx="116" cy="222" r="3.5" fill="#FFD700" />
        <circle cx="284" cy="222" r="3.5" fill="#FFD700" />

        {/* Face contour */}
        <path
          d="M125,160 C120,225 130,280 200,285 C270,280 280,225 275,160 C270,120 130,120 125,160 Z"
          fill="url(#skinGrad)"
        />

        {/* Cheeks blush */}
        <ellipse cx="152" cy="226" rx="16" ry="9" fill="#FF8A80" opacity="0.45" />
        <ellipse cx="248" cy="226" rx="16" ry="9" fill="#FF8A80" opacity="0.45" />
        {/* Cheek twinkle */}
        <circle cx="147" cy="224" r="2.5" fill="#fff" opacity="0.8" />
        <circle cx="253" cy="224" r="2.5" fill="#fff" opacity="0.8" />

        {/* Nose */}
        <ellipse cx="200" cy="218" rx="2" ry="1.5" fill="#E57373" opacity="0.6" />

        {/* Mouth */}
        {mood === 'super_happy' || mood === 'excited' ? (
          <g id="mouth-open">
            <path
              d="M188,236 Q200,256 212,236 Z"
              fill="#D81B60"
            />
            <path
              d="M192,246 Q200,252 208,246 Z"
              fill="#FF8A80"
            />
            <path d="M186,236 C194,240 206,240 214,236" fill="none" stroke="#AD1457" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        ) : (
          <path
            d="M190,238 Q200,248 210,238"
            fill="none"
            stroke="#D81B60"
            strokeWidth="3"
            strokeLinecap="round"
          />
        )}

        {/* Eyes */}
        <g id="eyes">
          {/* Left Eye */}
          <g>
            {/* Sclera */}
            <ellipse cx="160" cy="198" rx="18" ry="16" fill="#FFFFFF" stroke="#424242" strokeWidth="2" />
            {/* Iris */}
            <ellipse cx="162" cy="198" rx="13" ry="15" fill={eyeColor} />
            <circle cx="162" cy="200" r="8" fill="#212121" />
            <ellipse cx="162" cy="204" rx="10" ry="6" fill="#8D6E63" opacity="0.7" />
            {/* Eye highlights */}
            <circle cx="157" cy="193" r="5" fill="#FFFFFF" />
            <circle cx="167" cy="204" r="2.5" fill="#FFFFFF" />
            {/* Upper eyelash */}
            <path d="M140,192 C150,180 172,180 180,190" fill="none" stroke="#212121" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M175,185 L182,180" stroke="#212121" strokeWidth="3" strokeLinecap="round" />
            <path d="M145,188 L139,183" stroke="#212121" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* Right Eye */}
          <g>
            <ellipse cx="240" cy="198" rx="18" ry="16" fill="#FFFFFF" stroke="#424242" strokeWidth="2" />
            <ellipse cx="238" cy="198" rx="13" ry="15" fill={eyeColor} />
            <circle cx="238" cy="200" r="8" fill="#212121" />
            <ellipse cx="238" cy="204" rx="10" ry="6" fill="#8D6E63" opacity="0.7" />
            <circle cx="233" cy="193" r="5" fill="#FFFFFF" />
            <circle cx="243" cy="204" r="2.5" fill="#FFFFFF" />
            <path d="M220,190 C228,180 250,180 260,192" fill="none" stroke="#212121" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M225,185 L218,180" stroke="#212121" strokeWidth="3" strokeLinecap="round" />
            <path d="M255,188 L261,183" stroke="#212121" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* Eyebrows */}
          <path d="M144,175 Q160,168 174,174" fill="none" stroke={hairColor} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M226,174 Q240,168 256,175" fill="none" stroke={hairColor} strokeWidth="3.5" strokeLinecap="round" />
        </g>

        {/* 4. FRONT HAIR & BANGS LAYER */}
        <g id="front-hair">
          {/* Hair base top dome */}
          <path
            d="M110,170 C105,100 145,65 200,65 C255,65 295,100 290,170 C285,160 270,120 200,120 C130,120 115,160 110,170 Z"
            fill={hairColor}
          />

          {/* Side bangs */}
          <path
            d="M116,140 C110,180 115,230 132,250 C128,210 126,170 132,150 Z"
            fill={hairColor}
          />
          <path
            d="M284,140 C290,180 285,230 268,250 C272,210 274,170 268,150 Z"
            fill={hairColor}
          />

          {/* Cute rounded bangs fringe (まえがみ) */}
          <path
            d="M125,145 C140,175 165,175 175,155 C185,175 215,175 225,155 C235,175 260,175 275,145 C250,130 150,130 125,145 Z"
            fill={hairColor}
          />
          {/* Bangs tips highlight / shine ring (天使の輪) */}
          <ellipse
            cx="200"
            cy="115"
            rx="65"
            ry="12"
            fill="none"
            stroke="#FFFFFF"
            strokeOpacity="0.4"
            strokeWidth="5"
            strokeDasharray="18 10"
            strokeLinecap="round"
          />
        </g>

        {/* Extra side length for short/bob front styling */}
        {hairLength === 'short' && (
          <g id="short-accents">
            <path d="M114,190 C108,210 112,225 120,230" stroke={hairColor} strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M286,190 C292,210 288,225 280,230" stroke={hairColor} strokeWidth="8" strokeLinecap="round" fill="none" />
          </g>
        )}
      </svg>

      {/* 5. INTERACTIVE LAYER: Placed hair accessories & parts */}
      <div className="absolute inset-0 pointer-events-auto">
        {children}
      </div>

      {/* 6. SNAP GUIDE SPOTS (Assistance for 6yo child) */}
      {showSnapGuides && (
        <div className="absolute inset-0 pointer-events-none">
          {snapSpots.map((spot, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSnapPointClick?.(spot.x, spot.y)}
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              className="absolute pointer-events-auto -translate-x-1/2 -translate-y-1/2 group"
            >
              <div className="relative flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-pink-400 opacity-60" />
                <div className="w-7 h-7 rounded-full bg-white/90 border-2 border-pink-500 shadow-md flex items-center justify-center text-pink-600 font-bold text-xs hover:scale-125 transition-transform">
                  ★
                </div>
              </div>
              <span className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-full bg-pink-600/90 text-white text-[11px] font-bold shadow pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                {spot.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
