import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users } from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-white via-primary/5 to-primary/10">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-10 w-96 h-96 bg-primary/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10 pt-32">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
            You're Not{" "}
            <span className="text-primary font-kalam relative">
              Alone
              <Heart className="absolute -top-2 -right-8 w-8 h-8 text-primary animate-pulse" />
            </span>
            .
            <br />
            Find Someone Who{" "}
            <span className="text-primary font-kalam">Gets It</span>.
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            AI-matched emotional support with people who understand what you're going through.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="bg-primary hover:bg-primary/90 text-foreground px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-glow"
            >
              Get Matched Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              size="lg" 
              variant="ghost"
              className="text-foreground hover:bg-primary/10 px-8 py-4 text-lg rounded-full transition-all duration-300"
            >
              <Users className="mr-2 w-5 h-5" />
              Learn How It Works
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-8 pt-12 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              <span>1000+ Active Members</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse delay-75"></div>
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse delay-150"></div>
              <span>Safe & Anonymous</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};