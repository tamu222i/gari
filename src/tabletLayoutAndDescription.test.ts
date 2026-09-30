/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('BDD: 詳細説明文の完全表示とタブレットレイアウト検証 (Part Description & Tablet Layout Spec)', () => {
  it('Given StylistToolbox コンポーネント When 説明文の表示仕様を確認する Then truncate による文字切れがなく、選択中パーツの完全な説明文が表示される構造になっている', () => {
    const toolboxPath = path.resolve('src/components/StylistToolbox.tsx');
    const content = fs.readFileSync(toolboxPath, 'utf-8');

    // Should contain dedicated selected tool details panel
    expect(content).toContain('selectedTool');
    expect(content).toContain('selectedTool.description');
    // Ensure item card description does NOT use truncate
    expect(content).not.toMatch(/className="[^"]*text-\[[0-9]+px\][^"]*truncate[^"]*">\s*\{\s*item\.description/);
  });

  it('Given StylistToolbox コンポーネント When タブ分類を確認する Then ヘアパーツ・アクセサリー・ヘアカラーの大分類タブが提供されている', () => {
    const toolboxPath = path.resolve('src/components/StylistToolbox.tsx');
    const content = fs.readFileSync(toolboxPath, 'utf-8');

    // Main tabs for clean tablet & mobile organization
    expect(content).toContain('ヘアパーツ');
    expect(content).toContain('アクセサリー');
    expect(content).toContain('ヘアカラー');
  });

  it('Given App.tsx メインレイアウト When レスポンシブグリッドを確認する Then タブレット幅 (md: 768px) で左右2カラムレイアウト (md:grid-cols-12) が適用されている', () => {
    const appPath = path.resolve('src/App.tsx');
    const content = fs.readFileSync(appPath, 'utf-8');

    // Tablet layout verification
    expect(content).toMatch(/md:grid-cols-12/);
    expect(content).toMatch(/md:col-span-5/);
    expect(content).toMatch(/md:col-span-7/);
  });
});
