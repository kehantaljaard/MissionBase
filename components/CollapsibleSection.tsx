'use client';

import { useState } from 'react';

interface Props {
  title: string;
  id: string;
  color?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

const COLOR_MAP: Record<string, string> = {
  blue: 'bg-blue-600 hover:bg-blue-700 text-white',
  amber: 'bg-amber-600 hover:bg-amber-700 text-white',
  rose: 'bg-rose-600 hover:bg-rose-700 text-white',
  green: 'bg-green-700 hover:bg-green-800 text-white',
  teal: 'bg-brand-teal hover:bg-teal-700 text-white',
};

export default function CollapsibleSection({ title, id, color, defaultOpen = false, children }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  const colorClass = color && COLOR_MAP[color] ? COLOR_MAP[color] : 'bg-gray-700 hover:bg-gray-800 text-white';

  return (
    <div id={id}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 md:py-4 transition-colors ${colorClass}`}
      >
        <span className="text-base md:text-lg font-bold">{title}</span>
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ${
          open ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
