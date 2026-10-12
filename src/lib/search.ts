import { useEffect, useState } from 'react';
import type { Continent, Country } from './types';

/** Accent + case insensitive normalize for instant search */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export function useDebouncedValue<T>(value: T, delay = 200): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export interface Filters {
  query: string;
  continent: Continent | 'All';
  countryCode: string | 'All';
  categories: string[];
  freeOnly: boolean;
}

export function countResources(countries: Country[]): number {
  return countries.reduce(
    (acc, c) => acc + c.categories.reduce((a, cat) => a + cat.items.length, 0),
    0,
  );
}

export function filterCountries(all: Country[], f: Filters): Country[] {
  const q = normalize(f.query);
  return all
    .filter((c) => (f.continent === 'All' ? true : c.continent === f.continent))
    .filter((c) => (f.countryCode === 'All' ? true : c.code === f.countryCode))
    .map((c) => ({
      ...c,
      categories: c.categories
        .filter((cat) => (f.categories.length === 0 ? true : f.categories.includes(cat.id)))
        .map((cat) => ({
          ...cat,
          items: cat.items.filter((it) => {
            if (f.freeOnly && !(it.cost === 'Free' || it.cost === 'Financed')) return false;
            if (!q) return true;
            const hay = normalize(
              [it.title, it.description, it.certification, it.tips ?? '', c.name_en, c.name_fr, cat.label_en, cat.label_fr, ...it.subjects, ...it.audience].join(' '),
            );
            return q.split(/\s+/).every((tok) => hay.includes(tok));
          }),
        }))
        .filter((cat) => cat.items.length > 0),
    }))
    .filter((c) => c.categories.length > 0);
}
