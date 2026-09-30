# CHANGELOG

All notable changes to the Girly Stylist (きらきらガーリースタイリスト) web game will be documented in this file.

## [Unreleased]

### Added - Cycle 10 (TDD/BDD)
- Fashion Boutique (おしゃれ屋さん): Eye Color, Outfits, and Makeup customization:
  - 8 Eye Colors (ショコラ、サファイア、ルビー、エメラルド、アメジスト、アンバー、ナイトブラック、アクア) with sparkle reflection gradients.
  - 5 Outfit styles (プリンセスドレス、セーラーワンピ、ロリータブラウス、くま耳パーカー、キャミソールワンピ) and 8 outfit colors.
  - Makeup suite:
    - 5 Blush styles (ふんわり丸、ハート ❤️、お星さま ⭐、そばかす 🍓、なし) with 4 blush colors.
    - 5 Lip colors with toggleable glossy shine effect (ぷるぷるグロスツヤ).
    - 5 Eye shadow shades and 5 cute face stickers (ハート、スター、キラキラ、ちょうちょ).
  - 4 major shop tabs (💇‍♀️ ヘアパーツ, 🎀 アクセサリー, 💄 メイク＆アイ, 👗 お洋服＆カラー).
  - Session persistence integration for full fashion state.
  - Added BDD test suite (`src/fashionBoutique.test.ts`).

### Added - Cycle 9 (TDD/BDD)
- Full detail description display & tablet layout optimization:
  - Removed `truncate` on part and accessory descriptions, rendering full explanation and recommendations without text truncation.
  - Added dedicated "選択中パーツの詳細説明ボックス" (Selected Part Detail Box) with large emoji icon, full description, suitable hair lengths, and interactive placement hints.
  - Redesigned toolbox navigation with 3 prominent main tabs (💇‍♀️ ヘアパーツ, 🎀 アクセサリー, 🎨 ヘアカラー) and sub-category pills for rapid category exploration.
  - Optimized tablet layout (`md:grid-cols-12` for 768px - 1024px screens) so avatar canvas and toolbox sit side-by-side with sticky avatar positioning, eliminating unnecessary vertical scrolling on iPad.
  - Added BDD verification test suite (`src/tabletLayoutAndDescription.test.ts`).

### Added - Cycle 8 (TDD/BDD)
- Auto-save styling session state to localStorage (`StorageService`):
  - Preserves placed hair items (buns, braids, ribbons, pins, flowers, tiaras) across page reloads and browser refreshes.
  - Automatically restores selected client, hair color spray, game mode, hair length, and twin-mode settings on load.
  - Robust exception handling and fallback for private browsing or disabled storage.
  - BDD unit and integration test suites (`src/domain/services/StorageService.test.ts`, `src/sessionPersistence.test.ts`).

### Fixed - Cycle 7 (TDD/BDD)
- Resolved GitHub Actions `Dependencies lock file is not found` error:
  - Removed strict `cache: 'npm'` in `.github/workflows/deploy.yml` so runner does not crash when lock files are missing.
  - Generated and tracked official `package-lock.json`.
  - Added `--legacy-peer-deps` flag to `npm install` in CI workflow to prevent ERESOLVE conflicts with Vite & esbuild peer dependencies.
  - Updated BDD deployment test suite (`src/deploy.test.ts`).

### Added - Cycle 6 (TDD/BDD)
- Smartphone smooth vertical and horizontal scroll optimization:
  - Replaced restrictive viewport scale limitations in `index.html`.
  - Replaced `touch-none` on hair canvas with `touch-pan-y` and fine-grained drag cancellation to allow effortless vertical page scrolling on touch devices.
  - Enabled horizontal smooth touch swiping (`touch-pan-x` and `overscroll-x-contain`) on category tabs, color palettes, and request banners.
  - Added bottom padding (`pb-20`) to prevent smartphone home indicators and mobile navigation bars from obstructing styling controls.
  - BDD test suite verifying mobile scrolling and touch interactions (`src/mobileScroll.test.ts`).

### Added - Cycle 5 (TDD/BDD)
- GitHub Pages (`github.io`) deployment support with relative base asset paths (`base: './'` in `vite.config.ts`).
- GitHub Actions automated CI/CD workflow (`.github/workflows/deploy.yml`) for automated test, build, and Pages deployment on push to `main` / `master`.
- `gh-pages` dependency and `"predeploy"` / `"deploy"` scripts in `package.json` for one-command deployment.
- Deployment environment BDD verification tests (`src/deploy.test.ts`).

### Added - Cycle 4 (TDD/BDD)
- Player journey end-to-end BDD tests (`src/domain/services/IntegrationJourney.test.ts`) covering client requests, accessory positioning, and nuance grading.
- Vector SVG graphic renderer for hair parts and accessories (`src/components/HairGraphicPart.tsx`) with buns, braids, tails, curls, ribbons, clips, tiaras, and flowers.
- Interactive styling avatar canvas (`src/components/ClientGirlAvatar.tsx`, `src/components/HairCanvas.tsx`) supporting both tap-to-place and drag-and-drop.
- Stylist toolbox shelf (`src/components/StylistToolbox.tsx`) with twin symmetry mode, snap guide indicators, undo, clear, and hair tint colors.
- Evaluation result and photo booth modal (`src/components/ResultModal.tsx`) with fanfare audio, confetti, stamp stickers, and album saving.
- Stylist photo album gallery (`src/components/StylistAlbumModal.tsx`) with local persistence.
- Client selection picker (`src/components/ClientPickerModal.tsx`) and how-to-play guide (`src/components/HowToPlayModal.tsx`).
- Web Audio synthesizer (`src/utils/audio.ts`) providing cute sound effects without external downloads.

### Added - Cycle 3 (TDD/BDD)
- Hair arrangement aggregate (`src/domain/entities/Arrangement.ts`) handling coordinate boundary clamping, symmetric twin-mode placement, item manipulation, and removal.
- Comprehensive hair parts and accessory assets definitions (`src/domain/presets/hairAssets.ts`) covering buns, braids, tails, curls, ribbons, pins, tiaras, flowers, and sparkles.
- BDD test suite verifying arrangement aggregate behavior (`src/domain/entities/Arrangement.test.ts`).

### Added - Cycle 2 (TDD/BDD)
- Client request catalog with 6 cute characters across all hair lengths (short, bob, medium, long) (`src/domain/services/ClientCatalog.ts`).
- Character speech, nuances, target keywords, and styling criteria for 6-year-old accessibility.
- BDD test suite verifying catalog completeness and character retrieval (`src/domain/services/ClientCatalog.test.ts`).

### Added - Cycle 1 (TDD/BDD)
- Domain types definition for hair length, hair styles, accessories, and nuance (`src/domain/types.ts`).
- Hair arrangement scoring service (`src/domain/services/Scorer.ts`) with BDD test suite (`src/domain/services/Scorer.test.ts`).
- Verification of 100-point scoring, 3-star ranking system, and kid-friendly gentle praise.
