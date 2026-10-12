export function CategoryBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700">
      {label}
    </span>
  );
}

export function CostBadge({ cost }: { cost: string }) {
  const map: Record<string, string> = {
    Free: 'bg-green-100 text-green-800 ring-green-600/20 dark:bg-green-900/40 dark:text-green-200',
    Financed: 'bg-blue-100 text-blue-800 ring-blue-600/20 dark:bg-blue-900/40 dark:text-blue-200',
    Freemium: 'bg-amber-100 text-amber-800 ring-amber-600/20 dark:bg-amber-900/40 dark:text-amber-200',
    Paid: 'bg-slate-200 text-slate-700 ring-slate-500/20',
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${map[cost] ?? map.Paid}`}>
      🎓 {cost}
    </span>
  );
}
