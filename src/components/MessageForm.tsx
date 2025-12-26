import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Heart, Send, Sparkles } from 'lucide-react';
import { z } from 'zod';

const messageSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name is too long'),
  message: z.string().trim().min(1, 'Message is required').max(1000, 'Message is too long'),
});

const MessageForm: React.FC = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    const validation = messageSchema.safeParse({ name, message });
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('messages')
        .insert([{ name: validation.data.name, message: validation.data.message }]);

      if (error) throw error;

      setIsSubmitted(true);
      toast.success('Your message has been sent with love! ♥');
      setName('');
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12 animate-scale-in">
        <Heart className="w-16 h-16 mx-auto mb-6 text-primary animate-heartbeat" fill="currentColor" />
        <h3 className="font-display text-2xl md:text-3xl text-foreground mb-4">
          Thank you for your wishes!
        </h3>
        <p className="text-muted-foreground">
          Your message will be treasured forever ♥
        </p>
        <Button
          variant="ghost"
          className="mt-6"
          onClick={() => setIsSubmitted(false)}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-lavender/20">
      <div className="container mx-auto px-4 max-w-xl">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm uppercase tracking-widest text-muted-foreground">
              Share your love
            </span>
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Send Us Your Wishes
          </h2>
          <p className="text-muted-foreground">
            Leave a heartfelt message for our special day
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Your Name</label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your beautiful name"
              className="h-12 bg-background/50 border-border/50 focus:border-primary rounded-xl"
              required
              maxLength={100}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Your Message</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your heartfelt wishes here..."
              className="min-h-32 bg-background/50 border-border/50 focus:border-primary rounded-xl resize-none"
              required
              maxLength={1000}
            />
            <p className="text-xs text-muted-foreground text-right">
              {message.length}/1000
            </p>
          </div>

          <Button
            type="submit"
            variant="love"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Sending...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                Send with Love
              </span>
            )}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default MessageForm;
