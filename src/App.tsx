/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  HairLength,
  HairItemDefinition,
  PlacedHairItem,
  ClientRequest,
  ScoreEvaluationResult,
  FashionState,
  DEFAULT_MAKEUP,
  DEFAULT_FASHION,
} from './domain/types';
import {
  getClientRequests,
  getRandomClient,
  getClientById,
} from './domain/services/ClientCatalog';
import { evaluateHairArrangement } from './domain/services/Scorer';
import { HairArrangementAggregate } from './domain/entities/Arrangement';
import { StorageService } from './domain/services/StorageService';
import { HairCanvas } from './components/HairCanvas';
import { StylistToolbox } from './components/StylistToolbox';
import { ClientRequestBanner } from './components/ClientRequestBanner';
import { ResultModal } from './components/ResultModal';
import { StylistAlbumModal, SavedAlbumEntry } from './components/StylistAlbumModal';
import { ClientPickerModal } from './components/ClientPickerModal';
import { HowToPlayModal } from './components/HowToPlayModal';
import { playCutePop, playSparkleSound } from './utils/audio';
import {
  Sparkles,
  BookOpen,
  HelpCircle,
  Scissors,
  CheckCircle,
  Crown,
  Heart,
} from 'lucide-react';

export default function App() {
  const allClients = useMemo(() => getClientRequests(), []);
  
  // Load saved session on initial mount so reload does not lose data
  const initialSession = useMemo(() => StorageService.loadSession(), []);

  const [currentClient, setCurrentClient] = useState<ClientRequest>(() => {
    if (initialSession?.clientId) {
      const saved = allClients.find(c => c.id === initialSession.clientId);
      if (saved) return saved;
    }
    return allClients[0];
  });

  const [gameMode, setGameMode] = useState<'request' | 'free'>(() => {
    return initialSession?.gameMode || 'request';
  });

  const [freeHairLength, setFreeHairLength] = useState<HairLength>(() => {
    return initialSession?.freeHairLength || 'medium';
  });

  const [currentHairColor, setCurrentHairColor] = useState<string>(() => {
    if (initialSession?.hairColor) return initialSession.hairColor;
    return allClients[0].hairColor;
  });

  // Fashion state: eye color, outfit style & color, makeup (blush, lips, eyeshadow, stickers)
  const [fashion, setFashion] = useState<FashionState>(() => {
    if (initialSession?.fashion) {
      return initialSession.fashion;
    }
    return {
      eyeColor: allClients[0].eyeColor || '#5D4037',
      outfitStyle: 'princess',
      outfitColor: allClients[0].outfitColor || '#F8BBD0',
      makeup: DEFAULT_MAKEUP,
    };
  });

  // Styling aggregate & state
  const [placedItems, setPlacedItems] = useState<PlacedHairItem[]>(() => {
    return initialSession?.placedItems || [];
  });
  const [history, setHistory] = useState<PlacedHairItem[][]>([]);
  const [selectedTool, setSelectedTool] = useState<HairItemDefinition | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isTwinMode, setIsTwinMode] = useState<boolean>(() => {
    return Boolean(initialSession?.isTwinMode);
  });
  const [showGuides, setShowGuides] = useState<boolean>(() => {
    return Boolean(initialSession?.showGuides);
  });

  // Modals state
  const [evaluationResult, setEvaluationResult] = useState<ScoreEvaluationResult | null>(null);
  const [isAlbumOpen, setIsAlbumOpen] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);

  // Local storage for Album photos
  const [albumEntries, setAlbumEntries] = useState<SavedAlbumEntry[]>(() => {
    return StorageService.loadAlbum();
  });

  // Automatically persist session to localStorage on any state change so reload preserves state
  useEffect(() => {
    StorageService.saveSession({
      clientId: currentClient.id,
      gameMode,
      freeHairLength,
      placedItems,
      hairColor: currentHairColor,
      isTwinMode,
      showGuides,
      fashion,
    });
  }, [currentClient.id, gameMode, freeHairLength, placedItems, currentHairColor, isTwinMode, showGuides, fashion]);

  // Persist album whenever entries change
  useEffect(() => {
    StorageService.saveAlbum(albumEntries);
  }, [albumEntries]);

  const activeHairLength = gameMode === 'request' ? currentClient.hairLength : freeHairLength;

  // Sync hair color & default fashion on client change in request mode
  const handleSelectClient = (client: ClientRequest) => {
    setCurrentClient(client);
    setCurrentHairColor(client.hairColor);
    setFashion(prev => ({
      ...prev,
      eyeColor: client.eyeColor || prev.eyeColor,
      outfitColor: client.outfitColor || prev.outfitColor,
    }));
    setPlacedItems([]);
    setHistory([]);
    setSelectedTool(null);
    setSelectedItemId(null);
    setEvaluationResult(null);
  };

  const handleRandomClient = () => {
    const nextClient = getRandomClient(currentClient.id);
    handleSelectClient(nextClient);
  };

  const saveHistorySnapshot = (newItems: PlacedHairItem[]) => {
    setHistory(prev => [...prev.slice(-10), placedItems]);
    setPlacedItems(newItems);
  };

  // Undo
  const handleUndo = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));
    setPlacedItems(previous);
    setSelectedItemId(null);
  };

  // Clear
  const handleClear = () => {
    if (placedItems.length === 0) return;
    saveHistorySnapshot([]);
    setSelectedItemId(null);
  };

  // Tap-to-place on canvas
  const handleCanvasTapToPlace = (x: number, y: number) => {
    if (!selectedTool) return;

    const aggregate = new HairArrangementAggregate(activeHairLength, currentHairColor);
    // Load existing items
    placedItems.forEach(i => aggregate.addItem(i));

    if (isTwinMode) {
      // Place symmetric twin pair
      aggregate.addSymmetricPair({
        itemId: selectedTool.id,
        category: selectedTool.category,
        name: selectedTool.name,
        x: x < 50 ? x : 100 - x,
        y: y,
        scale: 1,
        rotation: 0,
        color: selectedTool.defaultColor,
      });
    } else {
      aggregate.addItem({
        itemId: selectedTool.id,
        category: selectedTool.category,
        name: selectedTool.name,
        x: x,
        y: y,
        scale: 1,
        rotation: 0,
        color: selectedTool.defaultColor,
      });
    }

    saveHistorySnapshot(aggregate.getItems());
  };

  // Move placed item
  const handleMoveItem = (id: string, x: number, y: number) => {
    setPlacedItems(prev =>
      prev.map(item => (item.id === id ? { ...item, x, y } : item))
    );
  };

  // Scale and rotate placed item
  const handleScaleRotateItem = (id: string, scale: number, rotation: number) => {
    saveHistorySnapshot(
      placedItems.map(item => (item.id === id ? { ...item, scale, rotation } : item))
    );
  };

  // Remove placed item
  const handleRemoveItem = (id: string) => {
    saveHistorySnapshot(placedItems.filter(item => item.id !== id));
  };

  // Finish & Evaluate
  const handleFinish = () => {
    playCutePop();
    const result = evaluateHairArrangement(
      gameMode === 'request'
        ? currentClient
        : {
            ...currentClient,
            hairLength: freeHairLength,
            hairColor: currentHairColor,
            rules: {
              targetNuance: 'cute_fluffy',
            },
          },
      placedItems
    );
    setEvaluationResult(result);
  };

  // Save to Album
  const handleSaveToAlbum = (photoData: { score: number; stars: number; stamp: string }) => {
    const newEntry: SavedAlbumEntry = {
      id: `photo_${Date.now()}`,
      clientName: gameMode === 'request' ? currentClient.clientName : 'フリーアレンジ',
      hairLength: activeHairLength,
      hairColor: currentHairColor,
      score: photoData.score,
      stars: photoData.stars,
      stamp: photoData.stamp,
      dateStr: new Date().toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' }),
      fashion,
    };

    const updated = [newEntry, ...albumEntries];
    setAlbumEntries(updated);
    StorageService.saveAlbum(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50/40 to-pink-50 text-slate-800 flex flex-col selection:bg-pink-300">
      {/* 1. TOP BAR (Following Top Bar Contract: 3-zones, clean single-line wordmark, text nav, actions) */}
      <header className="h-16 px-4 sm:px-8 border-b border-pink-200/80 bg-white/90 backdrop-blur-md flex items-center justify-between sticky top-0 z-40">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-500 to-rose-400 flex items-center justify-center text-white shadow-sm">
            <Scissors className="w-4 h-4" />
          </div>
          <span className="text-lg sm:text-xl font-black text-pink-700 tracking-tight whitespace-nowrap">
            きらきらガーリースタイリスト
          </span>
        </div>

        {/* Zone 2: Clean unboxed text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-bold text-slate-600">
          <button
            type="button"
            onClick={() => setGameMode('request')}
            className={`hover:text-pink-600 transition-colors ${
              gameMode === 'request' ? 'text-pink-600 font-black' : ''
            }`}
          >
            おねがいモード
          </button>
          <button
            type="button"
            onClick={() => setGameMode('free')}
            className={`hover:text-pink-600 transition-colors ${
              gameMode === 'free' ? 'text-pink-600 font-black' : ''
            }`}
          >
            じゆうモード
          </button>
          <button
            type="button"
            onClick={() => setIsPickerOpen(true)}
            className="hover:text-pink-600 transition-colors"
          >
            おきゃくさま一覧
          </button>
          <button
            type="button"
            onClick={() => setIsHowToPlayOpen(true)}
            className="hover:text-pink-600 transition-colors"
          >
            あそびかた
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              setIsAlbumOpen(true);
              playCutePop();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-700 font-extrabold text-xs sm:text-sm transition-colors shadow-sm"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">アルバム</span>
            {albumEntries.length > 0 && (
              <span className="bg-pink-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-black">
                {albumEntries.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsHowToPlayOpen(true)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 md:hidden"
            title="あそびかた"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleFinish}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-black text-xs sm:text-sm shadow-md shadow-pink-300 active:scale-95 transition-all whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4" />
            <span>かんせい！</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE CONTAINER */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-3 sm:p-6 pb-20 flex flex-col gap-4 overflow-x-hidden">
        {/* Client Request Speech Banner */}
        <ClientRequestBanner
          client={currentClient}
          gameMode={gameMode}
          freeHairLength={freeHairLength}
          onSelectClientModal={() => setIsPickerOpen(true)}
          onRandomClient={handleRandomClient}
          onToggleGameMode={setGameMode}
          onChangeFreeLength={setFreeHairLength}
        />

        {/* Studio Layout (Canvas & Toolbox) - Tablet (md: 768px+) & Desktop 2-column view */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 items-start">
          {/* Hair Styling Canvas (Left col-5 on tablet & desktop) */}
          <div className="md:col-span-5 flex flex-col items-center md:sticky md:top-20">
            <HairCanvas
              hairLength={activeHairLength}
              hairColor={currentHairColor}
              eyeColor={fashion.eyeColor}
              outfitColor={fashion.outfitColor}
              outfitStyle={fashion.outfitStyle}
              makeup={fashion.makeup}
              mood={evaluationResult ? evaluationResult.clientReaction : currentClient.avatarMood}
              placedItems={placedItems}
              selectedItemId={selectedItemId}
              selectedToolItem={selectedTool}
              showGuides={showGuides}
              onSelectItem={setSelectedItemId}
              onMoveItem={handleMoveItem}
              onScaleRotateItem={handleScaleRotateItem}
              onRemoveItem={handleRemoveItem}
              onCanvasTapToPlace={handleCanvasTapToPlace}
            />

            {/* Finish Action Banner right below canvas */}
            <div className="w-full max-w-[420px] mt-3.5 flex items-center gap-2">
              <button
                type="button"
                onClick={handleFinish}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-black text-sm sm:text-base shadow-xl shadow-pink-300 flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <Sparkles className="w-5 h-5" />
                <span>アレンジかんせい！しんさする♡</span>
              </button>
            </div>
          </div>

          {/* Stylist Toolbox Shelf (Right col-7 on tablet & desktop) */}
          <div className="md:col-span-7 flex flex-col gap-3">
            <StylistToolbox
              currentHairLength={activeHairLength}
              currentHairColor={currentHairColor}
              fashion={fashion}
              selectedTool={selectedTool}
              isTwinMode={isTwinMode}
              showGuides={showGuides}
              onSelectTool={setSelectedTool}
              onToggleTwinMode={() => setIsTwinMode(prev => !prev)}
              onToggleGuides={() => setShowGuides(prev => !prev)}
              onUndo={handleUndo}
              onClear={handleClear}
              onChangeHairColor={setCurrentHairColor}
              onChangeFashion={setFashion}
            />

            {/* Stylist Tip Card for 6yo */}
            <div className="bg-pink-100/50 rounded-2xl border border-pink-200/70 p-3 sm:p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-pink-400 text-white flex items-center justify-center shrink-0 text-lg shadow-sm">
                💡
              </div>
              <p className="text-xs sm:text-sm font-bold text-pink-800 leading-snug">
                スタイリストのコツ：お団子や三つ編みをつけたあと、タップすると「まわす」「おおきく」「ちいさく」できるよ！リボンを重ねづけするとさらにかわいいよ♡
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* 3. MODALS */}
      {/* Evaluation Result Modal */}
      {evaluationResult && (
        <ResultModal
          client={currentClient}
          placedItems={placedItems}
          hairColor={currentHairColor}
          result={evaluationResult}
          onNextClient={() => {
            setEvaluationResult(null);
            handleRandomClient();
          }}
          onRetry={() => {
            setEvaluationResult(null);
          }}
          onSaveToAlbum={handleSaveToAlbum}
        />
      )}

      {/* Stylist Album Modal */}
      {isAlbumOpen && (
        <StylistAlbumModal
          entries={albumEntries}
          onClose={() => setIsAlbumOpen(false)}
        />
      )}

      {/* Client Picker Modal */}
      {isPickerOpen && (
        <ClientPickerModal
          clients={allClients}
          currentClientId={currentClient.id}
          onSelectClient={handleSelectClient}
          onClose={() => setIsPickerOpen(false)}
        />
      )}

      {/* How To Play Modal */}
      {isHowToPlayOpen && (
        <HowToPlayModal onClose={() => setIsHowToPlayOpen(false)} />
      )}
    </div>
  );
}
