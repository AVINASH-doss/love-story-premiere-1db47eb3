import React, { useRef, useEffect, useState } from 'react';
import { Heart, Star, Sparkles } from 'lucide-react';

interface MonthSectionProps {
  month: string;
  story: string;
  images: string[];
  index: number;
}

const MonthSection: React.FC<MonthSectionProps> = ({ month, story, images, index }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={sectionRef}
      className={`relative py-16 md:py-24 scroll-reveal ${isVisible ? 'visible' : ''}`}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {index % 3 === 0 && (
          <Heart
            className="absolute text-primary/10 w-32 h-32"
            style={{ right: '5%', top: '20%' }}
            fill="currentColor"
          />
        )}
        {index % 3 === 1 && (
          <Star
            className="absolute text-rose-gold/15 w-24 h-24"
            style={{ left: '8%', bottom: '15%' }}
            fill="currentColor"
          />
        )}
        {index % 3 === 2 && (
          <Sparkles
            className="absolute text-lavender w-20 h-20"
            style={{ right: '10%', bottom: '25%' }}
          />
        )}
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16`}>
          {/* Images */}
          <div className="w-full md:w-1/2 relative">
            <div className="relative">
              {/* Main image */}
              <div
                className="relative rounded-2xl overflow-hidden shadow-romantic transform transition-transform duration-500 hover:scale-[1.02]"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <img
                  src={images[0]}
                  alt={`${month} memory`}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-romantic/30 to-transparent" />
              </div>

              {/* Secondary image (if exists) */}
              {images[1] && (
                <div
                  className={`absolute ${isEven ? '-right-4 -bottom-4' : '-left-4 -bottom-4'} w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden shadow-lg border-4 border-background transform rotate-3 hover:rotate-0 transition-transform duration-300`}
                >
                  <img
                    src={images[1]}
                    alt={`${month} memory secondary`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            {/* Month label */}
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-widest">
                {month}
              </span>
              <div className="w-8 h-px bg-primary" />
            </div>

            {/* Story */}
            <p className="font-display text-xl md:text-2xl text-foreground leading-relaxed mb-6">
              "{story}"
            </p>

            {/* Decorative hearts */}
            <div className="flex items-center gap-2 justify-center md:justify-start">
              {[...Array(3)].map((_, i) => (
                <Heart
                  key={i}
                  className="w-4 h-4 text-primary/60"
                  fill="currentColor"
                  style={{ opacity: 1 - i * 0.2 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline connector */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent transform -translate-x-1/2" />
      <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg items-center justify-center">
        <Heart className="w-2 h-2 text-primary-foreground" fill="currentColor" />
      </div>
    </div>
  );
};

export default MonthSection;
