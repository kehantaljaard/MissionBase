export interface SiteContent {
  hero: HeroContent;
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
}

export interface TeamContent {
  heading: string;
  description: string;
  image?: string;
}

export interface FounderContent {
  heading: string;
  name: string;
  description: string;
  image?: string;
}

export interface DonateContent {
  heading: string;
  description: string;
  bankDetails: {
    bank: string;
    accountName: string;
    branchCode: string;
    accountNumber: string;
    accountType: string;
  };
  priorityNeeds: string[];
  backATeenager: string;
  prayerFocus: string;
}

export interface ContactContent {
  heading: string;
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
