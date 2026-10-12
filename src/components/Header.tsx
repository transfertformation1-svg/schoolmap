import { Globe2, Moon, Search, Sun } from 'lucide-react';
import { dictionary, type DictKey } from '../i18n/dictionary';
import type { Continent, Country, Lang } from '../lib/types';

const CONTINENTS: (Continent | 'All')[] = ['All', 'Africa', 'Europe', 'Americas', 'Asia', 'Oceania'];
const CATS: { id: string; icon: string; labelKey: DictKey }[] = [
  { id: 'governmental', icon: '🏛️', labelKey: 'cat_governmental' },
  { id: 'international', icon: '🌍', labelKey: 'cat_international' },
  { id: 'local', icon: '💻', labelKey: 'cat_local' },
  { id: 'library', icon: '📚', labelKey: 'cat_library' },
  { id: 'resources', icon: '🆓', labelKey: 'cat_resources' },
];

export default function Header(props: {
  lang: Lang;
  setLang: (l: Lang) => void;
  dark: boolean;
  setDark: (v: boolean) => void;
  query: string;
  setQuery: (v: string) => void;
  continent: Continent | 'All';
  setContinent: (v: Continent | 'All') => void;
  countryCode: string;
  setCountryCode: (v: string) => void;
  categories: string[];
  toggleCategory: (id: string) => void;
  freeOnly: boolean;
  setFreeOnly: (v: boolean) => void;
  countries: Country[];
  total: number;
}) {
  const t = dictionary[props.lang];
  const visibleCountries = props.countries.filter((c) => props.continent === 'All' || c.continent === props.continent);

  return (
    <header className="overflow-hidden rounded-b-[2rem] bg-gradient-to-br from-indigo-700 via-indigo-600 to-cyan-500 text-white">
      <div className="mx-auto max-w-6xl px-4 pb-8 pt-6 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌍</span>
          <p className="text-xs font-bold uppercase tracking-widest opacity-80">{t.subtitle}</p>
          <div className="ml-auto flex gap-2">
            <button onClick={() => props.setLang(props.lang === 'en' ? 'fr' : 'en')} className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold backdrop-blur hover:bg-white/25" aria-label="Language">
              <span className="inline-flex items-center gap-1"><Globe2 size={13} /> {props.lang === 'en' ? 'FR' : 'EN'}</span>
            </button>
            <button onClick={() => props.setDark(!props.dark)} className="rounded-full bg-white/15 p-2 backdrop-blur hover:bg-white/25" aria-label={props.dark ? t.lightMode : t.darkMode}>
              {props.dark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>
        </div>
        <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">{t.title}</h1>
        <p className="mt-1 max-w-2xl text-sm opacity-90 sm:text-base">{t.tagline} • {props.total} {t.results}</p>
        <div className="mt-5 flex items-center gap-2 rounded-full bg-white p-2 pl-4 text-slate-900 shadow-lg">
          <Search size={18} className="shrink-0 text-slate-500" />
          <input value={props.query} onChange={(e) => props.setQuery(e.target.value)} placeholder={t.searchPlaceholder} aria-label="Search" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" />
        </div>
        <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Continents">
          {CONTINENTS.map((c) => (
            <button key={c} role="tab" aria-selected={props.continent === c} onClick={() => props.setContinent(c)} className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${props.continent === c ? 'bg-white text-indigo-700' : 'bg-white/15 text-white hover:bg-white/25'}`}>
              {c === 'All' ? t.allContinents : c}
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <select value={props.countryCode} onChange={(e) => props.setCountryCode(e.target.value)} aria-label="Country" className="rounded-full bg-white/15 px-4 py-2 text-xs font-semibold backdrop-blur outline-none [&>option]:text-slate-900">
            <option value="All">{t.allCountries}</option>
            {visibleCountries.map((c) => (
              <option key={c.code} value={c.code}>{c.flag} {props.lang === 'fr' ? c.name_fr : c.name_en}</option>
            ))}
          </select>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold">
            <input type="checkbox" checked={props.freeOnly} onChange={(e) => props.setFreeOnly(e.target.checked)} className="h-3.5 w-3.5 accent-emerald-400" />
            {t.freeOnly}
          </label>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {CATS.map((cat) => (
            <button key={cat.id} onClick={() => props.toggleCategory(cat.id)} aria-pressed={props.categories.includes(cat.id)} className={`rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${props.categories.includes(cat.id) ? 'bg-white text-indigo-700 ring-white' : 'bg-transparent text-white ring-white/40 hover:bg-white/10'}`}>
              {cat.icon} {t[cat.labelKey]}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
