import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const AuthPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated, userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      if (userRole === 'couple') {
        navigate('/cinematic');
      } else {
        navigate('/memories');
      }
    }
  }, [isAuthenticated, userRole, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast.success('Welcome to our love story ♥');
      } else {
        toast.error('Invalid credentials. Please try again.');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blush via-cream to-lavender relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-primary/20 animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              width: `${24 + i * 8}px`,
              height: `${24 + i * 8}px`,
            }}
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-rose-gold/30 animate-gentle-pulse"
            style={{
              right: `${10 + i * 10}%`,
              bottom: `${15 + (i % 4) * 20}%`,
              animationDelay: `${i * 0.3}s`,
              width: `${16 + i * 4}px`,
              height: `${16 + i * 4}px`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="glass-card rounded-3xl p-8 md:p-12 animate-scale-in">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Heart className="w-12 h-12 text-primary animate-heartbeat" fill="currentColor" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-foreground mb-2">
              Welcome to Our Story
            </h1>
            <p className="text-muted-foreground font-light">
              Enter to relive the beautiful memories
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="h-12 bg-background/50 border-border/50 focus:border-primary rounded-xl"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-12 bg-background/50 border-border/50 focus:border-primary rounded-xl"
                required
              />
            </div>

            <Button
              type="submit"
              variant="love"
              size="xl"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Opening...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Enter Our World
                </span>
              )}
            </Button>
          </form>

          {/* Decorative divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-border" />
            <Sparkles className="w-4 h-4 text-muted-foreground" />
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Hint text */}
          <p className="text-center text-sm text-muted-foreground">
            A private space for love and memories
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
