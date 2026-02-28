import { FounderContent } from '@/lib/types';

interface Props {
  content: FounderContent;
}

export default function FounderSection({ content }: Props) {
  const firstParagraph = content.description.split('\n\n')[0];

  return (
    <div
      className="py-8 md:py-12 bg-amber-50"
      style={content.bgColor ? { backgroundColor: content.bgColor } : undefined}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-xl md:text-2xl font-bold text-brand-dark mb-2 text-center">{content.heading}</h3>
        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 max-w-2xl mx-auto">
          {/* Image */}
          <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
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
            <h4 className="text-lg md:text-xl font-semibold text-amber-700 mb-1">{content.name}</h4>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">{firstParagraph}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
