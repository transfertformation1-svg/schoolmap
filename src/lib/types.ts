export type Continent = 'Africa' | 'Europe' | 'Americas' | 'Asia' | 'Oceania';

export type CostType = 'Free' | 'Freemium' | 'Financed' | 'Paid';

export interface TrainingItem {
  id: string;
  title: string;
  url: string;
  verified: boolean;
  subjects: string[];
  audience: string[];
  certification: string;
  cost: CostType;
  duration?: string;
  language: string[];
  description: string;
  tips?: string;
  guideId?: string;
}

export interface Category {
  id: string;
  label_en: string;
  label_fr: string;
  icon: string;
  items: TrainingItem[];
}

export interface Country {
  code: string; // ISO2 e.g. ZA
  name_en: string;
  name_fr: string;
  flag: string; // emoji e.g. 🇿🇦
  continent: Continent;
  categories: Category[];
}

export interface Directory {
  continents: Continent[];
  countries: Country[];
}

export interface Guide {
  id: string;
  title_en: string;
  title_fr: string;
  steps_en: string[];
  steps_fr: string[];
}

export type Lang = 'en' | 'fr';
