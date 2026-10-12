import { SearchX } from 'lucide-react';
import { dictionary } from '../i18n/dictionary';
import type { Lang } from '../lib/types';

export default function EmptyState({ lang, onClear }: { lang: Lang; onClear: () => void }) {
  const t = dictionary[lang];
  return (
    <div className="flex flex-col items-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-950">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
        <SearchX size={24} className="text-slate-500" />
      </span>
      <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">{t.noResultsTitle}</h3>
      <p className="mt-1 text-sm text-slate-500">{t.noResultsText}</p>
      <button onClick={onClear} className="mt-5 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
        {t.clearFilters}
      </button>
    </div>
  );
}
