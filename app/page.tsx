'use client';

import { useState, useEffect } from 'react';
import { SiteContent } from '@/lib/types';
import { getContentClient } from '@/lib/content';
import { defaultContent } from '@/data/defaultContent';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TeamSection from '@/components/TeamSection';
import FounderSection from '@/components/FounderSection';
import DonateSection from '@/components/DonateSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import AdminPanel from '@/components/admin/AdminPanel';

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
      <TeamSection content={content.team} />
      <FounderSection content={content.founder} />
      <DonateSection content={content.donate} />
      <ContactSection content={content.contact} />
      <Footer content={content.footer} />
      <AdminPanel
        onContentChange={setContent}
        open={adminOpen}
        onClose={() => setAdminOpen(false)}
      />
    </main>
  );
}
