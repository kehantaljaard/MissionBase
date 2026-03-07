import { FooterContent } from '@/lib/types';

interface Props {
  content: FooterContent;
}

export default function Footer({ content }: Props) {
  return (
    <footer className="bg-gray-900 text-white py-4 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2">
          <h3 className="text-sm md:text-xl font-semibold text-white">{content.orgName}</h3>
          <p className="text-xs text-white/70">
            Registration Number: {content.registrationNumber}
          </p>

          {/* Support button */}
          <div className="py-2">
            <a
              href="#donate"
              className="inline-flex items-center gap-1.5 px-5 py-2 bg-rose-600 text-white font-semibold rounded-lg hover:bg-rose-700 transition-colors shadow-md text-xs md:text-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Support Our Work
            </a>
          </div>

          <div className="pt-2 border-t border-white/20">
            <p className="text-xs text-white/70 mb-1">Directors:</p>
            <p className="text-xs text-white/90">
              {content.directors.join(' | ')}
            </p>
          </div>
          <p className="text-[10px] text-white/50 pt-2">
            &copy; {new Date().getFullYear()} {content.orgName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
