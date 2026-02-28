'use client';

import { useState, useEffect, useCallback } from 'react';
import { SiteContent } from '@/lib/types';
import { getContentClient, saveContent, validatePassword } from '@/lib/content';
import SectionEditor from './SectionEditor';

const TABS = ['Hero', 'What We Do', 'Team', 'Founder', 'Donate', 'Contact', 'Footer'] as const;
type Tab = (typeof TABS)[number];

const TAB_COLORS: Record<Tab, { active: string; inactive: string }> = {
  Hero: { active: 'bg-gray-700 text-white', inactive: 'bg-gray-100 text-gray-600 hover:bg-gray-200' },
  'What We Do': { active: 'bg-teal-600 text-white', inactive: 'bg-teal-50 text-teal-700 hover:bg-teal-100' },
  Team: { active: 'bg-blue-600 text-white', inactive: 'bg-blue-50 text-blue-700 hover:bg-blue-100' },
  Founder: { active: 'bg-amber-500 text-white', inactive: 'bg-amber-50 text-amber-700 hover:bg-amber-100' },
  Donate: { active: 'bg-rose-600 text-white', inactive: 'bg-rose-50 text-rose-700 hover:bg-rose-100' },
  Contact: { active: 'bg-green-700 text-white', inactive: 'bg-green-50 text-green-700 hover:bg-green-100' },
  Footer: { active: 'bg-yellow-600 text-white', inactive: 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100' },
};

interface Props {
  onContentChange?: (content: SiteContent) => void;
  open: boolean;
  onClose: () => void;
}

export default function AdminPanel({ onContentChange, open, onClose }: Props) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('Hero');
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('admin_password');
    if (stored) {
      setPassword(stored);
      setAuthenticated(true);
    }
  }, []);

  const loadContent = useCallback(async () => {
    const data = await getContentClient();
    setContent(data);
  }, []);

  useEffect(() => {
    if (open && authenticated) {
      loadContent();
    }
  }, [open, authenticated, loadContent]);

  const handleLogin = async () => {
    setLoginError('');
    const valid = await validatePassword(passwordInput);
    if (valid) {
      setPassword(passwordInput);
      setAuthenticated(true);
      sessionStorage.setItem('admin_password', passwordInput);
    } else {
      setLoginError('Incorrect password. Please try again.');
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setPassword('');
    setPasswordInput('');
    sessionStorage.removeItem('admin_password');
    onClose();
  };

  const handleSaveSection = async (section: keyof SiteContent, data: Record<string, unknown>) => {
    if (!content) return;
    const updated = { ...content, [section]: data };
    setContent(updated);
    const success = await saveContent(updated, password);
    if (success && onContentChange) {
      onContentChange(updated);
    }
    if (!success) {
      alert('Failed to save. Please try again.');
    }
  };

  const heroFields = [
    { key: 'heading', label: 'Heading', type: 'text' as const },
    { key: 'tagline', label: 'Tagline', type: 'text' as const },
    { key: 'description', label: 'Description', type: 'textarea' as const },
    { key: 'backgroundImage', label: 'Background Image', type: 'image' as const, aspectRatio: 16 / 9 },
    { key: 'galleryImages', label: 'Gallery Photos (up to 10)', type: 'gallery' as const, aspectRatio: 4 / 3 },
    { key: 'mealsThisWeek', label: 'Meals Served This Week', type: 'number' as const },
  ];

  const whatWeDoFields = [
    { key: 'heading', label: 'Section Heading', type: 'text' as const },
    { key: 'soupKitchen', label: 'Soup Kitchen Description', type: 'textarea' as const },
    { key: 'backATeenager', label: 'Back a Teenager', type: 'textarea' as const },
    { key: 'programs', label: 'Programs (use **text** for bold headings)', type: 'textarea' as const },
    { key: 'bgColor', label: 'Section Background Color', type: 'color' as const },
  ];

  const teamFields = [
    { key: 'heading', label: 'Section Heading', type: 'text' as const },
    { key: 'description', label: 'Short Description', type: 'text' as const },
    { key: 'images', label: 'Team Photos (up to 5)', type: 'gallery' as const, aspectRatio: 1 },
    { key: 'bgColor', label: 'Section Background Color', type: 'color' as const },
  ];

  const founderFields = [
    { key: 'heading', label: 'Section Heading', type: 'text' as const },
    { key: 'name', label: 'Founder Name', type: 'text' as const },
    { key: 'description', label: 'About the Founder', type: 'textarea' as const },
    { key: 'image', label: 'Founder Image', type: 'image' as const, aspectRatio: 1 },
    { key: 'bgColor', label: 'Section Background Color', type: 'color' as const },
  ];

  const donateFields = [
    { key: 'heading', label: 'Section Heading', type: 'text' as const },
    { key: 'description', label: 'Description', type: 'textarea' as const },
    { key: 'bank', label: 'Bank', type: 'text' as const, nested: 'bankDetails' },
    { key: 'accountName', label: 'Account Name', type: 'text' as const, nested: 'bankDetails' },
    { key: 'branchCode', label: 'Branch Code', type: 'text' as const, nested: 'bankDetails' },
    { key: 'accountNumber', label: 'Account Number', type: 'text' as const, nested: 'bankDetails' },
    { key: 'accountType', label: 'Account Type', type: 'text' as const, nested: 'bankDetails' },
    { key: 'snapScanUrl', label: 'SnapScan URL', type: 'text' as const },
    { key: 'priorityNeeds', label: 'Priority Needs', type: 'list' as const },
    { key: 'prayerFocus', label: 'Prayer Focus', type: 'textarea' as const },
    { key: 'bgColor', label: 'Section Background Color', type: 'color' as const },
  ];

  const contactFields = [
    { key: 'heading', label: 'Section Heading', type: 'text' as const },
    { key: 'phone', label: 'Phone Number', type: 'text' as const },
    { key: 'email', label: 'Email', type: 'text' as const },
    { key: 'facebook', label: 'Facebook URL', type: 'text' as const },
    { key: 'instagram', label: 'Instagram URL', type: 'text' as const },
    { key: 'registrationNumber', label: 'Registration Number', type: 'text' as const },
    { key: 'bgColor', label: 'Section Background Color', type: 'color' as const },
  ];

  const footerFields = [
    { key: 'orgName', label: 'Organization Name', type: 'text' as const },
    { key: 'registrationNumber', label: 'Registration Number', type: 'text' as const },
    { key: 'directors', label: 'Directors', type: 'list' as const },
  ];

  const getFieldsForTab = (tab: Tab) => {
    switch (tab) {
      case 'Hero': return { fields: heroFields, section: 'hero' as const };
      case 'What We Do': return { fields: whatWeDoFields, section: 'whatWeDo' as const };
      case 'Team': return { fields: teamFields, section: 'team' as const };
      case 'Founder': return { fields: founderFields, section: 'founder' as const };
      case 'Donate': return { fields: donateFields, section: 'donate' as const };
      case 'Contact': return { fields: contactFields, section: 'contact' as const };
      case 'Footer': return { fields: footerFields, section: 'footer' as const };
    }
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />

          {/* Panel */}
          <div className="relative ml-auto w-full max-w-lg bg-white h-full overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-lg font-bold text-brand-dark">Admin Panel</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              {!authenticated ? (
                /* Login form */
                <div className="max-w-sm mx-auto space-y-4 pt-8">
                  <h3 className="text-xl font-semibold text-center text-brand-dark">
                    Enter Admin Password
                  </h3>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    placeholder="Password"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-center text-lg focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none"
                    autoFocus
                  />
                  {loginError && (
                    <p className="text-red-500 text-sm text-center">{loginError}</p>
                  )}
                  <button
                    onClick={handleLogin}
                    className="w-full py-3 bg-brand-teal text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Login
                  </button>
                </div>
              ) : !content ? (
                /* Loading */
                <div className="flex items-center justify-center py-20">
                  <svg className="animate-spin w-8 h-8 text-brand-teal" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                </div>
              ) : (
                /* Editor */
                <div className="space-y-6">
                  {/* Tabs */}
                  <div className="flex flex-wrap gap-2">
                    {TABS.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          activeTab === tab
                            ? TAB_COLORS[tab].active
                            : TAB_COLORS[tab].inactive
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Active section editor */}
                  {(() => {
                    const { fields, section } = getFieldsForTab(activeTab);
                    return (
                      <SectionEditor
                        key={activeTab}
                        title={`Edit ${activeTab} Section`}
                        fields={fields}
                        data={content[section] as unknown as Record<string, unknown>}
                        password={password}
                        onSave={(data) => handleSaveSection(section, data)}
                      />
                    );
                  })()}

                  {/* Logout */}
                  <div className="pt-4 border-t">
                    <button
                      onClick={handleLogout}
                      className="w-full py-2 text-sm text-gray-500 hover:text-red-500 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
