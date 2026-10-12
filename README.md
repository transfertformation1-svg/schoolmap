# SchoolMap / Annuaire Mondial des Formations

Modern, responsive, bilingual (EN/FR) directory grouping free & financed learning resources by **Continent > Country (flag) > Category > Training Item**.

## Stack
- React + Vite + TypeScript
- Tailwind CSS (dark mode `class`)
- Lucide icons + native flag emojis
- `useState` + `useMemo` instant search (accent-insensitive, debounced)

## Run
```bash
npm install
npm run dev
```

## Structure
- `src/lib/types.ts` — strict schema
- `src/lib/search.ts` — normalize + filter logic
- `src/i18n/dictionary.ts` — EN/FR strings
- `src/data/trainingData.json` — **195 countries** (6 enriched: ZA/FR/US/IN/AU/BR + 189 with UNESCO/Coursera/Khan/edX), **1013 resources** (incl. **197 national libraries**, 1 per country + ZA/FR extras)
- `src/data/guides.json` — Coursera Financial Aid + local tips
- `src/components/` — Header, ContinentSection, CountryCard, TrainingCard, ResourceModal, EmptyState, Footer
- `src/App.tsx` — state + layout

## Deploy on Vercel

```bash
npm i -g vercel
vercel
```

Or: push this repo to GitHub, then **Import Project** on [vercel.com](https://vercel.com) — framework preset `Vite`, build `npm run build`, output `dist` (see `vercel.json`).
