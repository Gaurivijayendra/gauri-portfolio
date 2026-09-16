# Gauri — portfolio

React + Vite + TypeScript + Tailwind CSS v4 + Framer Motion. Deploy target: Vercel.

## Run locally

```bash
npm install
npm run dev
```

## What's here

- **Avatar system** — `src/components/avatar/AvatarPose.tsx` is the single entry point every
  section uses to place Gauri on the page (`<AvatarPose pose="cute-sitting" />`). Right now the
  color/sketch tracks are hand-coded parametric SVG (`Chibi.tsx`) and the pixel track is a
  hand-authored pixel-grid sprite (`PixelSprite.tsx`) — these are stand-ins for the real
  character-sheet exports. **To swap in the real art**: export each pose as
  `src/assets/avatar/{pose}-{variant}.{svg|png}` and change `AvatarPose` to render those files
  instead of `<Chibi>`/`<PixelSprite>`; every section already calls through `AvatarPose`, so no
  section file needs to change.
- **Console easter egg** — type `console` into the ⌘K palette. It flips a `console-mode` class on
  `<html>` that retargets the whole design-token palette (see `src/index.css`), which is what
  re-skins every section at once, and swaps every visible `AvatarPose` to its pixel track via
  `ConsoleModeContext`.
- **Staff line** — `src/components/StaffLine.tsx` draws via scroll progress (`useScroll`) and
  converges to a single line in the last 5% of scroll, for the footer resolve.
- Résumé lives at `public/resume.pdf` (copied from the Desktop); the palette's "Open résumé"
  command opens it directly.

## Deploy

Standard Vite app — `vercel.json` isn't needed. Connect the repo to Vercel or run:

```bash
npm run build
```

and deploy the `dist/` folder.
