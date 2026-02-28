import { FooterContent } from '@/lib/types';

interface Props {
  content: FooterContent;
}

export default function Footer({ content }: Props) {
  return (
    <footer className="bg-brand-dark text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold text-white">{content.orgName}</h3>
          <p className="text-sm text-gray-400">
            Registration Number: {content.registrationNumber}
          </p>
          <div className="pt-4 border-t border-gray-700">
            <p className="text-sm text-gray-400 mb-2">Directors:</p>
            <p className="text-sm text-gray-300">
              {content.directors.join(' | ')}
            </p>
          </div>
          <p className="text-xs text-gray-500 pt-4">
            &copy; {new Date().getFullYear()} {content.orgName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
