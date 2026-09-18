export interface PillarItem {
  number: string;
  title: string;
  description: string;
  icon: string;
  badge?: string;
  colorClass?: string;
}

export interface MicroRitual {
  id: string;
  stepNumber: number;
  title: string;
  duration: string;
  format: string;
  description: string;
  instruction: string;
  keyPrompt?: string;
  bullets?: string[];
  themeColor: 'primary' | 'secondary' | 'tertiary';
}

export interface WorkshopDate {
  id: string;
  dateStr: string;
  timeStr: string;
  location: string;
  spotsLeft: number;
  maxSpots: number;
}

export interface Workshop {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  priceUnit: string;
  badge: string;
  duration: string;
  schedule: string;
  description: string;
  imageUrl: string;
  features: string[];
  dates: WorkshopDate[];
}

export interface SessionService {
  id: string;
  title: string;
  modalidad: string;
  categoryTag: string;
  price: number;
  durationMinutes: number;
  description: string;
  suitableFor: string[];
  benefits: string[];
  tagColor: 'primary' | 'secondary' | 'tertiary';
  locationNote?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface TherapistProfile {
  name: string;
  instagram: string;
  role: string;
  location: string;
  subtitle: string;
  portraitUrl: string;
  quote: string;
  paragraphs: string[];
  credentials: {
    icon: string;
    text: string;
    color: 'primary' | 'secondary' | 'tertiary';
  }[];
}

export interface StudioSpaceInfo {
  name: string;
  location: string;
  neighborhood: string;
  description: string;
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
  address: string;
  metro: string;
  image: string;
}

export interface BookingSubmission {
  names: string;
  email: string;
  serviceId: string;
  modalityLocation?: string;
  preferredDate?: string;
  notes?: string;
  timestamp: Date;
}
