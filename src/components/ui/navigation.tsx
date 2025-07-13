import { Heart, Users, Calendar, MessageCircle, HelpCircle, Activity } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Heart },
  { id: 'matching', label: 'Find Peers', icon: Users },
  { id: 'communities', label: 'Communities', icon: MessageCircle },
  { id: 'activities', label: 'Activities', icon: Calendar },
  { id: 'wellness', label: 'Wellness', icon: Activity },
  { id: 'help', label: 'Support', icon: HelpCircle },
];

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
              <Heart className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              InnerBloom
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "flex items-center space-x-2 transition-smooth",
                  activeTab === item.id && "shadow-glow"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden md:inline">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}