import { X, ListOrdered } from 'lucide-react';
import { useEffect } from 'react';
import type { Guide, Lang } from '../lib/types';
import { dictionary } from '../i18n/dictionary';

export default function ResourceModal({
  guide,
  lang,
  onClose,
}: {
  guide: Guide | null;
  lang: Lang;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!guide) return null;
  const t = dictionary[lang];
  const title = lang === 'fr' ? guide.title_fr : guide.title_en;
  const steps = lang === 'fr' ? guide.steps_fr : guide.steps_en;

  return (
    <div role="dialog" aria-modal="true" aria-label={title} className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-6" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl dark:bg-slate-900 sm:rounded-3xl">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-200">
            <ListOrdered size={18} />
          </span>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">📖 {title}</h3>
          <button onClick={onClose} aria-label={t.close} className="ml-auto rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
            <X size={18} />
          </button>
        </div>
        <ol className="mt-4 space-y-3">
          {steps.map((s, i) => (
            <li key={i} className="flex gap-3 rounded-2xl border border-slate-200 p-3 text-sm leading-relaxed text-slate-700 dark:border-slate-800 dark:text-slate-200">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
        <button onClick={onClose} className="mt-5 w-full rounded-full bg-slate-900 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900">
          {t.close}
        </button>
      </div>
    </div>
  );
}
