import React from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Footer: React.FC = () => {
  const { userRole } = useAuth();

  return (
    <footer className="py-8 bg-gradient-to-t from-blush/20 to-transparent">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-px bg-primary/30" />
          <Heart className="w-5 h-5 text-primary" fill="currentColor" />
          <div className="w-8 h-px bg-primary/30" />
        </div>
        
        {userRole === 'couple' ? (
          <p className="font-display text-lg text-foreground">
            © All Kirthika loves reserved to Avinash
          </p>
        ) : (
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-primary inline" fill="currentColor" /> by Kirthika & Avinash
          </p>
        )}
      </div>
    </footer>
  );
};

export default Footer;
