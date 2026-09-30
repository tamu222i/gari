/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HairLength, OutfitStyle, MakeupState, DEFAULT_MAKEUP } from '../domain/types';

interface ClientGirlAvatarProps {
  hairLength: HairLength;
  hairColor: string;
  eyeColor?: string;
  outfitColor?: string;
  outfitStyle?: OutfitStyle;
  makeup?: MakeupState;
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
  outfitStyle = 'princess',
  makeup = DEFAULT_MAKEUP,
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

  const blushCol = makeup.blushColor === 'none' ? 'transparent' : (makeup.blushColor || '#FF8A80');
  const lipCol = makeup.lipColor || '#D81B60';

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

          <linearGradient id="eyeShineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={eyeColor} />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.4" />
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

        {/* --- OUTFIT STYLES --- */}
        {outfitStyle === 'princess' && (
          <g id="outfit-princess">
            {/* Gown base */}
            <path
              d="M175,320 C140,325 100,345 75,385 C65,400 60,440 60,500 L340,500 C340,440 335,400 325,385 C300,345 260,325 225,320 Z"
              fill={outfitColor}
            />
            {/* Bodice curves */}
            <path d="M140,385 C170,410 230,410 260,385" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="3" fill="none" />
            {/* Off-shoulder lace neckline */}
            <path
              d="M160,325 C175,340 185,346 200,346 C215,346 225,340 240,325 C255,345 270,355 290,360 C265,375 235,380 200,380 C165,380 135,375 110,360 C130,355 145,345 160,325 Z"
              fill="#FFFFFF"
              stroke="#F8BBD0"
              strokeWidth="2"
            />
            {/* Royal Jewel Bow */}
            <circle cx="200" cy="358" r="8" fill="#FF4081" />
            <ellipse cx="192" cy="358" rx="7" ry="4" fill="#FF80AB" transform="rotate(-20, 192, 358)" />
            <ellipse cx="208" cy="358" rx="7" ry="4" fill="#FF80AB" transform="rotate(20, 208, 358)" />
            <circle cx="200" cy="358" r="3" fill="#FFF9C4" />
          </g>
        )}

        {outfitStyle === 'sailor' && (
          <g id="outfit-sailor">
            {/* Sailor uniform body */}
            <path
              d="M175,320 C140,325 100,345 75,385 C65,400 60,440 60,500 L340,500 C340,440 335,400 325,385 C300,345 260,325 225,320 Z"
              fill="#FFFFFF"
            />
            {/* Sailor back collar flap */}
            <path
              d="M140,325 L105,370 L140,370 L160,335 Z"
              fill={outfitColor}
            />
            <path
              d="M260,325 L295,370 L260,370 L240,335 Z"
              fill={outfitColor}
            />
            {/* Sailor V-collar */}
            <polygon points="150,325 200,400 250,325 200,338" fill={outfitColor} />
            <polygon points="160,325 200,385 240,325 200,338" fill="#FFFFFF" />
            {/* Sailor Tie Ribbon */}
            <ellipse cx="200" cy="392" rx="6" ry="6" fill="#E91E63" />
            <path d="M196,396 L190,445 L200,438 L206,445 L204,396 Z" fill="#E91E63" />
            {/* Stripes on shoulders */}
            <path d="M85,410 L115,440" stroke={outfitColor} strokeWidth="4" />
            <path d="M315,410 L285,440" stroke={outfitColor} strokeWidth="4" />
          </g>
        )}

        {outfitStyle === 'frill' && (
          <g id="outfit-frill">
            {/* Frill Blouse Body */}
            <path
              d="M175,320 C140,325 100,345 75,385 C65,400 60,440 60,500 L340,500 C340,440 335,400 325,385 C300,345 260,325 225,320 Z"
              fill={outfitColor}
            />
            {/* Multi-tier lace jabot */}
            <path
              d="M170,325 C185,335 215,335 230,325 C235,350 225,370 200,375 C175,370 165,350 170,325 Z"
              fill="#FFFFFF"
              stroke="#E0E0E0"
              strokeWidth="2"
            />
            <path
              d="M175,355 C190,365 210,365 225,355 C230,380 220,400 200,405 C180,400 170,380 175,355 Z"
              fill="#FFFFFF"
              stroke="#E0E0E0"
              strokeWidth="2"
            />
            {/* Antique Cameo Brooch */}
            <ellipse cx="200" cy="340" rx="9" ry="11" fill="#FFD700" />
            <ellipse cx="200" cy="340" rx="7" ry="9" fill="#880E4F" />
            <circle cx="200" cy="339" r="4" fill="#FFFFFF" opacity="0.9" />
            {/* Puff sleeve gather lines */}
            <circle cx="95" cy="385" r="22" fill={outfitColor} filter="brightness(0.95)" />
            <circle cx="305" cy="385" r="22" fill={outfitColor} filter="brightness(0.95)" />
          </g>
        )}

