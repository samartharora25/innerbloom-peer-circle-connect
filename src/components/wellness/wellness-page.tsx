import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, MessageCircle, Activity, Heart, Brain, Zap, Play, Square } from "lucide-react";
import { toast } from "sonner";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid, ResponsiveContainer } from "recharts";

export const WellnessPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [stressLevel, setStressLevel] = useState<number | null>(null);
  const [pulse, setPulse] = useState<number | null>(null);

  // Activity Tracker
  const [activities, setActivities] = useState<{ name: string; date: string }[]>([]);
  const [activityInput, setActivityInput] = useState("");

  // Mood Journal
  const [mood, setMood] = useState("");
  const [moodNote, setMoodNote] = useState("");
  const [moodEntries, setMoodEntries] = useState<{ mood: string; note: string; date: string }[]>([]);

  // Energy Levels
  const [energy, setEnergy] = useState(5);
  const [energyEntries, setEnergyEntries] = useState<{ level: number; date: string }[]>([]);

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

  const handleAddActivity = () => {
    if (activityInput.trim()) {
      setActivities([{ name: activityInput, date: new Date().toLocaleDateString() }, ...activities]);
      setActivityInput("");
    }
  };

  const handleAddMood = () => {
    if (mood) {
      setMoodEntries([{ mood, note: moodNote, date: new Date().toLocaleDateString() }, ...moodEntries]);
      setMood("");
      setMoodNote("");
    }
  };

  const handleAddEnergy = () => {
    setEnergyEntries([{ level: energy, date: new Date().toLocaleDateString() }, ...energyEntries]);
  };

  // Chart data for last 7 days
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d.toLocaleDateString());
    }
    return days;
  };
  const last7Days = getLast7Days();

  // Activity chart data
  const activityChartData = last7Days.map(date => ({
    date,
    count: activities.filter(a => a.date === date).length
  }));

  // Mood chart data (happy=5, neutral=3, sad/angry/stressed=1)
  const moodScore = (m: string) => m === "😊" ? 5 : m === "😐" ? 3 : m ? 1 : 0;
  const moodChartData = last7Days.map(date => {
    const entry = moodEntries.find(e => e.date === date);
    return { date, score: entry ? moodScore(entry.mood) : null };
  });

  // Energy chart data
  const energyChartData = last7Days.map(date => {
    const entry = energyEntries.find(e => e.date === date);
    return { date, level: entry ? entry.level : null };
  });

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
        {/* Activity Tracker */}
        <Card className="shadow-soft">
          <CardContent className="p-6 text-center">
            <Activity className="w-8 h-8 mx-auto text-primary mb-3" />
            <h3 className="font-semibold mb-2">Activity Tracker</h3>
            <p className="text-sm text-muted-foreground mb-3">Monitor daily activities and mood patterns</p>
            {/* Chart */}
            <div className="mb-4">
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={activityChartData}>
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis allowDecimals={false} width={24} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#13eba0" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-2 mb-2">
              <label htmlFor="activity-input" className="sr-only">Activity</label>
              <input
                id="activity-input"
                className="flex-1 border rounded px-2 py-1"
                placeholder="Add activity (e.g., walk, yoga)"
                value={activityInput}
                onChange={e => setActivityInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleAddActivity(); }}
                title="Activity name"
              />
              <Button size="sm" onClick={handleAddActivity}>Add</Button>
            </div>
            <div className="text-left max-h-32 overflow-y-auto">
              {activities.length === 0 && <div className="text-xs text-muted-foreground">No activities yet.</div>}
              {activities.map((a, i) => (
                <div key={i} className="text-xs py-1 border-b last:border-b-0 flex items-center gap-2">
                  <span>{a.name}</span>
                  <span className="ml-auto text-muted-foreground">{a.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Mood Journal */}
        <Card className="shadow-soft">
          <CardContent className="p-6 text-center">
            <Heart className="w-8 h-8 mx-auto text-primary mb-3" />
            <h3 className="font-semibold mb-2">Mood Journal</h3>
            <p className="text-sm text-muted-foreground mb-3">Track emotional patterns over time</p>
            {/* Chart */}
            <div className="mb-4">
              <ResponsiveContainer width="100%" height={120}>
                <LineChart data={moodChartData}>
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis domain={[0, 5]} width={24} />
                  <Tooltip />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Line type="monotone" dataKey="score" stroke="#13eba0" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-2 mb-2">
              <select className="border rounded px-2 py-1" value={mood} onChange={e => setMood(e.target.value)} title="Select your mood">
                <option value="">Mood</option>
                <option value="😊">Happy</option>
                <option value="😔">Sad</option>
                <option value="😠">Angry</option>
                <option value="😰">Stressed</option>
                <option value="😐">Neutral</option>
              </select>
              <input
                className="flex-1 border rounded px-2 py-1"
                placeholder="Add a note (optional)"
                value={moodNote}
                onChange={e => setMoodNote(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleAddMood(); }}
                title="Mood note"
              />
              <Button size="sm" onClick={handleAddMood}>Log</Button>
            </div>
            <div className="text-left max-h-32 overflow-y-auto">
              {moodEntries.length === 0 && <div className="text-xs text-muted-foreground">No mood entries yet.</div>}
              {moodEntries.map((entry, i) => (
                <div key={i} className="text-xs py-1 border-b last:border-b-0 flex items-center gap-2">
                  <span>{entry.mood}</span>
                  <span>{entry.note}</span>
                  <span className="ml-auto text-muted-foreground">{entry.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Energy Levels */}
        <Card className="shadow-soft">
          <CardContent className="p-6 text-center">
            <Zap className="w-8 h-8 mx-auto text-primary mb-3" />
            <h3 className="font-semibold mb-2">Energy Levels</h3>
            <p className="text-sm text-muted-foreground mb-3">Monitor energy throughout the day</p>
            {/* Chart */}
            <div className="mb-4">
              <ResponsiveContainer width="100%" height={120}>
                <LineChart data={energyChartData}>
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis domain={[1, 10]} width={24} />
                  <Tooltip />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Line type="monotone" dataKey="level" stroke="#13eba0" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-2 items-center mb-2">
              <label htmlFor="energy-slider" className="sr-only">Energy Level</label>
              <input
                id="energy-slider"
                type="range"
                min={1}
                max={10}
                value={energy}
                onChange={e => setEnergy(Number(e.target.value))}
                className="flex-1"
                title="Energy level slider"
              />
              <span className="font-bold text-primary">{energy}</span>
              <Button size="sm" onClick={handleAddEnergy}>Log</Button>
            </div>
            <div className="text-left max-h-32 overflow-y-auto">
              {energyEntries.length === 0 && <div className="text-xs text-muted-foreground">No energy entries yet.</div>}
              {energyEntries.map((entry, i) => (
                <div key={i} className="text-xs py-1 border-b last:border-b-0 flex items-center gap-2">
                  <span className="font-bold text-primary">{entry.level}</span>
                  <span className="ml-auto text-muted-foreground">{entry.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};