import { Users, MessageCircle, Heart, BookOpen, Briefcase, Home, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Community {
  id: string;
  name: string;
  description: string;
  category: "health" | "education" | "family" | "career";
  memberCount: number;
  activeDiscussions: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  recentActivity: string;
  isJoined: boolean;
}

const communities: Community[] = [
  {
    id: "1",
    name: "Anxiety Support Circle",
    description: "A safe space for those dealing with anxiety disorders. Share coping strategies, celebrate wins, and find understanding.",
    category: "health",
    memberCount: 2847,
    activeDiscussions: 23,
    icon: Heart,
    color: "bg-gradient-wellness",
    recentActivity: "2 new posts today",
    isJoined: true
  },
  {
    id: "2",
    name: "College & University Students",
    description: "Connect with fellow students navigating academic stress, social challenges, and mental health on campus.",
    category: "education",
    memberCount: 1593,
    activeDiscussions: 18,
    icon: BookOpen,
    color: "bg-gradient-primary",
    recentActivity: "5 new posts today",
    isJoined: false
  },
  {
    id: "3",
    name: "New Parents Network",
    description: "Supporting parents through postpartum challenges, parenting stress, and finding balance in family life.",
    category: "family",
    memberCount: 892,
    activeDiscussions: 12,
    icon: Home,
    color: "bg-accent",
    recentActivity: "3 new posts today",
    isJoined: true
  },
  {
    id: "4",
    name: "Workplace Wellness",
    description: "Discussing work-related stress, burnout prevention, and maintaining mental health in professional settings.",
    category: "career",
    memberCount: 1247,
    activeDiscussions: 15,
    icon: Briefcase,
    color: "bg-warning",
    recentActivity: "4 new posts today",
    isJoined: false
  }
];

const categoryLabels = {
  health: "Health & Wellness",
  education: "Education",
  family: "Family & Relationships",
  career: "Career & Work"
};

export function CommunitiesSection() {
  const groupedCommunities = communities.reduce((acc, community) => {
    if (!acc[community.category]) {
      acc[community.category] = [];
    }
    acc[community.category].push(community);
    return acc;
  }, {} as Record<string, Community[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Communities</h2>
          <p className="text-muted-foreground">Join supportive groups that understand your journey</p>
        </div>
        <Button className="shadow-glow">
          <Plus className="w-4 h-4 mr-2" />
          Create Community
        </Button>
      </div>

      {Object.entries(groupedCommunities).map(([category, communitiesInCategory]) => (
        <div key={category} className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            {categoryLabels[category as keyof typeof categoryLabels]}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communitiesInCategory.map((community) => (
              <Card key={community.id} className="shadow-soft hover:shadow-glow transition-smooth">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${community.color}`}>
                        <community.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{community.name}</CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            {community.memberCount.toLocaleString()} members
                          </span>
                          <span className="flex items-center">
                            <MessageCircle className="w-3 h-3 mr-1" />
                            {community.activeDiscussions} active
                          </span>
                        </div>
                      </div>
                    </div>
                    {community.isJoined && (
                      <Badge className="bg-success text-success-foreground">Joined</Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-foreground leading-relaxed">
                    {community.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      {community.recentActivity}
                    </p>
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <Avatar key={i} className="w-6 h-6 border-2 border-background">
                          <AvatarFallback className="text-xs bg-gradient-wellness text-wellness-foreground">
                            {String.fromCharCode(65 + i)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {community.isJoined ? (
                      <>
                        <Button size="sm" className="flex-1">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          View Discussions
                        </Button>
                        <Button size="sm" variant="outline">
                          Leave
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" className="w-full shadow-glow">
                        <Users className="w-4 h-4 mr-1" />
                        Join Community
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}