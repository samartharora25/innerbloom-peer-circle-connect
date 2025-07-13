import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, MessageCircle, Activity, Heart, Brain, Zap, Play, Square } from "lucide-react";
import { toast } from "sonner";

export const WellnessPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [stressLevel, setStressLevel] = useState<number | null>(null);
  const [pulse, setPulse] = useState<number | null>(null);

  const startStressDetection = async () => {
    setIsRecording(true);
    toast.success("Camera activated for stress detection...");
    
    // Simulate stress detection
    setTimeout(() => {
      setStressLevel(Math.floor(Math.random() * 40) + 30); // 30-70
      setPulse(Math.floor(Math.random() * 30) + 70); // 70-100
      setIsRecording(false);
      toast.success("Analysis complete!");
    }, 3000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    toast.info("Recording stopped");
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Wellness Dashboard</h2>
        <p className="text-muted-foreground">Track your mental health journey and stress levels</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Stress Detection */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-primary" />
              Facial Stress Detection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-8 bg-muted/30 rounded-lg">
              {isRecording ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <Camera className="w-8 h-8 text-destructive" />
                  </div>
                  <p className="text-sm text-muted-foreground">Analyzing facial expressions...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Camera className="w-16 h-16 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to start stress analysis</p>
                </div>
              )}
            </div>

            {stressLevel !== null && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Stress Level</span>
                  <Badge variant={stressLevel > 60 ? "destructive" : stressLevel > 40 ? "secondary" : "default"}>
                    {stressLevel}%
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Heart Rate</span>
                  <Badge variant="outline">{pulse} BPM</Badge>
                </div>
              </div>
            )}

            <Button 
              onClick={isRecording ? stopRecording : startStressDetection}
              className="w-full"
              variant={isRecording ? "destructive" : "default"}
            >
              {isRecording ? (
                <>
                  <Square className="w-4 h-4 mr-2" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start Analysis
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Health Chatbot */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              Health Chatbot
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-primary/5 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">
                    Hi! I'm your wellness companion. I can help you with stress management, 
                    mood tracking, and personalized wellness tips. How are you feeling today?
                  </p>
                </div>
              </div>
            </div>
            <Button className="w-full" variant="outline">
              <MessageCircle className="w-4 h-4 mr-2" />
              Start Wellness Chat
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Additional Wellness Features */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="shadow-soft">
          <CardContent className="p-6 text-center">
            <Activity className="w-8 h-8 mx-auto text-primary mb-3" />
            <h3 className="font-semibold mb-2">Activity Tracker</h3>
            <p className="text-sm text-muted-foreground">Monitor daily activities and mood patterns</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6 text-center">
            <Heart className="w-8 h-8 mx-auto text-primary mb-3" />
            <h3 className="font-semibold mb-2">Mood Journal</h3>
            <p className="text-sm text-muted-foreground">Track emotional patterns over time</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6 text-center">
            <Zap className="w-8 h-8 mx-auto text-primary mb-3" />
            <h3 className="font-semibold mb-2">Energy Levels</h3>
            <p className="text-sm text-muted-foreground">Monitor energy throughout the day</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};