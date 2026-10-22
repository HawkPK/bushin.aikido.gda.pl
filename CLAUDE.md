# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static marketing site for the Bushin Dojo aikido club in Gdańsk, live at https://bushin.pl. All user-facing content is in **Polish**. Built with Create React App (TypeScript), Ant Design 5, and React Router 7.

## Commands

- `npm start` — dev server on http://localhost:3000. If the port is taken, CRA exits in non-interactive shells; set `PORT=3001` (PowerShell: `$env:PORT='3001'; npm start`).
- `npm run build` — production build into `build/`. ESLint warnings (unused vars) are printed but do not fail the build.
- `npm test` — Jest via react-scripts (watch mode). Single file: `npm test -- --watchAll=false src/App.test.tsx`. Note: `src/App.test.tsx` is the stale CRA template test ("learn react") and fails against the current app.
- `npm run deploy` — publishes the site (see below).

## Deployment

Hosting is GitHub Pages from the `gh-pages` branch of `HawkPK/bushin.aikido.gda.pl`. `npm run deploy` runs `predeploy` (`npm run build`) and then `gh-pages -d build`, which pushes `build/` to `gh-pages`. The custom domain comes from `public/CNAME` (`bushin.pl`), which must stay in `public/`.

- Deploy publishes **whatever is in the current working tree**, not `main`. Deploy from an up-to-date `main` (or merge first), otherwise a later deploy from `main` will revert unmerged changes.
- Pages caches for about 10 minutes. To verify a deploy, compare the `main.<hash>.js` name in `build/index.html` against `curl -s https://bushin.pl/ | grep -o 'main\.[a-f0-9]*\.js'`.

## Architecture

- `src/App.tsx` holds the whole shell: header with the `合氣道` logo, a desktop `Menu` plus a mobile `Drawer` sharing one `menuItems` array, the route table, and the footer containing contact details (address, phone, email).
- Routing uses **`HashRouter`** (URLs look like `/#/schedule`) because GitHub Pages has no SPA fallback, and `package.json` uses `"homepage": "."`. Keep it that way.
- Each page lives in `src/pages/` as a self-contained component with its content hard-coded in JSX/arrays. There is no CMS, API, or state management. For example, the class timetable is the `scheduleData` array in `src/pages/Schedule.tsx`, and its `level` text drives the tag color (`Początkujący` → green, `Zaawansowani` → blue, `Dzieci` → purple).
- The `/news` route exists, but its menu entry is commented out in `App.tsx`.
- Styling uses global CSS in `src/App.css` and `src/index.css`, plus `src/pages/Schedule.css`, along with Ant Design components and inline styles.
- The logo font (Yuji Syuku) loads from Google Fonts in `public/index.html`, subset to the three glyphs `合氣道` via the `text=` parameter. If you change the logo characters, update that URL too.
