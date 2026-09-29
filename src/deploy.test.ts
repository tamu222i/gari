/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('BDD: GitHub Pages デプロイ環境設定検証 (GitHub Pages Deployment Spec)', () => {
  it('Given package.json When スクリプトを確認する Then predeploy と deploy スクリプトが設定されている', () => {
    const pkgJsonPath = path.resolve('package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));

    expect(pkg.scripts.predeploy).toBe('npm run build');
    expect(pkg.scripts.deploy).toBe('gh-pages -d dist');
  });

  it('Given vite.config.ts When 設定を確認する Then GitHub Pagesのサブパスに対応するため base: "./" が設定されている', () => {
    const viteConfigPath = path.resolve('vite.config.ts');
    const content = fs.readFileSync(viteConfigPath, 'utf-8');

    expect(content).toMatch(/base:\s*['"]\.\/['"]/);
  });

  it('Given GitHub Actions ワークフロー When ファイルを確認する Then .github/workflows/deploy.yml が存在し pages デプロイが定義されている', () => {
    const workflowPath = path.resolve('.github/workflows/deploy.yml');
    expect(fs.existsSync(workflowPath)).toBe(true);

    const content = fs.readFileSync(workflowPath, 'utf-8');
    expect(content).toContain('actions/deploy-pages');
    expect(content).toContain('actions/upload-pages-artifact');
  });
});