        {outfitStyle === 'parka' && (
          <g id="outfit-parka">
            {/* Parka hoodie body */}
            <path
              d="M175,320 C140,325 100,345 75,385 C65,400 60,440 60,500 L340,500 C340,440 335,400 325,385 C300,345 260,325 225,320 Z"
              fill={outfitColor}
            />
            {/* Hood collar fold behind neck */}
            <path
              d="M150,318 C170,335 230,335 250,318 C265,340 245,358 200,360 C155,358 135,340 150,318 Z"
              fill={outfitColor}
              filter="brightness(0.9)"
            />
            {/* Drawstring strings with cute fluffy pompoms */}
            <path d="M185,345 L182,410" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            <path d="M215,345 L218,410" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            <circle cx="182" cy="413" r="6" fill="#FFFFFF" />
            <circle cx="218" cy="413" r="6" fill="#FFFFFF" />
            {/* Front pouch pocket */}
            <path
              d="M155,440 L245,440 L235,490 L165,490 Z"
              fill={outfitColor}
              filter="brightness(0.92)"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
          </g>
        )}

        {outfitStyle === 'ribbon_camisole' && (
          <g id="outfit-camisole">
            {/* Camisole Dress Body */}
            <path
              d="M175,320 C140,325 100,345 75,385 C65,400 60,440 60,500 L340,500 C340,440 335,400 325,385 C300,345 260,325 225,320 Z"
              fill={outfitColor}
            />
            {/* Bare shoulder skin accent */}
            <path d="M140,325 C120,335 95,355 85,385 L115,395 C125,365 140,345 155,335 Z" fill="url(#skinGrad)" />
            <path d="M260,325 C280,335 305,355 315,385 L285,395 C275,365 260,345 245,335 Z" fill="url(#skinGrad)" />
            {/* Lace ribbon straps */}
            <path d="M150,325 L145,365" stroke="#FFFFFF" strokeWidth="4" />
            <path d="M250,325 L255,365" stroke="#FFFFFF" strokeWidth="4" />
            {/* Strap Mini Ribbons */}
            <circle cx="147" cy="345" r="4" fill="#FF4081" />
            <circle cx="253" cy="345" r="4" fill="#FF4081" />
            {/* Scalloped lace neckline */}
            <path
              d="M145,365 C170,380 230,380 255,365"
              stroke="#FFFFFF"
              strokeWidth="4"
              fill="none"
              strokeDasharray="4,4"
            />
          </g>
        )}

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

