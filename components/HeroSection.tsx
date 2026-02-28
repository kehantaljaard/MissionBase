import { HeroContent } from '@/lib/types';

interface Props {
  content: HeroContent;
}

export default function HeroSection({ content }: Props) {
  return (
    <section
      id="hero"
      className="relative min-h-[80vh] flex items-center justify-center pt-16"
      style={
        content.backgroundImage
          ? {
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${content.backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      {/* Default gradient background when no image */}
      {!content.backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/20 via-brand-light to-brand-teal/20" />
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 ${
            content.backgroundImage ? 'text-white' : 'text-brand-dark'
          }`}
        >
          {content.heading}
        </h1>
        <p
          className={`text-xl sm:text-2xl md:text-3xl font-medium mb-8 ${
            content.backgroundImage ? 'text-orange-200' : 'text-brand-orange'
          }`}
        >
          {content.tagline}
        </p>
        <p
          className={`text-lg max-w-2xl mx-auto leading-relaxed ${
            content.backgroundImage ? 'text-gray-100' : 'text-gray-600'
          }`}
        >
          {content.description}
        </p>

        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <a
            href="#donate"
            className="px-8 py-3 bg-brand-orange text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors shadow-lg"
          >
            Support Us
          </a>
          <a
            href="#contact"
            className="px-8 py-3 bg-brand-teal text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors shadow-lg"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}
