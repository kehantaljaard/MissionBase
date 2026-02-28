import { WhatWeDoContent } from '@/lib/types';

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
      className="py-8 md:py-16 bg-brand-light"
      style={content.bgColor ? { backgroundColor: content.bgColor } : undefined}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Soup Kitchen */}
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm mb-4 md:mb-6 border-l-4 border-brand-orange">
          <h3 className="text-lg md:text-xl font-bold text-brand-orange mb-2">Soup Kitchen — Feeding in Faith</h3>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">{content.soupKitchen}</p>
        </div>

        {/* Back a Teenager */}
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm mb-4 md:mb-6 border-l-4 border-brand-teal">
          <h3 className="text-lg md:text-xl font-bold text-brand-teal mb-2">Back a Teenager</h3>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">{content.backATeenager}</p>
        </div>

        {/* Other Programs */}
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
          <h3 className="text-lg md:text-xl font-bold text-brand-dark mb-3">Our Programs</h3>
          <div className="text-gray-700 leading-relaxed text-sm md:text-base">
            {renderText(content.programs)}
          </div>
        </div>
      </div>
    </section>
  );
}
