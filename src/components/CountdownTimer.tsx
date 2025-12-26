import React, { useState, useEffect } from 'react';
import { Heart, Clock } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Set anniversary date to next year from today
    const today = new Date();
    const anniversaryDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = anniversaryDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 flex items-center justify-center shadow-romantic">
          <span className="font-display text-3xl md:text-5xl text-foreground">
            {value.toString().padStart(2, '0')}
          </span>
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary animate-gentle-pulse" />
      </div>
      <span className="mt-3 text-sm md:text-base text-muted-foreground uppercase tracking-widest font-light">
        {label}
      </span>
    </div>
  );

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-blush/20 to-background" />

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-primary/10 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${16 + Math.random() * 24}px`,
              height: `${16 + Math.random() * 24}px`,
              animationDelay: `${i * 0.3}s`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-primary" />
            <span className="text-sm uppercase tracking-widest text-muted-foreground">
              Counting down to
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-2">
            Time till our next anniversary
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-12 h-px bg-primary/50" />
            <Heart className="w-5 h-5 text-primary" fill="currentColor" />
            <div className="w-12 h-px bg-primary/50" />
          </div>
        </div>

        <div className="flex justify-center gap-4 md:gap-8">
          <TimeUnit value={timeLeft.days} label="Days" />
          <div className="flex items-center text-3xl text-primary/50 font-light self-start mt-8">:</div>
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <div className="hidden md:flex items-center text-3xl text-primary/50 font-light self-start mt-8">:</div>
          <div className="hidden md:block">
            <TimeUnit value={timeLeft.minutes} label="Minutes" />
          </div>
          <div className="hidden md:flex items-center text-3xl text-primary/50 font-light self-start mt-8">:</div>
          <div className="hidden md:block">
            <TimeUnit value={timeLeft.seconds} label="Seconds" />
          </div>
        </div>

        {/* Mobile view for minutes and seconds */}
        <div className="flex md:hidden justify-center gap-4 mt-4">
          <TimeUnit value={timeLeft.minutes} label="Minutes" />
          <div className="flex items-center text-3xl text-primary/50 font-light self-start mt-8">:</div>
          <TimeUnit value={timeLeft.seconds} label="Seconds" />
        </div>

        <p className="text-center mt-12 font-display text-xl text-muted-foreground italic">
          Every second with you is a blessing ♥
        </p>
      </div>
    </section>
  );
};

export default CountdownTimer;
