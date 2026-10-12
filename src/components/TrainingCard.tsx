import { useState } from 'react';
import { BookOpen, ExternalLink, Lightbulb, Users, BadgeCheck, Languages } from 'lucide-react';
import type { Lang, TrainingItem } from '../lib/types';
import { dictionary } from '../i18n/dictionary';
import { CategoryBadge, CostBadge } from './CategoryBadge';

export default function TrainingCard({
  item,
  lang,
  onOpenGuide,
}: {
  item: TrainingItem;
  lang: Lang;
  onOpenGuide: (id: string) => void;
}) {
  const [openTips, setOpenTips] = useState(false);
  const t = dictionary[lang];
  return (
    <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-wrap items-center gap-2">
        <h4 className="text-base font-semibold text-slate-900 dark:text-white">{item.title}</h4>
        {item.verified && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-900/30 dark:text-emerald-200">
            <BadgeCheck size={14} /> ✅ {t.verified}
          </span>
        )}
        <CostBadge cost={item.cost} />
      </div>
      <p className="mt-2 line-clamp-3 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
      <div className="mt-3 flex flex-wrap gap-1.5" aria-label={t.subjects}>
        <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400"><BookOpen size={13} /> 📚</span>
        {item.subjects.map((s) => (
          <CategoryBadge key={s} label={s} />
        ))}
      </div>
      <div className="mt-2 space-y-1 text-xs text-slate-600 dark:text-slate-300">
        <p className="flex items-center gap-1.5"><Users size={13} /> 👥 {item.audience.join(', ')}</p>
        <p>🎓 <strong>{t.certification}:</strong> {item.certification}</p>
        <p className="flex items-center gap-1.5"><Languages size={13} /> 🌐 {item.language.join(', ')}</p>
      </div>
      {item.tips && (
        <div className="mt-3 rounded-xl bg-amber-50 p-3 text-xs text-amber-900 ring-1 ring-amber-200 dark:bg-amber-900/20 dark:text-amber-100 dark:ring-amber-800">
          <button onClick={() => setOpenTips(!openTips)} className="flex items-center gap-1.5 font-semibold" aria-expanded={openTips}>
            <Lightbulb size={14} /> 💡 {t.practicalTips} {openTips ? '▾' : '▸'}
          </button>
          {openTips && <p className="mt-1.5 leading-relaxed">{item.tips}</p>}
        </div>
      )}
      <div className="mt-4 flex flex-wrap gap-2 pt-1">
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400">
          <ExternalLink size={15} /> 🔗 {t.visitSite}
        </a>
        {item.guideId && (
          <button onClick={() => onOpenGuide(item.guideId!)} className="[STRING_PLACEHOLDER_1]">
            📖 {t.viewGuide}
          </button>
        )}
      </div>
    </article>
  );
}
