import { WhatWeDoContent } from '@/lib/types';
import { hexToLightBg } from '@/lib/colorUtils';

interface Props {
  content: WhatWeDoContent;
}

export default function WhatWeDoSection({ content }: Props) {
  const renderText = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.trim() === '') return <br key={i} />;
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={i} className="mb-2">
          {parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={j} className="text-brand-dark font-semibold">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return <span key={j}>{part}</span>;
          })}
        </p>
      );
    });
  };

  return (
    <section
      className="py-3 md:py-10 bg-brand-light"
      style={content.bgColor ? { backgroundColor: hexToLightBg(content.bgColor) } : undefined}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Soup Kitchen */}
        <div className="bg-white rounded-lg p-2 md:p-5 shadow-sm mb-2 md:mb-4 border-l-4 border-brand-orange">
          <h3 className="text-sm md:text-lg font-bold text-brand-orange mb-0.5">Feeding in Faith — Our Weekly Soup Kitchen</h3>
          <p className="text-gray-700 text-xs md:text-base leading-relaxed whitespace-pre-line">{content.soupKitchen}</p>
        </div>

        {/* Back a Teenager */}
        <div className="bg-white rounded-lg p-2 md:p-5 shadow-sm mb-2 md:mb-4 border-l-4 border-brand-teal">
          <h3 className="text-sm md:text-lg font-bold text-brand-teal mb-0.5">Back a Teenager</h3>
          <p className="text-gray-700 text-xs md:text-base leading-relaxed whitespace-pre-line">{content.backATeenager}</p>
        </div>

        {/* Other Programs */}
        <div className="bg-white rounded-lg p-2 md:p-5 shadow-sm">
          <h3 className="text-sm md:text-lg font-bold text-brand-dark mb-1">Our Programs</h3>
          <div className="text-gray-700 leading-relaxed text-xs md:text-base">
            {renderText(content.programs)}
          </div>
        </div>
      </div>
    </section>
  );
}
