import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import ContinentSection from './components/ContinentSection';
import ResourceModal from './components/ResourceModal';
import EmptyState from './components/EmptyState';
import Footer from './components/Footer';
import type { Continent, Country, Directory, Guide, Lang } from './lib/types';
import { countResources, filterCountries, useDebouncedValue } from './lib/search';
import { dictionary } from './i18n/dictionary';

export default function App() {
  const [lang, setLang] = useState<Lang>('en');
  const [dark, setDark] = useState(false);
  const [query, setQuery] = useState('');
  const [continent, setContinent] = useState<Continent | 'All'>('All');
  const [countryCode, setCountryCode] = useState('All');
  const [categories, setCategories] = useState<string[]>([]);
  const [freeOnly, setFreeOnly] = useState(false);
  const [guideId, setGuideId] = useState<string | null>(null);
  // Code-split data: the app shell boots instantly (loading state) while the
  // large directory JSON (~1.6 MB source) downloads as a separate chunk.
  const [directory, setDirectory] = useState<Directory | null>(null);
  const [guides, setGuides] = useState<Guide[]>([]);

  useEffect(() => {
    let cancelled = false;
    Promise.all([import('./data/trainingData.json'), import('./data/guides.json')])
      .then(([dataMod, guidesMod]) => {
        if (cancelled) return;
        setDirectory(dataMod.default as unknown as Directory);
        setGuides(guidesMod.default as unknown as Guide[]);
      })
      .catch((error) => console.error('Failed to load directory data', error));
    return () => {
      cancelled = true;
    };
  }, []);

  const debouncedQuery = useDebouncedValue(query, 200);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleCategory = (id: string) =>
    setCategories((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));

  const filtered = useMemo(
    () =>
      filterCountries((directory?.countries ?? []) as Country[], {
        query: debouncedQuery,
        continent,
        countryCode,
        categories,
        freeOnly,
      }),
    [directory, debouncedQuery, continent, countryCode, categories, freeOnly],
  );

  const total = useMemo(() => countResources(filtered), [filtered]);
  const t = dictionary[lang];

  const byContinent = useMemo(() => {
    const map = new Map<Continent, Country[]>();
    for (const c of filtered) {
      if (!map.has(c.continent)) map.set(c.continent, []);
      map.get(c.continent)!.push(c);
    }
    return [...map.entries()];
  }, [filtered]);

  const activeGuide = guides.find((g) => g.id === guideId) ?? null;

  if (!directory) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <span className="text-4xl" role="img" aria-label="globe">
          🌍
        </span>
        <p className="text-sm text-slate-500 dark:text-slate-400" role="status">
          {t.loading}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Header
        lang={lang} setLang={setLang} dark={dark} setDark={setDark}
        query={query} setQuery={setQuery}
        continent={continent} setContinent={setContinent}
        countryCode={countryCode} setCountryCode={setCountryCode}
        categories={categories} toggleCategory={toggleCategory}
        freeOnly={freeOnly} setFreeOnly={setFreeOnly}
        countries={directory.countries as Country[]} total={total}
      />
      <main className="mx-auto max-w-6xl space-y-5 px-4 py-6 sm:px-6">
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400" role="status">
          {total} {t.results} • {filtered.length} {t.countriesCount}
        </p>
        {filtered.length === 0 ? (
          <EmptyState
            lang={lang}
            onClear={() => {
              setQuery(''); setContinent('All'); setCountryCode('All'); setCategories([]); setFreeOnly(false);
            }}
          />
        ) : (
          byContinent.map(([cont, list], i) => (
            <ContinentSection key={cont} continent={cont} countries={list} lang={lang} defaultOpen={i === 0} onOpenGuide={setGuideId} />
          ))
        )}
        <Footer lang={lang} />
      </main>
      <ResourceModal guide={activeGuide} lang={lang} onClose={() => setGuideId(null)} />
    </div>
  );
}
