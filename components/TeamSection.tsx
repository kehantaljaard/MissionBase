import { TeamContent } from '@/lib/types';

interface Props {
  content: TeamContent;
}

export default function TeamSection({ content }: Props) {
  const images = content.images?.filter(Boolean) || [];

  return (
    <div
      className="py-8 md:py-12 bg-blue-100"
      style={content.bgColor ? { backgroundColor: content.bgColor } : undefined}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-xl md:text-2xl font-bold text-blue-900 mb-2 text-center">{content.heading}</h3>
        <p className="text-blue-700 text-sm md:text-base text-center mb-4 md:mb-6">{content.description}</p>

        {images.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-3">
            {images.map((src, i) => (
              <div key={i} className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={src}
                  alt={`Team member ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-full max-w-xs aspect-video bg-blue-200/50 rounded-xl flex items-center justify-center border-2 border-dashed border-blue-300">
              <div className="text-center text-blue-400 p-4">
                <svg className="w-10 h-10 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="text-sm">Add team photos in admin</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
