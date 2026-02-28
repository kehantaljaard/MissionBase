import { DonateContent } from '@/lib/types';

interface Props {
  content: DonateContent;
}

export default function DonateSection({ content }: Props) {
  const { bankDetails } = content;

  return (
    <section id="donate" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-4 text-center">
          {content.heading}
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          {content.description}
        </p>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Banking Details */}
          <div className="bg-brand-teal/5 border border-brand-teal/20 rounded-xl p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-brand-teal mb-6 flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Banking Details
            </h3>
            <div className="space-y-3">
              {[
                ['Bank', bankDetails.bank],
                ['Account Name', bankDetails.accountName],
                ['Branch Code', bankDetails.branchCode],
                ['Account Number', bankDetails.accountNumber],
                ['Account Type', bankDetails.accountType],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span className="text-sm text-gray-500 font-medium">{label}</span>
                  <span className="text-brand-dark font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Priority Needs */}
          <div className="bg-brand-orange/5 border border-brand-orange/20 rounded-xl p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-brand-orange mb-6 flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Priority Needs
            </h3>
            <ul className="space-y-2">
              {content.priorityNeeds.map((need, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600">
                  <span className="text-brand-orange mt-1 flex-shrink-0">&#x2022;</span>
                  {need}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Back a Teenager */}
        <div className="mt-8 bg-gradient-to-r from-brand-teal/10 to-brand-orange/10 rounded-xl p-6 sm:p-8">
          <h3 className="text-xl font-semibold text-brand-dark mb-3">
            Back a Teenager
          </h3>
          <p className="text-gray-600 leading-relaxed">{content.backATeenager}</p>
        </div>

        {/* Prayer Focus */}
        <div className="mt-8 bg-gray-50 rounded-xl p-6 sm:p-8 text-center">
          <h3 className="text-xl font-semibold text-brand-dark mb-3 flex items-center justify-center gap-2">
            <svg className="w-5 h-5 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            Prayer Focus
          </h3>
          <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
            {content.prayerFocus}
          </p>
        </div>
      </div>
    </section>
  );
}
