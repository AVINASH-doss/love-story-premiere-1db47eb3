import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Heart, MessageCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

const MessagesBoard: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getRandomRotation = (index: number) => {
    const rotations = [-3, 2, -2, 3, -1, 1, -2.5, 2.5];
    return rotations[index % rotations.length];
  };

  const getRandomColor = (index: number) => {
    const colors = ['bg-cream', 'bg-blush/30', 'bg-lavender/40', 'bg-warm-beige/50'];
    return colors[index % colors.length];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-beige/30">
        <div className="text-center">
          <Heart className="w-12 h-12 mx-auto mb-4 text-primary animate-heartbeat" fill="currentColor" />
          <p className="text-muted-foreground">Loading messages of love...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-beige/30 py-8 md:py-16">
      {/* Header */}
      <div className="container mx-auto px-4 mb-12">
        <Button
          variant="ghost"
          onClick={() => navigate('/memories')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Memories
        </Button>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageCircle className="w-6 h-6 text-primary" />
            <span className="text-sm uppercase tracking-widest text-muted-foreground">
              Messages of Love
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            Wishes from Our Loved Ones
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Each message is a treasure, a piece of love gifted to us
          </p>
        </div>
      </div>

      {/* Messages Board */}
      <div className="container mx-auto px-4">
        {messages.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 mx-auto mb-6 text-muted-foreground/50" />
            <p className="text-xl text-muted-foreground">No messages yet</p>
            <p className="text-muted-foreground/70 mt-2">
              The first wish is yet to arrive
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {messages.map((msg, index) => (
              <div
                key={msg.id}
                className={`paper-note ${getRandomColor(index)} p-6 md:p-8 rounded-sm transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in`}
                style={{
                  '--rotation': `${getRandomRotation(index)}deg`,
                  animationDelay: `${index * 0.1}s`,
                } as React.CSSProperties}
              >
                {/* Pin decoration */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <div className="w-4 h-4 rounded-full bg-rose-gold shadow-md" />
                </div>

                {/* Message content */}
                <div className="pt-2">
                  <p className="font-display text-lg text-foreground leading-relaxed mb-4">
                    "{msg.message}"
                  </p>
                  
                  <div className="flex items-center justify-between border-t border-border/30 pt-4 mt-4">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-primary" fill="currentColor" />
                      <span className="font-medium text-foreground">{msg.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(msg.created_at)}
                    </span>
                  </div>
                </div>

                {/* Paper texture overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiLz48L3N2Zz4=')]" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center mt-16 pb-8">
        <p className="text-muted-foreground font-display italic">
          © All Kirthika loves reserved to Avinash
        </p>
      </div>
    </div>
  );
};

export default MessagesBoard;
