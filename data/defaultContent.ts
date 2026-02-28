import { SiteContent } from '@/lib/types';

export const defaultContent: SiteContent = {
  hero: {
    heading: 'Mission Base Ministries',
    tagline: "God's Kingdom Change Generations",
    description:
      'Serving the Enkanini community near Stellenbosch, South Africa with love, compassion, and the message of hope. Through faith-driven initiatives, we empower individuals and families to build a brighter future.',
    galleryImages: [],
    mealsThisWeek: 0,
  },
  whatWeDo: {
    heading: 'What We Do',
    soupKitchen:
      'Our soup kitchen, "Feeding in Faith", is the heart of our ministry. Every week we prepare and serve hot, nutritious meals to community members in need — ensuring no one in Enkanini goes hungry. This programme brings people together, nourishes bodies and souls, and creates a space where hope is served alongside every plate.',
    backATeenager:
      'Our "Back a Teenager" initiative pairs sponsors with young people in the community, providing them with educational support, mentorship, and resources they need to succeed. By backing a teenager, you invest directly in the future of Enkanini.',
    programs: `**Bible Study** — Weekly gatherings where community members come together to study the Word of God, find encouragement, and grow in their faith.

**Ruth Ministry** — A women's ministry focused on supporting and empowering women in the community through fellowship, mentorship, and practical assistance.

**Clinic Ministry** — Partnering with local health services to ensure community members have access to basic healthcare and health education.

**SAPS Ministry** — Working alongside the South African Police Service to build bridges between law enforcement and the community, fostering trust and safety.

**Children's Ministry** — Nurturing the youngest members of our community through age-appropriate teaching, activities, and care programs.

**Youth Mentorship** — Guiding teenagers and young adults toward positive life choices through mentorship, skills development, and spiritual guidance.`,
  },
  team: {
    heading: 'The Team',
    description: 'Meet the passionate volunteers and workers who make Mission Base Ministries possible.',
    images: [],
  },
  founder: {
    heading: 'Our Founder',
    name: 'Daniel Langenhoven',
    description: `Daniel Langenhoven serves as the Director of Luyolo Community Empowerment NPC, operating under the banner of Mission Base Ministries. His heart beats for the people of Enkanini — a vibrant but under-resourced informal settlement near Stellenbosch.

With a deep conviction that God's Kingdom can change generations, Daniel has dedicated his life to serving this community. He leads a team of passionate volunteers and workers who provide food, spiritual guidance, healthcare support, and youth mentorship to those who need it most.

Daniel's vision extends beyond meeting immediate needs. He believes in empowering individuals to become agents of change in their own communities, creating a ripple effect that transforms families and neighborhoods for generations to come.`,
  },
  donate: {
    heading: 'Support Our Work',
    description:
      'Your generous contribution helps us continue serving the Enkanini community. Every rand makes a difference in the lives of those we serve.',
    bankDetails: {
      bank: 'Capitec Business',
      accountName: 'Luyolo Community Empowerment NPC',
      branchCode: '450105',
      accountNumber: '1051529441',
      accountType: 'Current',
    },
    priorityNeeds: [
      'Non-perishable food',
      'Clothing for men, women, and children',
      'Toiletries and sanitary products for girls',
      'Fire extinguishers',
      'Volunteers for children\'s ministry and youth mentorship',
      'Resources for Feeding in Faith',
    ],
    prayerFocus:
      'Please pray for the safety of the Enkanini community, for the growth of our ministry programs, for provision of resources, and for the teenagers and children we serve — that they would find hope and purpose.',
  },
  contact: {
    heading: 'Get In Touch',
    phone: '072 122 3688',
    email: 'info@upliftment.org.za',
    facebook: 'https://www.facebook.com/missionbaseministries',
    instagram: 'https://www.instagram.com/missionbaseministries',
    registrationNumber: '2023/85533/08',
  },
  footer: {
    orgName: 'Luyolo Community Empowerment NPC',
    registrationNumber: '2023/85533/08',
    directors: [
      'Jacobus Daniel Langenhoven',
      'Loretta Nontsikelelo Sokabo',
      'Wiseman Xakisile Zondiwe',
    ],
  },
};
