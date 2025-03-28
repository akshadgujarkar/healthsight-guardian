
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Activity, Calendar, FileText, PlusCircle, User } from 'lucide-react';
import HealthHistory from './HealthHistory';
import UserProfile from './UserProfile';

const Dashboard: React.FC = () => {
  // Mock data - in a real app, this would come from API/backend
  const recentAnalyses = [
    {
      id: 1,
      date: '2023-06-15',
      symptoms: ['Headache', 'Fatigue', 'Fever'],
      diagnosis: 'Common Cold',
      recommendations: 'Rest, hydration, over-the-counter cold medication'
    },
    {
      id: 2,
      date: '2023-05-30',
      symptoms: ['Joint pain', 'Stiffness', 'Swelling'],
      diagnosis: 'Possible Arthritis',
      recommendations: 'Anti-inflammatory medication, consult with rheumatologist'
    }
  ];

  const healthInsights = [
    {
      title: 'Sleep Pattern',
      status: 'Irregular',
      recommendation: 'Try to maintain a consistent sleep schedule, even on weekends.'
    },
    {
      title: 'Stress Level',
      status: 'Moderate',
      recommendation: 'Consider daily meditation or mindfulness practices to reduce stress.'
    },
    {
      title: 'Exercise',
      status: 'Below Target',
      recommendation: 'Aim for at least 30 minutes of moderate activity most days.'
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      type: 'Annual Physical',
      doctor: 'Dr. Sarah Johnson',
      date: '2023-07-10',
      time: '10:00 AM'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Health Dashboard</h1>
        <Button asChild className="health-button-primary">
          <Link to="/symptom-checker">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Symptom Check
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Analyses</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentAnalyses.length}</div>
            <p className="text-xs text-muted-foreground">
              +0% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Health Status</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Good</div>
            <p className="text-xs text-muted-foreground">
              Based on your recent health data
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
            <p className="text-xs text-muted-foreground">
              Next: Annual Physical on July 10
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="health-history" className="space-y-4">
        <TabsList>
          <TabsTrigger value="health-history">Health History</TabsTrigger>
          <TabsTrigger value="insights">Insights & Recommendations</TabsTrigger>
          <TabsTrigger value="profile">My Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="health-history" className="space-y-4">
          <HealthHistory analyses={recentAnalyses} />
        </TabsContent>
        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Health Insights</CardTitle>
              <CardDescription>
                Personalized recommendations based on your health data and symptom history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {healthInsights.map((insight, index) => (
                  <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{insight.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        insight.status === 'Good' ? 'bg-green-100 text-green-800' :
                        insight.status === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {insight.status}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{insight.recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="profile">
          <UserProfile />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
