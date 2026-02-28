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
    <section id="donate" className="py-12 md:py-20 bg-rose-50/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark mb-3 md:mb-4 text-center">
          {content.heading}
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8 md:mb-12 text-sm md:text-base">
          {content.description}
        </p>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-12">
          {/* Banking Details */}
          <div className="bg-white/80 border border-brand-teal/20 rounded-xl p-5 sm:p-8">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h3 className="text-lg md:text-xl font-semibold text-brand-teal flex items-center gap-2">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            <div className="space-y-2.5 md:space-y-3">
              {[
                ['Bank', bankDetails.bank],
                ['Account Name', bankDetails.accountName],
                ['Branch Code', bankDetails.branchCode],
                ['Account Number', bankDetails.accountNumber],
                ['Account Type', bankDetails.accountType],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-1">
                  <span className="text-xs sm:text-sm text-gray-500 font-medium">{label}</span>
                  <span className="text-sm md:text-base text-brand-dark font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Priority Needs */}
          <div className="bg-white/80 border border-brand-orange/20 rounded-xl p-5 sm:p-8">
            <h3 className="text-lg md:text-xl font-semibold text-brand-orange mb-4 md:mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Priority Needs
            </h3>
            <ul className="space-y-2">
              {content.priorityNeeds.map((need, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600 text-sm md:text-base">
                  <span className="text-brand-orange mt-1 flex-shrink-0">&#x2022;</span>
                  {need}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Back a Teenager */}
        <div className="mt-6 md:mt-8 bg-gradient-to-r from-brand-teal/10 to-brand-orange/10 rounded-xl p-5 sm:p-8">
          <h3 className="text-lg md:text-xl font-semibold text-brand-dark mb-2 md:mb-3">
            Back a Teenager
          </h3>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">{content.backATeenager}</p>
        </div>

        {/* Prayer Focus */}
        <div className="mt-6 md:mt-8 bg-white/60 rounded-xl p-5 sm:p-8 text-center">
          <h3 className="text-lg md:text-xl font-semibold text-brand-dark mb-2 md:mb-3 flex items-center justify-center gap-2">
            <svg className="w-5 h-5 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            Prayer Focus
          </h3>
          <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto text-sm md:text-base">
            {content.prayerFocus}
          </p>
        </div>
      </div>
    </section>
  );
}
