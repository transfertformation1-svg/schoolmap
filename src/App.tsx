import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import ContinentSection from './components/ContinentSection';
import ResourceModal from './components/ResourceModal';
import EmptyState from './components/EmptyState';
import Footer from './components/Footer';
import data from './data/trainingData.json';
import guidesData from './data/guides.json';
import type { Continent, Country, Directory, Guide, Lang } from './lib/types';
import { countResources, filterCountries, useDebouncedValue } from './lib/search';
import { dictionary } from './i18n/dictionary';

const directory = data as unknown as Directory;
const guides = guidesData as unknown as Guide[];

export default function App() {
  const [lang, setLang] = useState<Lang>('en');
  const [dark, setDark] = useState(false);
  const [query, setQuery] = useState('');
  const [continent, setContinent] = useState<Continent | 'All'>('All');
  const [countryCode, setCountryCode] = useState('All');
  const [categories, setCategories] = useState<string[]>([]);
  const [freeOnly, setFreeOnly] = useState(false);
  const [guideId, setGuideId] = useState<string | null>(null);

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
    () => filterCountries(directory.countries as Country[], { query: debouncedQuery, continent, countryCode, categories, freeOnly }),
    [debouncedQuery, continent, countryCode, categories, freeOnly],
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
