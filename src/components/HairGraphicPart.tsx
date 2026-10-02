/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PlacedHairItem } from '../domain/types';

interface HairGraphicPartProps {
  item: PlacedHairItem;
  baseHairColor: string;
  isSelected?: boolean;
}

export const HairGraphicPart: React.FC<HairGraphicPartProps> = ({
  item,
  baseHairColor,
  isSelected = false,
}) => {
  const color = item.color || baseHairColor;
  const isMirrored = item.isMirrored || false;

  const renderGraphic = () => {
    switch (item.itemId) {
      // ===== おだんご (BUNS) =====
      case 'bun_fluffy':
        return (
          <g>
            {/* Base shadow */}
            <circle cx="50" cy="50" r="38" fill={color} filter="brightness(0.85)" />
            {/* Main volume */}
            <circle cx="50" cy="48" r="36" fill={color} />
            {/* Texture curves */}
            <path
              d="M26,45 C32,32 50,30 65,36 C55,48 45,50 30,55"
              fill="none"
              stroke="#000"
              strokeOpacity="0.15"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M38,62 C50,68 68,60 74,48 C70,58 55,66 40,64"
              fill="none"
              stroke="#000"
              strokeOpacity="0.12"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Highlight gloss */}
            <ellipse cx="44" cy="36" rx="14" ry="7" fill="#fff" fillOpacity="0.32" transform="rotate(-15, 44, 36)" />
          </g>
        );

      case 'bun_mini_twin':
        return (
          <g>
            <circle cx="50" cy="50" r="28" fill={color} filter="brightness(0.88)" />
            <circle cx="50" cy="48" r="26" fill={color} />
            <path
              d="M34,46 C40,36 58,36 64,44"
              fill="none"
              stroke="#000"
              strokeOpacity="0.15"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <ellipse cx="45" cy="40" rx="9" ry="5" fill="#fff" fillOpacity="0.35" transform="rotate(-10, 45, 40)" />
          </g>
        );

      case 'bun_rose':
        return (
          <g>
            <circle cx="50" cy="50" r="36" fill={color} filter="brightness(0.82)" />
            <circle cx="50" cy="48" r="34" fill={color} />
            {/* Rose swirl petals */}
            <path
              d="M50,32 C62,32 68,40 68,48 C68,58 58,66 48,66 C36,66 32,56 34,46 C36,38 45,38 52,42 C56,45 56,52 50,54 C46,55 44,51 46,48"
              fill="none"
              stroke="#fff"
              strokeOpacity="0.3"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <path
              d="M50,32 C62,32 68,40 68,48 C68,58 58,66 48,66 C36,66 32,56 34,46 C36,38 45,38 52,42 C56,45 56,52 50,54"
              fill="none"
              stroke="#000"
              strokeOpacity="0.15"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <ellipse cx="42" cy="35" rx="8" ry="4" fill="#fff" fillOpacity="0.4" />
          </g>
        );

      // ===== みつあみ (BRAIDS) =====
      case 'braid_twin':
      case 'braid_loose':
        return (
          <g>
            {/* Strand segments */}
            <path
              d="M45,15 C35,28 65,36 55,48 C45,60 65,70 52,82 C44,92 56,98 50,110"
              fill="none"
              stroke={color}
              strokeWidth="28"
              strokeLinecap="round"
            />
            {/* Braid links pattern */}
            <ellipse cx="48" cy="28" rx="14" ry="9" fill={color} filter="brightness(1.05)" transform="rotate(-25, 48, 28)" />
            <ellipse cx="56" cy="40" rx="14" ry="9" fill={color} filter="brightness(0.92)" transform="rotate(25, 56, 40)" />
            <ellipse cx="48" cy="54" rx="13" ry="8" fill={color} filter="brightness(1.05)" transform="rotate(-25, 48, 54)" />
            <ellipse cx="56" cy="68" rx="13" ry="8" fill={color} filter="brightness(0.92)" transform="rotate(25, 56, 68)" />
            <ellipse cx="50" cy="82" rx="11" ry="7" fill={color} filter="brightness(1.02)" transform="rotate(-20, 50, 82)" />
            {/* Highlight strand */}
            <path
              d="M44,22 C40,32 58,40 50,52 C44,62 58,72 50,82"
              fill="none"
              stroke="#fff"
              strokeOpacity="0.32"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Tiny ribbon band at end */}
            <rect x="42" y="94" width="16" height="6" rx="3" fill="#FF4081" />
            <path d="M50,100 C46,106 42,112 40,118 M50,100 C54,106 58,112 60,118" stroke={color} strokeWidth="6" strokeLinecap="round" />
          </g>
        );

      case 'braid_crown':
        return (
          <g>
            <path
              d="M10,60 C30,20 70,20 90,60"
              fill="none"
              stroke={color}
              strokeWidth="16"
              strokeLinecap="round"
            />
            <path
              d="M10,60 C30,20 70,20 90,60"
              fill="none"
              stroke="#fff"
              strokeOpacity="0.3"
              strokeWidth="6"
              strokeDasharray="10 8"
              strokeLinecap="round"
            />
            <circle cx="50" cy="24" r="5" fill="#FFE082" />
          </g>
        );

      // ===== テール (TAILS) =====
      case 'tail_high_pony':
        return (
          <g>
            {/* Ponytail arching out */}
            <path
              d="M50,25 C75,10 95,35 90,75 C85,105 70,120 58,125 C66,105 75,70 60,40 Z"
              fill={color}
              filter="brightness(0.95)"
            />
            <path
              d="M52,28 C70,18 84,40 80,72 C76,95 65,108 58,115"
              fill="none"
              stroke="#fff"
              strokeOpacity="0.25"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Band tie */}
            <ellipse cx="50" cy="28" rx="8" ry="5" fill="#E91E63" />
          </g>
        );

      case 'tail_twintail':
        return (
          <g>
            <path
              d="M50,20 C85,25 95,65 88,105 C80,125 72,130 65,130 C72,110 75,75 50,35 Z"
              fill={color}
            />
            <path
              d="M55,26 C78,35 84,70 78,102 C74,115 68,122 65,124"
              fill="none"
              stroke="#fff"
              strokeOpacity="0.28"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="50" cy="24" r="6" fill="#F06292" />
          </g>
        );

      case 'tail_side_pony':
        return (
          <g>
            <path
              d="M40,25 C70,30 85,60 78,95 C72,120 60,135 50,135 C58,110 65,75 40,40 Z"
              fill={color}
            />
            <path
              d="M44,30 C64,38 74,68 70,95 C66,112 56,122 50,128"
              fill="none"
              stroke="#fff"
              strokeOpacity="0.25"
              strokeWidth="4"
            />
            <ellipse cx="42" cy="28" rx="7" ry="5" fill="#AB47BC" />
          </g>
        );

      case 'tail_pop_curly':
        return (
          <g>
            {/* Pop curly bouncy twintail */}
            <path
              d="M45,20 C75,18 92,38 88,65 C85,85 62,95 72,115 C78,128 65,138 52,135 C42,132 46,115 54,105 C64,92 56,75 48,55 C42,42 42,28 45,20 Z"
              fill={color}
              filter="brightness(0.92)"
            />
            <path
              d="M50,22 C78,22 88,44 82,70 C76,88 65,96 70,112 C74,120 64,126 56,124"
              fill="none"
              stroke="#fff"
              strokeOpacity="0.35"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            {/* Pop Star Scrunchie band */}
            <circle cx="46" cy="22" r="9" fill="#FF4081" />
            <polygon
              points="46,16 48,20 53,21 49,24 50,29 46,26 42,29 43,24 39,21 44,20"
              fill="#FFEB3B"
            />
          </g>
        );

      // ===== カール (CURLS) =====
      case 'curl_wavy':
        return (
          <g>
            <path
              d="M50,10 C70,25 35,45 60,65 C80,80 45,100 55,115"
              fill="none"
              stroke={color}
              strokeWidth="18"
              strokeLinecap="round"
            />
            <path
              d="M50,12 C66,25 38,45 58,65 C74,80 48,98 54,110"
              fill="none"
              stroke="#fff"
              strokeOpacity="0.3"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>
        );

      case 'curl_spiral':
        return (
          <g>
            <path
              d="M50,10 C68,18 68,32 50,38 C32,44 32,58 50,64 C68,70 68,84 50,90 C34,96 36,110 50,115"
              fill="none"
              stroke={color}
              strokeWidth="16"
              strokeLinecap="round"
            />
            <path
              d="M50,12 C64,18 64,30 50,36 C36,42 36,54 50,62 C64,68 64,80 50,88"
              fill="none"
              stroke="#fff"
              strokeOpacity="0.35"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>
        );

      // ===== リボン (RIBBONS) =====
      case 'ribbon_pink_chiffon':
      case 'ribbon_lavender_big':
      case 'ribbon_mint_twin':
      case 'ribbon_ruby_red': {
        const ribbonColor = item.color || '#FF69B4';
        return (
          <g>
            {/* Left Wing */}
            <path
              d="M50,50 C30,25 10,35 15,55 C20,70 40,65 50,50 Z"
              fill={ribbonColor}
              filter="brightness(0.95)"
            />
            <path d="M46,48 C32,32 20,40 22,52" stroke="#fff" strokeOpacity="0.4" strokeWidth="2.5" fill="none" />
            {/* Right Wing */}
            <path
              d="M50,50 C70,25 90,35 85,55 C80,70 60,65 50,50 Z"
              fill={ribbonColor}
            />
            <path d="M54,48 C68,32 80,40 78,52" stroke="#fff" strokeOpacity="0.4" strokeWidth="2.5" fill="none" />
            {/* Tails */}
            <path d="M46,55 C40,75 32,88 25,95 C35,90 42,92 48,70 Z" fill={ribbonColor} filter="brightness(0.85)" />
            <path d="M54,55 C60,75 68,88 75,95 C65,90 58,92 52,70 Z" fill={ribbonColor} filter="brightness(0.85)" />
            {/* Center knot */}
            <circle cx="50" cy="50" r="10" fill={ribbonColor} filter="brightness(1.1)" />
            <circle cx="50" cy="50" r="9" stroke="#fff" strokeOpacity="0.3" strokeWidth="2" fill="none" />
          </g>
        );
      }

      case 'ribbon_pop_neon': {
        const ribbonColor = item.color || '#FF4081';
        return (
          <g>
            {/* Pop Big Neon Ribbon */}
            <path
              d="M50,48 C28,18 8,28 12,52 C16,72 38,65 50,48 Z"
              fill={ribbonColor}
              filter="brightness(0.96)"
            />
            <path d="M46,46 C30,26 18,34 20,48" stroke="#fff" strokeOpacity="0.45" strokeWidth="3" fill="none" />
            <path
              d="M50,48 C72,18 92,28 88,52 C84,72 62,65 50,48 Z"
              fill={ribbonColor}
            />
            <path d="M54,46 C70,26 82,34 80,48" stroke="#fff" strokeOpacity="0.45" strokeWidth="3" fill="none" />
            {/* Fluttering pop ribbon tails */}
            <path d="M45,55 C38,80 25,98 16,106 C28,98 38,102 46,75 Z" fill={ribbonColor} filter="brightness(0.85)" />
            <path d="M55,55 C62,80 75,98 84,106 C72,98 62,102 54,75 Z" fill={ribbonColor} filter="brightness(0.85)" />
            {/* Sparkling Star Jewel at Center */}
            <circle cx="50" cy="48" r="11" fill="#FFEB3B" stroke="#FBC02D" strokeWidth="1.5" />
            <polygon
              points="50,40 52,45 58,46 53,50 55,56 50,52 45,56 47,50 42,46 48,45"
              fill="#FFFFFF"
            />
          </g>
        );
      }

      // ===== ピン (PINS) =====
      case 'pin_pop_candy':
        return (
          <g>
            {/* Hairpin clip back */}
            <rect x="25" y="46" width="50" height="8" rx="4" fill="#90A4AE" opacity="0.8" transform="rotate(-15, 50, 50)" />
            {/* Lollipop stick */}
            <rect x="47" y="45" width="6" height="35" rx="3" fill="#FFFFFF" stroke="#CFD8DC" strokeWidth="1" transform="rotate(25, 50, 60)" />
            {/* Swirl candy round */}
            <circle cx="44" cy="38" r="20" fill="#FF4081" stroke="#F50057" strokeWidth="1.5" />
            <path
              d="M44,22 C52,22 60,30 60,38 C60,46 52,54 44,54 C36,54 28,46 28,38 C28,30 36,26 42,26 C48,26 52,32 52,38 C52,42 48,46 44,46 C40,46 36,42 36,38"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Sparkling Star on candy */}
            <polygon
              points="56,26 58,30 63,31 59,34 60,39 56,36 52,39 53,34 49,31 54,30"
              fill="#FFEB3B"
              stroke="#F57F17"
              strokeWidth="1"
            />
          </g>
        );
      case 'pin_star_glitter':
        return (
          <g>
            {/* Hairpin clip back */}
            <rect x="25" y="46" width="50" height="8" rx="4" fill="#90A4AE" opacity="0.8" transform="rotate(-15, 50, 50)" />
            {/* 5-pointed star */}
            <polygon
              points="50,20 58,38 78,38 62,50 68,70 50,58 32,70 38,50 22,38 42,38"
              fill="#FFD54F"
              stroke="#FFA000"
              strokeWidth="2"
            />
            <polygon
              points="50,26 55,39 68,39 57,47 61,60 50,52 39,60 43,47 32,39 45,39"
              fill="#FFF176"
            />
            {/* Center Sparkle gem */}
            <circle cx="50" cy="46" r="5" fill="#fff" />
          </g>
        );

      case 'pin_heart_jewel':
        return (
          <g>
            <rect x="25" y="46" width="50" height="8" rx="4" fill="#B0BEC5" opacity="0.8" transform="rotate(15, 50, 50)" />
            <path
              d="M50,68 C50,68 25,52 25,36 C25,25 35,18 45,24 C50,28 50,28 50,28 C50,28 50,28 55,24 C65,18 75,25 75,36 C75,52 50,68 50,68 Z"
              fill="#FF4081"
              stroke="#C2185B"
              strokeWidth="2.5"
            />
            <path
              d="M36,28 C30,32 30,42 38,48"
              fill="none"
              stroke="#fff"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </g>
        );

      case 'pin_strawberry':
        return (
          <g>
            <rect x="25" y="46" width="50" height="8" rx="4" fill="#CFD8DC" opacity="0.8" transform="rotate(-10, 50, 50)" />
            {/* Strawberry berry */}
            <path
              d="M50,75 C34,75 28,52 30,38 C32,28 68,28 70,38 C72,52 66,75 50,75 Z"
              fill="#FF1744"
            />
            {/* Seeds */}
            <circle cx="42" cy="42" r="1.5" fill="#FFE082" />
            <circle cx="58" cy="42" r="1.5" fill="#FFE082" />
            <circle cx="50" cy="52" r="1.5" fill="#FFE082" />
            <circle cx="44" cy="62" r="1.5" fill="#FFE082" />
            <circle cx="56" cy="62" r="1.5" fill="#FFE082" />
            {/* Calyx leaves */}
            <path
              d="M50,28 C45,20 40,24 36,28 C44,30 48,32 50,34 C52,32 56,30 64,28 C60,24 55,20 50,28 Z"
              fill="#4CAF50"
            />
            <ellipse cx="36" cy="38" rx="4" ry="7" fill="#fff" fillOpacity="0.3" transform="rotate(-20, 36, 38)" />
          </g>
        );

      // ===== ティアラ (TIARAS) =====
      case 'tiara_princess_gold':
        return (
          <g>
            {/* Golden crown base */}
            <path
              d="M20,60 L24,40 L38,52 L50,25 L62,52 L76,40 L80,60 Z"
              fill="#FFD700"
              stroke="#FFA000"
              strokeWidth="2.5"
            />
            {/* Jewels */}
            <circle cx="50" cy="25" r="4.5" fill="#E91E63" stroke="#fff" strokeWidth="1.5" />
            <circle cx="24" cy="40" r="3.5" fill="#00E5FF" stroke="#fff" strokeWidth="1" />
            <circle cx="76" cy="40" r="3.5" fill="#00E5FF" stroke="#fff" strokeWidth="1" />
            <circle cx="50" cy="50" r="4" fill="#fff" />
            {/* Base arch band */}
            <path d="M18,60 C38,55 62,55 82,60" fill="none" stroke="#FFD700" strokeWidth="4" />
          </g>
        );

      case 'tiara_pearl_band':
        return (
          <g>
            <path d="M15,60 C35,32 65,32 85,60" fill="none" stroke="#CFD8DC" strokeWidth="3" />
            {[20, 30, 40, 50, 60, 70, 80].map((cx, i) => {
              const cy = 60 - Math.sin((i / 6) * Math.PI) * 26;
              const r = i === 3 ? 6.5 : 5;
              return (
                <g key={i}>
                  <circle cx={cx} cy={cy} r={r} fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1.5" />
                  <circle cx={cx - 1.5} cy={cy - 1.5} r={r * 0.35} fill="#fff" />
                </g>
              );
            })}
          </g>
        );

      // ===== お花 (FLOWERS) =====
      case 'flower_cherry_pink':
        return (
          <g>
            {[0, 72, 144, 216, 288].map(angle => (
              <path
                key={angle}
                d="M50,50 C40,30 46,16 50,18 C54,16 60,30 50,50 Z"
                fill="#F48FB1"
                stroke="#EC407A"
                strokeWidth="1"
                transform={`rotate(${angle}, 50, 50)`}
              />
            ))}
            <circle cx="50" cy="50" r="7" fill="#FFF59D" />
            <circle cx="50" cy="50" r="3" fill="#FFB74D" />
          </g>
        );

      case 'flower_sun_daisy':
        return (
          <g>
            {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
              <ellipse
                key={angle}
                cx="50"
                cy="28"
                rx="6"
                ry="14"
                fill="#FFFFFF"
                stroke="#E0E0E0"
                strokeWidth="1"
                transform={`rotate(${angle}, 50, 50)`}
              />
            ))}
            <circle cx="50" cy="50" r="10" fill="#FFCA28" stroke="#FFA000" strokeWidth="1.5" />
          </g>
        );

      // ===== きらきら (SPARKLES) =====
      case 'sparkle_fairy_gold':
        return (
          <g>
            <path
              d="M50,20 Q50,50 80,50 Q50,50 50,80 Q50,50 20,50 Q50,50 50,20 Z"
              fill="#FFEE58"
              stroke="#FFF"
              strokeWidth="2"
            />
            <circle cx="50" cy="50" r="5" fill="#fff" />
            <circle cx="28" cy="28" r="3" fill="#FFF9C4" />
            <circle cx="72" cy="72" r="3.5" fill="#FFF9C4" />
          </g>
        );

      case 'sparkle_heart_shower':
        return (
          <g>
            <path
              d="M50,55 C50,55 35,42 35,32 C35,24 42,20 48,24 C50,26 50,26 50,26 C50,26 50,26 52,24 C58,20 65,24 65,32 C65,42 50,55 50,55 Z"
              fill="#F48FB1"
            />
            <path
              d="M28,75 C28,75 18,65 18,58 C18,52 23,49 27,52 C28,54 28,54 28,54 C28,54 28,54 29,52 C33,49 38,52 38,58 C38,65 28,75 28,75 Z"
              fill="#CE93D8"
            />
            <circle cx="70" cy="65" r="4" fill="#FFD54F" />
          </g>
        );

      default:
        return (
          <g>
            <circle cx="50" cy="50" r="30" fill={color} />
            <circle cx="50" cy="50" r="15" fill="#fff" fillOpacity="0.4" />
          </g>
        );
    }
  };

  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full pointer-events-none drop-shadow-md overflow-visible"
      style={{
        transform: isMirrored ? 'scaleX(-1)' : 'none',
      }}
    >
      {renderGraphic()}
      {isSelected && (
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="#FF4081"
          strokeWidth="3.5"
          strokeDasharray="6 4"
        />
      )}
    </svg>
  );
};
