import { Globe2 } from 'lucide-react';
import type { Country, Lang } from '../lib/types';
import { dictionary } from '../i18n/dictionary';
import TrainingCard from './TrainingCard';

export default function CountryCard({
  country,
  lang,
  onOpenGuide,
}: {
  country: Country;
  lang: Lang;
  onOpenGuide: (id: string) => void;
}) {
  const t = dictionary[lang];
  const count = country.categories.reduce((a, c) => a + c.items.length, 0);
  return (
    <section aria-label={country.name_en} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-900/40">
      <header className="flex flex-wrap items-center gap-3 border-b border-slate-200 px-5 py-4 dark:border-slate-800">
        <span className="text-3xl" role="img" aria-label={`Flag of ${country.name_en}`}>{country.flag}</span>
        <div className="min-w-0">
          <h3 className="truncate text-lg font-bold text-slate-900 dark:text-white">
            {lang === 'fr' ? country.name_fr : country.name_en}
          </h3>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {country.code} • {count} {count === 1 ? t.resourceCount : t.resourcesCount}
          </p>
        </div>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-200 dark:ring-indigo-800">
          <Globe2 size={13} /> {country.continent}
        </span>
      </header>
      <div className="space-y-6 p-5">
        {country.categories.map((cat) => (
          <div key={cat.id}>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-700 dark:text-slate-200">
              <span>{cat.icon}</span>
              {lang === 'fr' ? cat.label_fr : cat.label_en}
              <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs normal-case text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {cat.items.length}
              </span>
            </h4>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {cat.items.map((it) => (
                <TrainingCard key={it.id} item={it} lang={lang} onOpenGuide={onOpenGuide} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