        {/* Cheeks blush (チークカスタマイズ) */}
        {makeup.blushStyle !== 'none' && makeup.blushColor !== 'none' && (
          <g id="blush-layer">
            {makeup.blushStyle === 'round' && (
              <>
                <ellipse cx="152" cy="226" rx="16" ry="9" fill={blushCol} opacity="0.5" />
                <ellipse cx="248" cy="226" rx="16" ry="9" fill={blushCol} opacity="0.5" />
                <circle cx="147" cy="224" r="2.5" fill="#fff" opacity="0.8" />
                <circle cx="253" cy="224" r="2.5" fill="#fff" opacity="0.8" />
              </>
            )}
            {makeup.blushStyle === 'heart' && (
              <>
                {/* Left heart blush */}
                <path
                  d="M152,228 C150,222 142,222 142,228 C142,234 152,238 152,238 C152,238 162,234 162,228 C162,222 154,222 152,228 Z"
                  fill={blushCol}
                  opacity="0.65"
                />
                {/* Right heart blush */}
                <path
                  d="M248,228 C246,222 238,222 238,228 C238,234 248,238 248,238 C248,238 258,234 258,228 C258,222 250,222 248,228 Z"
                  fill={blushCol}
                  opacity="0.65"
                />
                <circle cx="148" cy="225" r="1.5" fill="#fff" opacity="0.9" />
                <circle cx="244" cy="225" r="1.5" fill="#fff" opacity="0.9" />
              </>
            )}
            {makeup.blushStyle === 'star' && (
              <>
                <polygon points="152,218 155,225 162,226 156,230 158,237 152,233 146,237 148,230 142,226 149,225" fill={blushCol} opacity="0.6" />
                <polygon points="248,218 251,225 258,226 252,230 254,237 248,233 242,237 244,230 238,226 245,225" fill={blushCol} opacity="0.6" />
              </>
            )}
            {makeup.blushStyle === 'freckles' && (
              <>
                <ellipse cx="152" cy="226" rx="16" ry="8" fill={blushCol} opacity="0.35" />
                <ellipse cx="248" cy="226" rx="16" ry="8" fill={blushCol} opacity="0.35" />
                {/* Freckle dots */}
                <circle cx="146" cy="224" r="1.2" fill="#8D6E63" opacity="0.8" />
                <circle cx="151" cy="227" r="1.2" fill="#8D6E63" opacity="0.8" />
                <circle cx="157" cy="223" r="1.2" fill="#8D6E63" opacity="0.8" />
                <circle cx="243" cy="223" r="1.2" fill="#8D6E63" opacity="0.8" />
                <circle cx="249" cy="227" r="1.2" fill="#8D6E63" opacity="0.8" />
                <circle cx="254" cy="224" r="1.2" fill="#8D6E63" opacity="0.8" />
              </>
            )}
          </g>
        )}

        {/* Nose */}
        <ellipse cx="200" cy="218" rx="2" ry="1.5" fill="#E57373" opacity="0.6" />

        {/* Mouth / Lips (リップカスタマイズ) */}
        {mood === 'super_happy' || mood === 'excited' ? (
          <g id="mouth-open">
            <path
              d="M188,236 Q200,256 212,236 Z"
              fill={lipCol}
            />
            <path
              d="M192,246 Q200,252 208,246 Z"
              fill="#FFCDD2"
            />
            <path d="M186,236 C194,240 206,240 214,236" fill="none" stroke={lipCol} strokeWidth="2.5" strokeLinecap="round" />
            {makeup.lipGloss && (
              <ellipse cx="196" cy="240" rx="3" ry="1.5" fill="#FFFFFF" opacity="0.8" />
            )}
          </g>
        ) : (
          <g id="mouth-smile">
            <path
              d="M190,238 Q200,248 210,238"
              fill="none"
              stroke={lipCol}
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            {/* Lower lip fill hint */}
            <path
              d="M193,240 Q200,246 207,240"
              fill="none"
              stroke={lipCol}
              strokeWidth="2"
              opacity="0.6"
            />
            {makeup.lipGloss && (
              <ellipse cx="200" cy="242" rx="3.5" ry="1.2" fill="#FFFFFF" opacity="0.85" />
            )}
          </g>
        )}

        {/* Eyes (目の色・アイシャドウ・フェイスシール) */}
        <g id="eyes">
          {/* Eye Shadow (アイシャドウ) */}
          {makeup.eyeShadowColor && makeup.eyeShadowColor !== 'none' && (
            <g id="eyeshadow">
              <path d="M142,192 C150,175 172,175 180,188" stroke={makeup.eyeShadowColor} strokeWidth="6" opacity="0.55" fill="none" strokeLinecap="round" />
              <path d="M220,188 C228,175 250,175 258,192" stroke={makeup.eyeShadowColor} strokeWidth="6" opacity="0.55" fill="none" strokeLinecap="round" />
            </g>
          )}

