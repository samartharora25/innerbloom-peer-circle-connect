import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { SocialFeed } from "@/components/dashboard/social-feed";
import { PeerMatching } from "@/components/matching/peer-matching";
import { CommunitiesSection } from "@/components/communities/communities-section";
import { HelpSection } from "@/components/support/help-section";
import { WellnessPage } from "@/components/wellness/wellness-page";
import { Card, CardContent } from "@/components/ui/card";
import { Activity } from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-8">
            <DashboardOverview />
            <div>
              <h3 className="text-xl font-semibold mb-4">Community Feed</h3>
              <SocialFeed />
            </div>
          </div>
        );
      case "matching":
        return <PeerMatching />;
      case "communities":
        return <CommunitiesSection />;
      case "activities":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Group Activities</h2>
              <p className="text-muted-foreground">Join community-organized events and activities</p>
            </div>
            <Card className="shadow-soft">
              <CardContent className="text-center py-12">
                <Activity className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Activity features coming soon...</p>
              </CardContent>
            </Card>
          </div>
        );
      case "wellness":
        return <WellnessPage />;
      case "help":
        return <HelpSection />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="pt-20 pb-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;