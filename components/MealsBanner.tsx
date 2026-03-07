'use client';

import { useState } from 'react';

interface Props {
  mealsThisWeek?: number;
}

export default function MealsBanner({ mealsThisWeek }: Props) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || !mealsThisWeek || mealsThisWeek <= 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 bg-amber-50 border border-rose-300 shadow-lg rounded-lg">
      <div className="flex items-center gap-2 px-3 py-2">
        <span className="text-sm">🍽️</span>
        <span className="text-sm md:text-base font-bold text-rose-600">
          {mealsThisWeek.toLocaleString()}
        </span>
        <span className="text-xs md:text-sm font-medium text-brand-dark">
          Meals served this week
        </span>
        <button
          onClick={() => setDismissed(true)}
          className="flex-shrink-0 p-0.5 ml-1 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Dismiss"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
