# PitchBridge

**PitchBridge** is a two-sided demo marketplace that connects **creators / founders** who have business ideas with **funders / investors** who want to browse pitches and signal funding interest.

> **Demo only:** "Fund interest" / pledges are stored in your browser's `localStorage`. There are **no real payments**, no securities offering, and no backend. Do not treat pledges as commitments of real money.

## Features

- **Landing page** with clear value props for creators and funders
- **Browse ideas** — card grid with category chips, funding ask, interest counts
- **Filters** — category, max funding ask, sort (newest / ask / interest)
- **Idea detail** — full pitch (problem, solution, market, monetization, ask) plus interest form
- **Submit idea** — validated form (title, problem, solution, market, monetization, funding ask, category, founder name)
- **Role toggle** — Creator vs Funder (no real auth); optional display name in localStorage
- **~8 seeded sample ideas** plus any you add locally
- **Responsive** layout for mobile and desktop
- Client-side only; works offline after `npm run build` + static hosting / `preview`

## Stack

- Vite + React + TypeScript
- React Router
- Custom CSS (no heavy UI kit)

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

### Production build

```bash
npm run build
npm run preview
```

## Data

- Seed ideas load once into `localStorage`
- New ideas and funder interests persist in the same browser
- Clear site data / localStorage to reset to seeds

## License

MIT — feel free to fork and extend.
