/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { PlacedHairItem, HairLength, HairItemDefinition, OutfitStyle, MakeupState } from '../domain/types';
import { ClientGirlAvatar } from './ClientGirlAvatar';
import { HairGraphicPart } from './HairGraphicPart';
import { playCutePop, playSparkleSound } from '../utils/audio';
import { Trash2, RotateCw, ZoomIn, ZoomOut } from 'lucide-react';

interface HairCanvasProps {
  hairLength: HairLength;
  hairColor: string;
  eyeColor?: string;
  outfitColor?: string;
  outfitStyle?: OutfitStyle;
  makeup?: MakeupState;
  mood?: 'excited' | 'smiling' | 'shy' | 'dreamy' | 'super_happy' | 'happy' | 'smile';
  placedItems: PlacedHairItem[];
  selectedItemId: string | null;
  selectedToolItem: HairItemDefinition | null;
  showGuides: boolean;
  onSelectItem: (id: string | null) => void;
  onMoveItem: (id: string, x: number, y: number) => void;
  onScaleRotateItem: (id: string, scale: number, rotation: number) => void;
  onRemoveItem: (id: string) => void;
  onCanvasTapToPlace: (x: number, y: number) => void;
}

export const HairCanvas: React.FC<HairCanvasProps> = ({
  hairLength,
  hairColor,
  eyeColor,
  outfitColor,
  outfitStyle,
  makeup,
  mood = 'smiling',
  placedItems,
  selectedItemId,
  selectedToolItem,
  showGuides,
  onSelectItem,
  onMoveItem,
  onScaleRotateItem,
  onRemoveItem,
  onCanvasTapToPlace,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [draggingItemId, setDraggingItemId] = useState<string | null>(null);

  // Handle clicking on the canvas directly to place the selected tool item
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (draggingItemId) return;
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const xPercent = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
    const yPercent = Math.max(5, Math.min(95, ((clientY - rect.top) / rect.height) * 100));

    if (selectedToolItem) {
      playCutePop();
      onCanvasTapToPlace(Math.round(xPercent), Math.round(yPercent));
    } else {
      // Tap background deselects active item
      onSelectItem(null);
    }
  };

  // Dragging support for placed items
  const startDrag = (itemId: string, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setDraggingItemId(itemId);
    onSelectItem(itemId);
    playCutePop();

    const handleMove = (moveEvt: MouseEvent | TouchEvent) => {
      if ('cancelable' in moveEvt && moveEvt.cancelable) {
        moveEvt.preventDefault();
      }
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const currentX = 'touches' in moveEvt ? moveEvt.touches[0].clientX : moveEvt.clientX;
      const currentY = 'touches' in moveEvt ? moveEvt.touches[0].clientY : moveEvt.clientY;

      const x = Math.max(5, Math.min(95, ((currentX - rect.left) / rect.width) * 100));
      const y = Math.max(5, Math.min(95, ((currentY - rect.top) / rect.height) * 100));
      onMoveItem(itemId, Math.round(x), Math.round(y));
    };

    const handleEnd = () => {
      setDraggingItemId(null);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleEnd);
  };

  const selectedItem = placedItems.find(i => i.id === selectedItemId);

  return (
    <div className="relative flex flex-col items-center w-full">
      <div
        ref={containerRef}
        onClick={handleCanvasClick}
        className={`relative w-full max-w-[420px] cursor-pointer touch-pan-y transition-shadow ${
          selectedToolItem ? 'ring-4 ring-pink-400 ring-offset-2' : ''
        }`}
      >
        <ClientGirlAvatar
          hairLength={hairLength}
          hairColor={hairColor}
          eyeColor={eyeColor}
          outfitColor={outfitColor}
          outfitStyle={outfitStyle}
          makeup={makeup}
          mood={mood}
          showSnapGuides={showGuides}
          onSnapPointClick={(x, y) => {
            onCanvasTapToPlace(x, y);
            playCutePop();
          }}
        >
          {/* Render all placed items */}
          {placedItems.map(item => {
            const isSelected = item.id === selectedItemId;
            // Base visual size according to category
            const baseSize = item.category === 'bun' ? 88 : item.category === 'tail' ? 96 : item.category === 'braid' ? 84 : 64;
            const size = baseSize * (item.scale || 1);

            return (
              <div
                key={item.id}
                onMouseDown={e => startDrag(item.id, e)}
                onTouchStart={e => startDrag(item.id, e)}
                onClick={e => {
                  e.stopPropagation();
                  onSelectItem(item.id);
                  playSparkleSound();
                }}
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  transform: `translate(-50%, -50%) rotate(${item.rotation || 0}deg)`,
                }}
                className={`absolute pointer-events-auto cursor-grab active:cursor-grabbing transition-transform select-none ${
                  isSelected ? 'z-30' : 'z-20'
                }`}
              >
                <HairGraphicPart
                  item={item}
                  baseHairColor={hairColor}
                  isSelected={isSelected}
                />
              </div>
            );
          })}
        </ClientGirlAvatar>

        {/* Selected Item Quick Action Bar (Easy for 6yo) */}
        {selectedItem && (
          <div
            onClick={e => e.stopPropagation()}
            className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/95 px-4 py-2 rounded-2xl shadow-xl border-2 border-pink-300 z-40 animate-in fade-in zoom-in-95 duration-150"
          >
            <span className="text-xs font-bold text-pink-700 mr-1 whitespace-nowrap">
              {selectedItem.name}
            </span>

            {/* Rotate */}
            <button
              type="button"
              onClick={() => {
                const nextRot = ((selectedItem.rotation || 0) + 30) % 360;
                onScaleRotateItem(selectedItem.id, selectedItem.scale, nextRot);
                playCutePop();
              }}
              className="p-2 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-700 active:scale-90 transition-transform"
              title="まわす"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            {/* Size Up */}
            <button
              type="button"
              onClick={() => {
                const nextScale = Math.min(1.6, (selectedItem.scale || 1) + 0.15);
                onScaleRotateItem(selectedItem.id, nextScale, selectedItem.rotation);
                playCutePop();
              }}
              className="p-2 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-700 active:scale-90 transition-transform"
              title="おおきく"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            {/* Size Down */}
            <button
              type="button"
              onClick={() => {
                const nextScale = Math.max(0.6, (selectedItem.scale || 1) - 0.15);
                onScaleRotateItem(selectedItem.id, nextScale, selectedItem.rotation);
                playCutePop();
              }}
              className="p-2 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-700 active:scale-90 transition-transform"
              title="ちいさく"
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            {/* Remove */}
            <button
              type="button"
              onClick={() => {
                onRemoveItem(selectedItem.id);
                onSelectItem(null);
                playCutePop();
              }}
              className="p-2 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-700 active:scale-90 transition-transform"
              title="はずす"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Helpful Hint Banner for 6-Year-Old Stylist */}
      <div className="mt-4 text-center">
        {selectedToolItem ? (
          <p className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-500 text-white font-bold text-xs sm:text-sm shadow-md animate-pulse">
            <span>✨</span>
            <span>「{selectedToolItem.name}」を あたまのつけたい場所をタップしてね！</span>
          </p>
        ) : (
          <p className="text-xs sm:text-sm font-medium text-pink-700/80">
            下のパーツをえらんで、あたまのすきな場所にペタッとつけよう♪
          </p>
        )}
      </div>
    </div>
  );
};
