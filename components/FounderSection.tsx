import { FounderContent } from '@/lib/types';
import { hexToLightBg } from '@/lib/colorUtils';

interface Props {
  content: FounderContent;
}

export default function FounderSection({ content }: Props) {
  return (
    <div
      className="py-2 md:py-8 bg-orange-100 w-full"
      style={content.bgColor ? { backgroundColor: hexToLightBg(content.bgColor) } : undefined}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-sm md:text-xl font-bold text-brand-dark mb-1 md:mb-3 text-center">{content.heading}</h3>
        <div className="flex flex-col items-center max-w-4xl mx-auto">
          {/* Image */}
          {content.image ? (
            <div className="w-full max-w-sm md:max-w-md rounded-xl overflow-hidden shadow-lg">
              <img
                src={content.image}
                alt={content.name}
                className="w-full h-auto object-cover"
              />
            </div>
          ) : (
            <div className="w-full max-w-md aspect-video bg-amber-100 rounded-xl flex items-center justify-center border-2 border-dashed border-amber-300">
              <svg className="w-10 h-10 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          )}
          {/* Text */}
          <div className="mt-2 md:mt-4 text-center">
            <h4 className="text-sm md:text-xl font-semibold text-amber-700 mb-0.5">{content.name}</h4>
            <p className="text-gray-700 text-xs md:text-base leading-relaxed whitespace-pre-line">{content.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
