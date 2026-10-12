import { useState } from 'react';
import { ChevronDown, Map } from 'lucide-react';
import type { Continent, Country, Lang } from '../lib/types';
import { dictionary } from '../i18n/dictionary';
import CountryCard from './CountryCard';

export default function ContinentSection({
  continent,
  countries,
  lang,
  defaultOpen,
  onOpenGuide,
}: {
  continent: Continent;
  countries: Country[];
  lang: Lang;
  defaultOpen: boolean;
  onOpenGuide: (id: string) => void;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const t = dictionary[lang];
  const count = countries.reduce((a, c) => a + c.categories.reduce((x, cat) => x + cat.items.length, 0), 0);
  return (
    <section aria-label={continent} className="rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-5 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-900 rounded-3xl"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white">
          <Map size={18} />
        </span>
        <span className="text-lg font-extrabold text-slate-900 dark:text-white">{continent}</span>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {countries.length} {countries.length === 1 ? t.countryCount : t.countriesCount} • {count} {t.results}
        </span>
        <ChevronDown size={18} className={`ml-auto text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="space-y-5 px-4 pb-5 sm:px-5">
          {countries.map((c) => (
            <CountryCard key={c.code} country={c} lang={lang} onOpenGuide={onOpenGuide} />
          ))}
        </div>
      )}
    </section>
  );
}
