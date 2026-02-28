export interface SiteContent {
  hero: HeroContent;
  whatWeDo: WhatWeDoContent;
  team: TeamContent;
  founder: FounderContent;
  donate: DonateContent;
  contact: ContactContent;
  footer: FooterContent;
}

export interface HeroContent {
  heading: string;
  tagline: string;
  description: string;
  backgroundImage?: string;
  galleryImages?: string[];
  mealsThisWeek?: number;
}

export interface WhatWeDoContent {
  heading: string;
  soupKitchen: string;
  backATeenager: string;
  programs: string;
  bgColor?: string;
}

export interface TeamContent {
  heading: string;
  description: string;
  images?: string[];
  bgColor?: string;
}

export interface FounderContent {
  heading: string;
  name: string;
  description: string;
  image?: string;
  bgColor?: string;
}

export interface DonateContent {
  heading: string;
  description: string;
  bgColor?: string;
  snapScanUrl?: string;
  bankDetails: {
    bank: string;
    accountName: string;
    branchCode: string;
    accountNumber: string;
    accountType: string;
  };
  priorityNeeds: string[];
  prayerFocus: string;
}

export interface ContactContent {
  heading: string;
  bgColor?: string;
  phone: string;
  email: string;
  facebook: string;
  instagram: string;
  registrationNumber: string;
}

export interface FooterContent {
  orgName: string;
  registrationNumber: string;
  directors: string[];
}