          {/* Left Eye */}
          <g>
            {/* Sclera */}
            <ellipse cx="160" cy="198" rx="18" ry="16" fill="#FFFFFF" stroke="#424242" strokeWidth="2" />
            {/* Iris */}
            <ellipse cx="162" cy="198" rx="13" ry="15" fill={eyeColor} />
            <circle cx="162" cy="200" r="8" fill="#212121" />
            {/* Eye Color Tint Gradient Ring */}
            <ellipse cx="162" cy="205" rx="10" ry="5.5" fill="url(#eyeShineGrad)" opacity="0.8" />
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
            <ellipse cx="238" cy="205" rx="10" ry="5.5" fill="url(#eyeShineGrad)" opacity="0.8" />
            <circle cx="233" cy="193" r="5" fill="#FFFFFF" />
            <circle cx="243" cy="204" r="2.5" fill="#FFFFFF" />
            <path d="M220,190 C228,180 250,180 260,192" fill="none" stroke="#212121" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M225,185 L218,180" stroke="#212121" strokeWidth="3" strokeLinecap="round" />
            <path d="M255,188 L261,183" stroke="#212121" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* Eyebrows */}
          <path d="M144,175 Q160,168 174,174" fill="none" stroke={hairColor} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M226,174 Q240,168 256,175" fill="none" stroke={hairColor} strokeWidth="3.5" strokeLinecap="round" />

          {/* Face Sticker (フェイスシール・キラキラ) */}
          {makeup.faceSticker === 'heart' && (
            <path
              d="M182,213 C180,209 174,209 174,213 C174,217 182,220 182,220 C182,220 190,217 190,213 C190,209 184,209 182,213 Z"
              fill="#FF4081"
              stroke="#FFFFFF"
              strokeWidth="1"
            />
          )}
          {makeup.faceSticker === 'star' && (
            <polygon points="182,207 184,212 189,213 185,216 186,221 182,218 178,221 179,216 175,213 180,212" fill="#FFD700" stroke="#FFFFFF" strokeWidth="1" />
          )}
          {makeup.faceSticker === 'glitter' && (
            <g>
              <polygon points="180,208 182,212 180,216 178,212" fill="#00E5FF" />
              <polygon points="185,214 186,217 185,220 184,217" fill="#FF4081" />
              <circle cx="178" cy="217" r="1.5" fill="#FFE082" />
            </g>
          )}
          {makeup.faceSticker === 'butterfly' && (
            <g transform="translate(178, 208) scale(0.6)">
              <ellipse cx="6" cy="4" rx="4" ry="3" fill="#E1BEE7" transform="rotate(-30, 6, 4)" />
              <ellipse cx="14" cy="4" rx="4" ry="3" fill="#E1BEE7" transform="rotate(30, 14, 4)" />
              <ellipse cx="7" cy="10" rx="3" ry="2.5" fill="#CE93D8" />
              <ellipse cx="13" cy="10" rx="3" ry="2.5" fill="#CE93D8" />
              <line x1="10" y1="2" x2="10" y2="12" stroke="#4A148C" strokeWidth="1.5" />
            </g>
          )}
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
            strokeWidth="3.5"
            opacity="0.35"
            strokeDasharray="18,12,30,8"
          />
        </g>

        {/* 5. SNAP TARGET HINTS */}
        {showSnapGuides && (
          <g id="snap-guides" className="animate-pulse">
            {snapSpots.map((spot, idx) => {
              const pixelX = (spot.x / 100) * 400;
              const pixelY = (spot.y / 100) * 500;
              return (
                <g
                  key={idx}
                  className="cursor-pointer"
                  onClick={() => onSnapPointClick && onSnapPointClick(spot.x, spot.y)}
                >
                  <circle
                    cx={pixelX}
                    cy={pixelY}
                    r="14"
                    fill="#FF4081"
                    fillOpacity="0.25"
                    stroke="#FF4081"
                    strokeWidth="2.5"
                    strokeDasharray="4,3"
                  />
                  <circle cx={pixelX} cy={pixelY} r="4" fill="#FF4081" />
                  <text
                    x={pixelX}
                    y={pixelY + 22}
                    textAnchor="middle"
                    fill="#C2185B"
                    fontSize="11"
                    fontWeight="bold"
                    className="select-none pointer-events-none drop-shadow-sm font-sans"
                  >
                    {spot.name}
                  </text>
                </g>
              );
            })}
          </g>
        )}
      </svg>

      {/* 6. Children Layer (Placed Hair Accessories & Extensions) */}
      <div className="absolute inset-0 pointer-events-none">
        {children}
      </div>
    </div>
  );
};
