'use client';

import { useState, useEffect } from 'react';

interface VisitStats {
  today: number;
  week: number;
  month: number;
  allTime: number;
}

interface Props {
  password: string;
}

export default function AnalyticsTab({ password }: Props) {
  const [stats, setStats] = useState<VisitStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/visits', {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (res.ok) {
        setStats(await res.json());
      } else {
        setError('Failed to load analytics.');
      }
    } catch {
      setError('Failed to load analytics.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStats();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <svg className="animate-spin w-8 h-8 text-brand-teal" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchStats}
          className="px-4 py-2 bg-brand-teal text-white rounded-lg hover:bg-teal-700 transition-colors text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!stats) return null;

  const cards = [
    { label: 'Last 24 Hours', value: stats.today, color: 'bg-blue-50 border-blue-200 text-blue-700' },
    { label: 'Last 7 Days', value: stats.week, color: 'bg-teal-50 border-teal-200 text-teal-700' },
    { label: 'Last 30 Days', value: stats.month, color: 'bg-amber-50 border-amber-200 text-amber-700' },
    { label: 'All Time', value: stats.allTime, color: 'bg-green-50 border-green-200 text-green-700' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-brand-dark">Site Visits</h3>
        <button
          onClick={fetchStats}
          className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-600"
        >
          Refresh
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className={`rounded-xl border p-4 ${card.color}`}
          >
            <p className="text-2xl font-bold">{card.value.toLocaleString()}</p>
            <p className="text-xs mt-1 opacity-75">{card.label}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 text-center pt-2">
        Detailed visit data is retained for 32 days. All-time total is kept permanently.
      </p>
    </div>
  );
}
