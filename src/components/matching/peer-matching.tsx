import { useState } from "react";
import { Heart, MessageCircle, Calendar, MapPin, Star, Filter, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface Peer {
  id: string;
  name: string;
  avatar: string;
  initials: string;
  age: number;
  location: string;
  interests: string[];
  challenges: string[];
  matchScore: number;
  bio: string;
  onlineStatus: "online" | "away" | "offline";
  responseTime: string;
}

const samplePeers: Peer[] = [
  {
    id: "1",
    name: "Jamie Thompson",
    avatar: "",
    initials: "JT",
    age: 24,
    location: "Seattle, WA",
    interests: ["Reading", "Hiking", "Mindfulness"],
    challenges: ["Anxiety", "Social situations"],
    matchScore: 95,
    bio: "Recently started therapy and looking for supportive peers to share the journey with. Love outdoor activities and finding peace in nature.",
    onlineStatus: "online",
    responseTime: "Usually responds within 2 hours"
  },
  {
    id: "2",
    name: "Alex Chen",
    avatar: "",
    initials: "AC",
    age: 28,
    location: "Austin, TX",
    interests: ["Art therapy", "Music", "Cooking"],
    challenges: ["Depression", "Creative blocks"],
    matchScore: 89,
    bio: "Artist working through creative challenges and mental health. Believe in the healing power of creativity and community support.",
    onlineStatus: "away",
    responseTime: "Usually responds within 4 hours"
  },
  {
    id: "3",
    name: "Morgan Rivera",
    avatar: "",
    initials: "MR",
    age: 22,
    location: "Portland, OR",
    interests: ["Yoga", "Journaling", "Plant care"],
    challenges: ["Social anxiety", "Self-esteem"],
    matchScore: 87,
    bio: "Finding strength through mindfulness practices. Looking for understanding peers to share experiences and grow together.",
    onlineStatus: "online",
    responseTime: "Usually responds within 1 hour"
  }
];

export function PeerMatching() {
  const [peers] = useState<Peer[]>(samplePeers);
  const [selectedPeer, setSelectedPeer] = useState<Peer | null>(null);

  const getStatusColor = (status: Peer["onlineStatus"]) => {
    switch (status) {
      case "online": return "bg-success";
      case "away": return "bg-warning";
      case "offline": return "bg-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Find Your Support Network</h2>
          <p className="text-muted-foreground">Connect with peers who understand your journey</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search interests..." className="pl-10 w-64" />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Peer List */}
        <div className="lg:col-span-2 space-y-4">
          {peers.map((peer) => (
            <Card 
              key={peer.id} 
              className={`shadow-soft cursor-pointer transition-smooth hover:shadow-glow ${
                selectedPeer?.id === peer.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedPeer(peer)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={peer.avatar} />
                        <AvatarFallback className="bg-gradient-wellness text-wellness-foreground">
                          {peer.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(peer.onlineStatus)}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{peer.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground space-x-2">
                        <span>{peer.age} years old</span>
                        <span>•</span>
                        <MapPin className="w-3 h-3" />
                        <span>{peer.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="font-semibold text-primary">{peer.matchScore}%</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm leading-relaxed">{peer.bio}</p>
                
                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Shared Interests</p>
                    <div className="flex flex-wrap gap-1">
                      {peer.interests.map((interest) => (
                        <Badge key={interest} variant="secondary" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Similar Challenges</p>
                    <div className="flex flex-wrap gap-1">
                      {peer.challenges.map((challenge) => (
                        <Badge key={challenge} className="text-xs bg-wellness text-wellness-foreground">
                          {challenge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <p className="text-xs text-muted-foreground">{peer.responseTime}</p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Heart className="w-4 h-4 mr-1" />
                      Connect
                    </Button>
                    <Button size="sm">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Chat
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed View */}
        <div className="space-y-4">
          {selectedPeer ? (
            <Card className="shadow-soft sticky top-20">
              <CardHeader>
                <div className="text-center space-y-4">
                  <div className="relative mx-auto w-20 h-20">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={selectedPeer.avatar} />
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xl">
                        {selectedPeer.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-4 border-background ${getStatusColor(selectedPeer.onlineStatus)}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{selectedPeer.name}</h3>
                    <p className="text-muted-foreground">{selectedPeer.age} years old • {selectedPeer.location}</p>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <Star className="w-5 h-5 fill-primary text-primary" />
                    <span className="text-lg font-bold text-primary">{selectedPeer.matchScore}% Match</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Separator />
                <p className="text-sm leading-relaxed">{selectedPeer.bio}</p>
                <Separator />
                
                <div className="space-y-3">
                  <Button className="w-full shadow-glow">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Start Conversation
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Heart className="w-4 h-4 mr-2" />
                    Add to Support Circle
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Check-in
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground text-center">
                  {selectedPeer.responseTime}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-soft">
              <CardContent className="text-center py-12">
                <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Select a peer to view their profile</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}