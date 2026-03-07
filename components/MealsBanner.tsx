'use client';

import { useState } from 'react';

interface Props {
  mealsThisWeek?: number;
}

export default function MealsBanner({ mealsThisWeek }: Props) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || !mealsThisWeek || mealsThisWeek <= 0) return null;

  return (
    <div className="fixed top-10 left-0 right-0 z-40 bg-amber-50 border-b border-rose-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-1.5 md:py-2">
        <div className="flex items-center gap-2 mx-auto">
          <span className="text-sm md:text-base font-bold text-rose-600">
            {mealsThisWeek.toLocaleString()}
          </span>
          <span className="text-xs md:text-sm font-medium text-brand-dark">
            Meals served this week
          </span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Dismiss"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
