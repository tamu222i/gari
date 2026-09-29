/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HairLength, PlacedHairItem } from '../types';

export class HairArrangementAggregate {
  private baseLength: HairLength;
  private baseColor: string;
  private items: PlacedHairItem[] = [];

  constructor(baseLength: HairLength, baseColor: string) {
    this.baseLength = baseLength;
    this.baseColor = baseColor;
  }

  public getBaseLength(): HairLength {
    return this.baseLength;
  }

  public setBaseLength(length: HairLength): void {
    this.baseLength = length;
  }

  public getBaseColor(): string {
    return this.baseColor;
  }

  public setBaseColor(color: string): void {
    this.baseColor = color;
  }

  public getItems(): PlacedHairItem[] {
    return [...this.items];
  }

  public getItemById(id: string): PlacedHairItem | undefined {
    return this.items.find(item => item.id === id);
  }

  public addItem(item: Omit<PlacedHairItem, 'id'>): PlacedHairItem {
    const newItem: PlacedHairItem = {
      ...item,
      id: `item_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      x: this.clamp(item.x, 5, 95),
      y: this.clamp(item.y, 5, 95),
      scale: item.scale ?? 1,
      rotation: item.rotation ?? 0,
    };
    this.items.push(newItem);
    return newItem;
  }

  public addSymmetricPair(item: Omit<PlacedHairItem, 'id'>): [PlacedHairItem, PlacedHairItem] {
    const leftItem = this.addItem({
      ...item,
      x: item.x,
      rotation: item.rotation,
      isMirrored: false,
    });

    const mirroredX = 100 - item.x;
    const mirroredRotation = -item.rotation;

    const rightItem = this.addItem({
      ...item,
      x: mirroredX,
      rotation: mirroredRotation,
      isMirrored: true,
    });

    return [leftItem, rightItem];
  }

  public updateItemPosition(id: string, x: number, y: number): void {
    const target = this.items.find(i => i.id === id);
    if (target) {
      target.x = this.clamp(x, 5, 95);
      target.y = this.clamp(y, 5, 95);
    }
  }

  public updateItemTransform(id: string, scale: number, rotation: number): void {
    const target = this.items.find(i => i.id === id);
    if (target) {
      target.scale = Math.max(0.5, Math.min(1.8, scale));
      target.rotation = rotation;
    }
  }

  public removeItem(id: string): void {
    this.items = this.items.filter(i => i.id !== id);
  }

  public clear(): void {
    this.items = [];
  }

  private clamp(val: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, val));
  }
}
