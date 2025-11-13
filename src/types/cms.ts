// CMS Types for Google Sheets integration

export interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: string;
  imageUrl: string;
  visible: boolean;
  order: number;
  details?: string[]; // Optional array of detail items
}

export interface Settings {
  logoUrl?: string;
  headerText?: string;
  headerSubtext?: string;
  primaryColor?: string;
  secondaryColor?: string;
  heroImage?: string;
  contactEmail?: string;
  contactPhone?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  [key: string]: string | undefined; // Allow any additional settings
}

export interface CMSData {
  services: Service[];
  settings: Settings;
  lastUpdated: string;
}
