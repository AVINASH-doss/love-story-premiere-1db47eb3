import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MonthSection from '@/components/MonthSection';
import CountdownTimer from '@/components/CountdownTimer';
import MessageForm from '@/components/MessageForm';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { memories } from '@/data/memories';
import { Heart, LogOut, MessageCircle, Sparkles } from 'lucide-react';

const MemoriesPage: React.FC = () => {
  const { isAuthenticated, userRole, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blush/40 via-lavender/20 to-background" />

        {/* Floating decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <Heart
              key={i}
              className="absolute text-primary/15 animate-float"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 4) * 15}%`,
                width: `${20 + i * 4}px`,
                height: `${20 + i * 4}px`,
                animationDelay: `${i * 0.4}s`,
              }}
              fill="currentColor"
            />
          ))}
        </div>

        {/* Logout button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="absolute top-6 right-6 z-20"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>

        {/* Hero content */}
        <div className="relative z-10 text-center px-4 animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Our Love Story
            </span>
            <Sparkles className="w-6 h-6 text-primary" />
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-4">
            1 Year Together
          </h1>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-px bg-primary/50" />
            <Heart className="w-6 h-6 text-primary animate-heartbeat" fill="currentColor" />
            <div className="w-16 h-px bg-primary/50" />
          </div>

          <p className="font-display text-xl md:text-2xl text-muted-foreground italic max-w-xl mx-auto">
            "A year of laughter, love, and beautiful memories"
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-gentle-pulse">
          <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
      </header>

      {/* Timeline Section */}
      <main className="relative">
        {/* Section title */}
        <div className="text-center py-16">
          <span className="text-sm uppercase tracking-widest text-muted-foreground">
            Scroll through time
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mt-2">
            Our Journey Month by Month
          </h2>
        </div>

        {/* Memory sections */}
        {memories.map((memory, index) => (
          <MonthSection
            key={memory.month}
            month={memory.month}
            story={memory.story}
            images={memory.images}
            index={index}
          />
        ))}
      </main>

      {/* Countdown Timer */}
      <CountdownTimer />

      {/* Message Section - Different for each role */}
      {userRole === 'public' ? (
        <MessageForm />
      ) : (
        <section className="py-16 md:py-24 bg-gradient-to-b from-background to-lavender/20">
          <div className="container mx-auto px-4 text-center">
            <MessageCircle className="w-12 h-12 mx-auto mb-6 text-primary" />
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              Messages from Our Loved Ones
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Read the beautiful wishes shared by friends and family
            </p>
            <Button
              variant="romantic"
              size="lg"
              onClick={() => navigate('/messages')}
            >
              <Heart className="w-5 h-5 mr-2" />
              Read Messages
            </Button>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default MemoriesPage;
