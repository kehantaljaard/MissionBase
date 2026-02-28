'use client';

import { useState, useEffect } from 'react';
import { SiteContent } from '@/lib/types';
import { getContentClient } from '@/lib/content';
import { defaultContent } from '@/data/defaultContent';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import WhatWeDoSection from '@/components/WhatWeDoSection';
import TeamFounderSection from '@/components/TeamFounderSection';
import DonateSection from '@/components/DonateSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import AdminPanel from '@/components/admin/AdminPanel';
import CollapsibleSection from '@/components/CollapsibleSection';

export default function Home() {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    getContentClient().then(setContent);
  }, []);

  return (
    <main>
      <Navbar onAdminClick={() => setAdminOpen(true)} />
      <HeroSection content={content.hero} />
      <CollapsibleSection title={content.whatWeDo.heading} id="whatwedo" color="teal">
        <WhatWeDoSection content={content.whatWeDo} />
      </CollapsibleSection>
      <CollapsibleSection title="Our People" id="ourpeople" color="blue">
        <TeamFounderSection team={content.team} founder={content.founder} />
      </CollapsibleSection>
      <CollapsibleSection title={content.donate.heading} id="donate" color="rose">
        <DonateSection content={content.donate} />
      </CollapsibleSection>
      <CollapsibleSection title={content.contact.heading} id="contact" color="green">
        <ContactSection content={content.contact} />
      </CollapsibleSection>
      <Footer content={content.footer} />
      <AdminPanel
        onContentChange={setContent}
        open={adminOpen}
        onClose={() => setAdminOpen(false)}
      />
    </main>
  );
}
