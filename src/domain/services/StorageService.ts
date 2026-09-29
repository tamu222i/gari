/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HairLength, PlacedHairItem, SavedAlbumEntry } from '../types';

export const STORAGE_KEY_SESSION = 'girly_stylist_session_v1';
export const STORAGE_KEY_ALBUM = 'girly_stylist_album';

export interface StylingSessionState {
  clientId: string;
  gameMode: 'request' | 'free';
  freeHairLength: HairLength;
  placedItems: PlacedHairItem[];
  hairColor: string;
  isTwinMode: boolean;
  showGuides: boolean;
}

export class StorageService {
  /**
   * Saves the ongoing styling session state to localStorage
   */
  static saveSession(session: StylingSessionState): void {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return;
      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session));
    } catch (e) {
      console.warn('Failed to save styling session to localStorage:', e);
    }
  }

  /**
   * Loads the saved styling session state from localStorage
   */
  static loadSession(): Partial<StylingSessionState> | null {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return null;
      const raw = localStorage.getItem(STORAGE_KEY_SESSION);
      if (!raw) return null;

      const parsed = JSON.parse(raw);
      if (typeof parsed !== 'object' || parsed === null) return null;

      return {
        clientId: typeof parsed.clientId === 'string' ? parsed.clientId : undefined,
        gameMode: parsed.gameMode === 'free' ? 'free' : 'request',
        freeHairLength: parsed.freeHairLength || 'medium',
        placedItems: Array.isArray(parsed.placedItems) ? parsed.placedItems : [],
        hairColor: typeof parsed.hairColor === 'string' ? parsed.hairColor : undefined,
        isTwinMode: Boolean(parsed.isTwinMode),
        showGuides: Boolean(parsed.showGuides),
      };
    } catch (e) {
      console.warn('Failed to load styling session from localStorage:', e);
      return null;
    }
  }

  /**
   * Clears the saved styling session state
   */
  static clearSession(): void {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return;
      localStorage.removeItem(STORAGE_KEY_SESSION);
    } catch (e) {
      console.warn('Failed to clear styling session:', e);
    }
  }

  /**
   * Saves styling album entries
   */
  static saveAlbum(entries: SavedAlbumEntry[]): void {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return;
      localStorage.setItem(STORAGE_KEY_ALBUM, JSON.stringify(entries));
    } catch (e) {
      console.warn('Failed to save album to localStorage:', e);
    }
  }

  /**
   * Loads styling album entries
   */
  static loadAlbum(): SavedAlbumEntry[] {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return [];
      const raw = localStorage.getItem(STORAGE_KEY_ALBUM);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.warn('Failed to load album from localStorage:', e);
      return [];
    }
  }
}
