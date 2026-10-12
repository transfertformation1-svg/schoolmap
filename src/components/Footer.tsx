import { GraduationCap } from 'lucide-react';
import { dictionary } from '../i18n/dictionary';
import type { Lang } from '../lib/types';

export default function Footer({ lang }: { lang: Lang }) {
  const t = dictionary[lang];
  return (
    <footer className="mt-10 border-t border-slate-200 py-8 text-center dark:border-slate-800">
      <p className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
        <GraduationCap size={16} /> 🌍 {t.title} • {t.subtitle}
      </p>
      <p className="mx-auto mt-2 max-w-2xl text-xs text-slate-500 dark:text-slate-400">{t.footerText}</p>
    </footer>
  );
}
