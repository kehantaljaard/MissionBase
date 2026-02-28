'use client';

import { useState } from 'react';
import { DonateContent } from '@/lib/types';

interface Props {
  content: DonateContent;
}

export default function DonateSection({ content }: Props) {
  const { bankDetails } = content;
  const [copied, setCopied] = useState(false);

  const copyBankDetails = () => {
    const text = [
      `Bank: ${bankDetails.bank}`,
      `Account Name: ${bankDetails.accountName}`,
      `Branch Code: ${bankDetails.branchCode}`,
      `Account Number: ${bankDetails.accountNumber}`,
      `Account Type: ${bankDetails.accountType}`,
    ].join('\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <section
      className="py-8 md:py-16 bg-rose-100"
      style={content.bgColor ? { backgroundColor: content.bgColor } : undefined}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-brand-dark mb-2 md:mb-4 text-center">
          {content.heading}
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-6 md:mb-10 text-sm md:text-base">
          {content.description}
        </p>

        <div className="grid md:grid-cols-2 gap-4 lg:gap-8">
          {/* Banking Details */}
          <div className="bg-white border border-brand-teal/20 rounded-xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 md:mb-5">
              <h3 className="text-base md:text-lg font-semibold text-brand-teal flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Banking Details
              </h3>
              <button
                onClick={copyBankDetails}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  copied
                    ? 'bg-green-100 text-green-700'
                    : 'bg-brand-teal/10 text-brand-teal hover:bg-brand-teal/20'
                }`}
              >
                {copied ? (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="space-y-2">
              {[
                ['Bank', bankDetails.bank],
                ['Account Name', bankDetails.accountName],
                ['Branch Code', bankDetails.branchCode],
                ['Account Number', bankDetails.accountNumber],
                ['Account Type', bankDetails.accountType],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-1">
                  <span className="text-xs sm:text-sm text-gray-500 font-medium">{label}</span>
                  <span className="text-sm text-brand-dark font-semibold">{value}</span>
                </div>
              ))}
            </div>

            {/* SnapScan */}
            {content.snapScanUrl && (
              <a
                href={content.snapScanUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 bg-[#00B0E8] hover:bg-[#009FD4] text-white font-semibold rounded-lg transition-colors text-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm14 0h4v4h-4v-4zm-3 3h3v4h-3v-4zm3-3h4v3h-1v-2h-3v-1z" />
                </svg>
                Pay with SnapScan
              </a>
            )}
          </div>

          {/* Priority Needs */}
          <div className="bg-white border border-brand-orange/20 rounded-xl p-4 sm:p-6">
            <h3 className="text-base md:text-lg font-semibold text-brand-orange mb-3 md:mb-5 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Priority Needs
            </h3>
            <ul className="space-y-1.5">
              {content.priorityNeeds.map((need, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                  <span className="text-brand-orange mt-0.5 flex-shrink-0">&#x2022;</span>
                  {need}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Prayer Focus */}
        <div className="mt-4 md:mt-6 bg-white/60 rounded-xl p-4 sm:p-6 text-center">
          <h3 className="text-base md:text-lg font-semibold text-brand-dark mb-2 flex items-center justify-center gap-2">
            <svg className="w-5 h-5 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            Prayer Focus
          </h3>
          <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto text-sm">
            {content.prayerFocus}
          </p>
        </div>
      </div>
    </section>
  );
}
