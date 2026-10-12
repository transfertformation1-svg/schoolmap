# Global Training Directory / Annuaire Mondial des Formations

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
- `src/data/trainingData.json` — 6 countries (ZA full + FR/US/IN/AU/BR samples)
- `src/data/guides.json` — Coursera Financial Aid + local tips
- `src/components/` — Header, ContinentSection, CountryCard, TrainingCard, ResourceModal, EmptyState, Footer
- `src/App.tsx` — state + layout
