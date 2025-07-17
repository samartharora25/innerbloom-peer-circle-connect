import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Users, 
  Calendar, 
  MessageCircle, 
  Activity, 
  Clock, 
  TrendingUp, 
  Heart,
  AlertCircle,
  Video,
  FileText,
  Search,
  Filter,
  MoreHorizontal,
  Phone,
  Mail,
  MapPin,
  Star,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  User,
  Stethoscope,
  ClipboardList,
  BarChart3,
  Settings
} from "lucide-react";

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");

  const stats = [
    {
      title: "Total Patients",
      value: "247",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Today's Appointments",
      value: "8",
      change: "+2",
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Active Consultations",
      value: "3",
      change: "ongoing",
      icon: MessageCircle,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Patient Satisfaction",
      value: "4.8",
      change: "+0.2",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    }
  ];

  const recentPatients = [
    {
      id: 1,
      name: "Sarah Johnson",
      age: 28,
      condition: "Anxiety",
      lastVisit: "2 hours ago",
      status: "active",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b67e0b83?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Michael Chen",
      age: 35,
      condition: "Depression",
      lastVisit: "Yesterday",
      status: "stable",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      age: 24,
      condition: "Stress Management",
      lastVisit: "3 days ago",
      status: "improving",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "David Wilson",
      age: 42,
      condition: "PTSD",
      lastVisit: "1 week ago",
      status: "needs_attention",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const todayAppointments = [
    {
      id: 1,
      patient: "Sarah Johnson",
      time: "09:00 AM",
      type: "Follow-up",
      status: "completed",
      duration: "45 min"
    },
    {
      id: 2,
      patient: "Michael Chen",
      time: "10:30 AM",
      type: "Consultation",
      status: "in_progress",
      duration: "60 min"
    },
    {
      id: 3,
      patient: "Emily Rodriguez",
      time: "2:00 PM",
      type: "Assessment",
      status: "upcoming",
      duration: "30 min"
    },
    {
      id: 4,
      patient: "David Wilson",
      time: "3:30 PM",
      type: "Therapy Session",
      status: "upcoming",
      duration: "50 min"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-red-100 text-red-800";
      case "stable":
        return "bg-green-100 text-green-800";
      case "improving":
        return "bg-blue-100 text-blue-800";
      case "needs_attention":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-primary/10 text-primary";
      case "upcoming":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const OverviewContent = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="glass border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Patients & Today's Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass border-0 shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span>Recent Patients</span>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentPatients.map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={patient.avatar} alt={patient.name} />
                    <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">{patient.condition}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={`${getStatusColor(patient.status)} text-xs`}>
                    {patient.status.replace('_', ' ')}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{patient.lastVisit}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass border-0 shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span>Today's Appointments</span>
              <Button variant="ghost" size="sm">
                <Calendar className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {todayAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{appointment.patient}</p>
                    <p className="text-sm text-muted-foreground">{appointment.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{appointment.time}</p>
                  <Badge className={`${getStatusColor(appointment.status)} text-xs`}>
                    {appointment.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const PatientsContent = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Patient Management</h2>
          <p className="text-muted-foreground">Manage your patients and their treatment plans</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-foreground">
          <User className="w-4 h-4 mr-2" />
          Add New Patient
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search patients..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <Card className="glass border-0 shadow-soft">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium text-muted-foreground">Patient</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Condition</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Last Visit</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentPatients.map((patient) => (
                  <tr key={patient.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={patient.avatar} alt={patient.name} />
                          <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{patient.name}</p>
                          <p className="text-sm text-muted-foreground">Age {patient.age}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-foreground">{patient.condition}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-foreground">{patient.lastVisit}</p>
                    </td>
                    <td className="p-4">
                      <Badge className={`${getStatusColor(patient.status)}`}>
                        {patient.status.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Video className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <FileText className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const AppointmentsContent = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Appointments</h2>
          <p className="text-muted-foreground">Manage your consultation schedule</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-foreground">
          <Calendar className="w-4 h-4 mr-2" />
          Schedule New
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass border-0 shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {todayAppointments.map((appointment) => (
              <div key={appointment.id} className="p-3 rounded-lg border hover:bg-muted/30 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-foreground">{appointment.patient}</p>
                  <Badge className={`${getStatusColor(appointment.status)} text-xs`}>
                    {appointment.status.replace('_', ' ')}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {appointment.time} ({appointment.duration})
                  </p>
                  <p className="flex items-center">
                    <FileText className="w-3 h-3 mr-1" />
                    {appointment.type}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass border-0 shadow-soft lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Calendar View</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-muted/20 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Calendar component would go here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const AnalyticsContent = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Analytics & Reports</h2>
        <p className="text-muted-foreground">Track patient progress and treatment outcomes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass border-0 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Recovery Rate</p>
                <p className="text-2xl font-bold text-foreground">78%</p>
              </div>
              <div className="p-3 rounded-full bg-green-50">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-0 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Session Length</p>
                <p className="text-2xl font-bold text-foreground">45m</p>
              </div>
              <div className="p-3 rounded-full bg-blue-50">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-0 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Patient Retention</p>
                <p className="text-2xl font-bold text-foreground">92%</p>
              </div>
              <div className="p-3 rounded-full bg-primary/10">
                <Heart className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-0 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical Cases</p>
                <p className="text-2xl font-bold text-foreground">3</p>
              </div>
              <div className="p-3 rounded-full bg-red-50">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass border-0 shadow-soft">
        <CardHeader>
          <CardTitle>Patient Progress Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-muted/20 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Chart component would go here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewContent />;
      case "patients":
        return <PatientsContent />;
      case "appointments":
        return <AppointmentsContent />;
      case "analytics":
        return <AnalyticsContent />;
      default:
        return <OverviewContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <header className="glass-nav border-b border-border/20 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Dr. Sarah Wilson</h1>
              <p className="text-sm text-muted-foreground">Mental Health Specialist</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <MessageCircle className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face" />
              <AvatarFallback>SW</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="glass-nav border-b border-border/20 px-6 py-3">
        <div className="flex space-x-8">
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "patients", label: "Patients", icon: Users },
            { id: "appointments", label: "Appointments", icon: Calendar },
            { id: "analytics", label: "Analytics", icon: TrendingUp }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default DoctorDashboard;