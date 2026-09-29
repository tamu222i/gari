/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('BDD: スマホ向け縦横スクロールとタッチ操作対応検証 (Mobile Scroll & Touch Spec)', () => {
  it('Given index.html When viewportメタタグを確認する Then ユーザーの自由なスクロールや拡大を阻害する user-scalable=no が解除されている', () => {
    const htmlPath = path.resolve('index.html');
    const content = fs.readFileSync(htmlPath, 'utf-8');

    expect(content).not.toContain('user-scalable=no');
    expect(content).not.toContain('maximum-scale=1.0');
    expect(content).toContain('name="viewport" content="width=device-width, initial-scale=1.0"');
  });

  it('Given HairCanvas.tsx When キャンバスコンテナのクラスを確認する Then ページ縦スクロールを妨げる touch-none がコンテナ全体から削除され、ドラッグ中のみ制御されている', () => {
    const canvasPath = path.resolve('src/components/HairCanvas.tsx');
    const content = fs.readFileSync(canvasPath, 'utf-8');

    // Container itself should not have touch-none blocking page scroll
    expect(content).not.toMatch(/cursor-pointer\s+touch-none/);
  });

  it('Given StylistToolbox.tsx When タブやシェルフのスクロール設定を確認する Then 横スクロール(touch-pan-x や overflow-x-auto)がスマホ向けに正しく設定されている', () => {
    const toolboxPath = path.resolve('src/components/StylistToolbox.tsx');
    const content = fs.readFileSync(toolboxPath, 'utf-8');

    expect(content).toContain('overflow-x-auto');
    expect(content).toContain('touch-pan-x');
  });

  it('Given App.tsx When メインレイアウトを確認する Then スマホ画面下部でボタンが隠れないよう十分な余白とスクロール領域が確保されている', () => {
    const appPath = path.resolve('src/App.tsx');
    const content = fs.readFileSync(appPath, 'utf-8');

    expect(content).toMatch(/pb-(12|16|20|24)/);
  });
});
