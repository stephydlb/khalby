export interface Track {
  id: string;
  title: string;
  artist: string;
  versionTag: string; // e.g., 'DIRECT YOUTUBE', 'SINGLE OFFICIEL', 'CLIP OFFICIEL'
  duration: string;
  durationSeconds: number;
  youtubeId?: string;
  spotifyUrl?: string;
  coverUrl: string;
  isHot?: boolean;
  audioSampleType?: 'afro-beat' | 'melodic' | 'atmospheric';
}

export interface VideoItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string; // 'CLIP OFFICIEL' | 'VISUALIZER'
  youtubeId: string;
  thumbnail: string;
  duration: string;
  views?: string;
}

export type CardTier = 'standard' | 'premium' | 'deluxe';

export interface GoldenCardTier {
  id: CardTier;
  tabLabel: string;
  tabBadge: string;
  badgeType: 'green' | 'gold' | 'amber';
  title: string;
  editionBadge: string;
  subtitleIntro: string;
  quote?: string;
  description: string;
  cardSerialNumber?: string;
  cardStatus: string;
  chipColor: string;
  features: {
    label: string;
    description: string;
    checked: boolean;
  }[];
  commercialStatus: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'Studio' | 'Scène' | 'The Golden' | 'Argentique';
  imageUrl: string;
  aspectRatio: string;
  caption: string;
  date: string;
}
