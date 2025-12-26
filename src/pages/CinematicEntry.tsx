import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Heart } from 'lucide-react';

const dummyPhotos = [
  'https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop',
];

const CinematicEntry: React.FC = () => {
  const [phase, setPhase] = useState<'question' | 'photos' | 'title'>('question');
  const navigate = useNavigate();
  const { isAuthenticated, userRole } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || userRole !== 'couple') {
      navigate('/');
      return;
    }

    // Phase transitions
    const timer1 = setTimeout(() => setPhase('photos'), 3000);
    const timer2 = setTimeout(() => setPhase('title'), 7000);
    const timer3 = setTimeout(() => navigate('/memories'), 10000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isAuthenticated, userRole, navigate]);

  return (
    <div className="fixed inset-0 bg-deep-romantic flex items-center justify-center overflow-hidden">
      {/* Background photos with depth animation */}
      {phase !== 'question' && (
        <div className="absolute inset-0 perspective-1000">
          {dummyPhotos.map((photo, index) => (
            <div
              key={index}
              className="absolute rounded-2xl overflow-hidden shadow-2xl animate-drift"
              style={{
                left: `${10 + (index % 4) * 22}%`,
                top: `${15 + Math.floor(index / 4) * 40}%`,
                width: '200px',
                height: '150px',
                animationDelay: `${index * 0.5}s`,
                transform: `translateZ(${-index * 100}px) rotate(${(index - 4) * 3}deg)`,
              }}
            >
              <img
                src={photo}
                alt={`Memory ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-romantic/50 to-transparent" />
            </div>
          ))}
        </div>
      )}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-romantic/60 to-deep-romantic" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        {phase === 'question' && (
          <div className="animate-fade-in">
            <Heart className="w-16 h-16 mx-auto mb-8 text-primary animate-heartbeat" fill="currentColor" />
            <p className="font-display text-3xl md:text-5xl text-cream leading-relaxed">
              Ready for the ride of our memories this year?
            </p>
          </div>
        )}

        {phase === 'photos' && (
          <div className="animate-fade-in">
            <p className="font-display text-2xl md:text-4xl text-cream/80 italic animate-gentle-pulse">
              Every moment with you is a treasure...
            </p>
          </div>
        )}

        {phase === 'title' && (
          <div className="animate-scale-in">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary" />
              <Heart className="w-8 h-8 text-primary" fill="currentColor" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary" />
            </div>
            <h1 className="font-display text-5xl md:text-8xl text-cream mb-4">
              1 Year
            </h1>
            <p className="font-display text-3xl md:text-5xl text-primary italic">
              Anniversary
            </p>
            <div className="mt-8 flex justify-center gap-2">
              {[...Array(3)].map((_, i) => (
                <Heart
                  key={i}
                  className="w-6 h-6 text-primary animate-float"
                  fill="currentColor"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-deep-romantic to-transparent" />
    </div>
  );
};

export default CinematicEntry;
