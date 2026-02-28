import { FounderContent } from '@/lib/types';

interface Props {
  content: FounderContent;
}

export default function FounderSection({ content }: Props) {
  return (
    <section id="founder" className="py-20 bg-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-12 text-center">
          {content.heading}
        </h2>

        <div className="flex flex-col-reverse md:flex-row gap-10 items-start">
          {/* Description - Left 2/3 */}
          <div className="w-full md:w-2/3">
            <h3 className="text-2xl font-semibold text-brand-teal mb-4">{content.name}</h3>
            <div className="text-gray-600 leading-relaxed space-y-4">
              {content.description.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Image - Right 1/3 */}
          <div className="w-full md:w-1/3 flex-shrink-0">
            {content.image ? (
              <img
                src={content.image}
                alt={content.name}
                className="w-full rounded-xl shadow-lg object-cover aspect-[3/4]"
              />
            ) : (
              <div className="w-full aspect-[3/4] bg-white rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center text-gray-400 p-4">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p className="text-sm">Founder photo</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
