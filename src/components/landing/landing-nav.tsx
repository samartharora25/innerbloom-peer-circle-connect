import { Button } from "@/components/ui/button";
import { Flower } from "lucide-react";

interface LandingNavProps {
  onLogin: () => void;
  onSignup: () => void;
}

export const LandingNav = ({ onLogin, onSignup }: LandingNavProps) => {
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-4">
      <div className="glass-nav rounded-full px-6 py-3 flex items-center justify-between shadow-glow">
        <div className="flex items-center space-x-2">
          <Flower className="w-8 h-8 text-primary" />
          <span className="text-xl font-kalam font-bold text-foreground">
            InnerBloom
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            onClick={onLogin}
            className="hover:bg-primary/10 transition-all duration-300"
          >
            Log In
          </Button>
          <Button 
            onClick={onSignup}
            className="bg-primary hover:bg-primary/90 text-foreground rounded-full px-6 transition-all duration-300 hover:scale-105"
          >
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};