import { FounderContent } from '@/lib/types';
import { hexToLightBg } from '@/lib/colorUtils';

interface Props {
  content: FounderContent;
}

export default function FounderSection({ content }: Props) {
  const firstParagraph = content.description.split('\n\n')[0];

  return (
    <div
      className="py-2 md:py-8 bg-amber-50 w-full h-full flex flex-col justify-center"
      style={content.bgColor ? { backgroundColor: hexToLightBg(content.bgColor) } : undefined}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-sm md:text-xl font-bold text-brand-dark mb-0.5 text-center">{content.heading}</h3>
        <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-6 max-w-2xl mx-auto">
          {/* Image */}
          <div className="w-20 h-20 md:w-40 md:h-40 flex-shrink-0">
            {content.image ? (
              <img
                src={content.image}
                alt={content.name}
                className="w-full h-full rounded-xl shadow-lg object-cover"
              />
            ) : (
              <div className="w-full h-full bg-amber-100 rounded-xl flex items-center justify-center border-2 border-dashed border-amber-300">
                <svg className="w-10 h-10 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
          </div>
          {/* Text */}
          <div>
            <h4 className="text-sm md:text-xl font-semibold text-amber-700 mb-0.5">{content.name}</h4>
            <p className="text-gray-700 text-xs md:text-base leading-relaxed whitespace-pre-line">{firstParagraph}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
