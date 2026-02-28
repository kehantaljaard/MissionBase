import { TeamContent } from '@/lib/types';

interface Props {
  content: TeamContent;
}

export default function TeamSection({ content }: Props) {
  // Simple markdown-like bold text rendering
  const renderText = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.trim() === '') return <br key={i} />;

      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={i} className="mb-2">
          {parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={j} className="text-brand-teal">
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
    <section id="team" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-12 text-center">
          {content.heading}
        </h2>

        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* Image - Left 1/3 */}
          <div className="w-full md:w-1/3 flex-shrink-0">
            {content.image ? (
              <img
                src={content.image}
                alt="The Team"
                className="w-full rounded-xl shadow-lg object-cover aspect-[3/4]"
              />
            ) : (
              <div className="w-full aspect-[3/4] bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center text-gray-400 p-4">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-sm">Team photo</p>
                </div>
              </div>
            )}
          </div>

          {/* Description - Right 2/3 */}
          <div className="w-full md:w-2/3 text-gray-600 leading-relaxed">
            {renderText(content.description)}
          </div>
        </div>
      </div>
    </section>
  );
}
