
export type Language = 'en' | 'te' | 'hi' | 'es' | 'fr' | 'zh' | 'ja' | 'bn' | 'ta' | 'kn' | 'ml' | 'gu' | 'mr';

export type TranslationMap = {
  [key in Language]?: string;
} & {
  en: string; // English is mandatory as fallback
};

export interface LearningItem {
  id: string;
  name: TranslationMap;
  description?: TranslationMap;
  image?: string;
  img?: string;
  pronunciation?: string;
  category?: string;
  sound?: string;
  icon?: string;
  symbol?: string;
  color?: string;
  example?: {
    [key in Language]?: { en: string; [key: string]: string; img: string };
  } & {
    en: { en: string; [key: string]: string; img: string };
  };
}

export interface Module {
  id: string;
  title: TranslationMap;
  icon: string;
  color: string;
  items?: LearningItem[];
}

export interface UserProgress {
  stars: number;
  unlockedModules: string[];
  completedItems: string[];
  settings?: {
    speechSpeed: number;
    adsEnabled: boolean;
    interstitialFrequency: number; // 0 to 1 (probability)
    defaultDonationAmount?: number;
  };
  analytics?: {
    [moduleId: string]: {
      visits: number;
      timeSpent: number;
    };
  };
}
