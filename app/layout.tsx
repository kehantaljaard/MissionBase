import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  icons: {
    icon: '/images/Logo.jpeg',
  },
  title: 'Mission Base Ministries | Serving the Enkanini Community',
  description:
    "God's Kingdom Change Generations — Mission Base Ministries serves the Enkanini community near Stellenbosch, South Africa through feeding programs, Bible study, youth mentorship, and community empowerment.",
  keywords: [
    'Mission Base Ministries',
    'Luyolo Community Empowerment',
    'Enkanini',
    'Stellenbosch',
    'NGO',
    'South Africa',
    'community development',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
