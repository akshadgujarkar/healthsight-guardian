import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Activity, Calendar, FileText, PlusCircle, User, Loader2 } from 'lucide-react';
import HealthHistory from './HealthHistory';
import UserProfile from './UserProfile';

import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/dbConfig';

const MOCK_USER_EMAIL = 'john.doe@example.com';

const Dashboard: React.FC = () => {
  const [healthStatus, setHealthStatus] = useState('Loading...');
  const [recentAnalyses, setRecentAnalyses] = useState<any[]>([]);
  const [healthInsights, setHealthInsights] = useState<any[]>([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Fetch health history from Firestore
        const historyRef = collection(db, `healthHistory/${MOCK_USER_EMAIL}/healthHistory`);
        const historySnap = await getDocs(historyRef);
        setRecentAnalyses(historySnap.docs.map(doc => doc.data()));

        // Fetch personalized recommendations
        const recommendationsRef = collection(db, `healthHistory/2aRgaDBgYkfBxT71Nsds/recommendations`);
        const recommendationsSnap = await getDocs(recommendationsRef);
        setHealthInsights(recommendationsSnap.docs.map(doc => doc.data()));

        // Fetch health status
        const statusRef = doc(db, `users/${MOCK_USER_EMAIL}`);
        const statusSnap = await getDoc(statusRef);
        setHealthStatus(statusSnap.exists() ? statusSnap.data().healthStatus : 'Unknown');

        // Fetch upcoming appointments
        const appointmentsRef = collection(db, `users/${MOCK_USER_EMAIL}/appointments`);
        const appointmentsSnap = await getDocs(appointmentsRef);
        setUpcomingAppointments(appointmentsSnap.docs.map(doc => doc.data()));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">Your Health Dashboard</h1>
        <Button asChild className="health-button-primary">
          <Link to="/symptom-checker">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Symptom Check
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-accent-foreground/10 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Recent Analyses</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Loader2 className="h-5 w-5 mx-auto animate-spin text-muted-foreground" />
            ) : (
              <>
                <div className="text-2xl font-bold text-foreground">{recentAnalyses.length}</div>
                <p className="text-xs text-muted-foreground">
                  {recentAnalyses.length > 0 
                    ? `Last check: ${new Date(recentAnalyses[0].date).toLocaleDateString()}` 
                    : 'No analyses yet'}
                </p>
              </>
            )}
          </CardContent>
        </Card>
        <Card className="border-accent-foreground/10 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Health Status</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Loader2 className="h-5 w-5 mx-auto animate-spin text-muted-foreground" />
            ) : (
              <>
                <div className="text-2xl font-bold text-foreground">{healthStatus}</div>
                <p className="text-xs text-muted-foreground">
                  Based on your recent health data
                </p>
              </>
            )}
          </CardContent>
        </Card>
        <Card className="border-accent-foreground/10 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Upcoming Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Loader2 className="h-5 w-5 mx-auto animate-spin text-muted-foreground" />
            ) : (
              <>
                <div className="text-2xl font-bold text-foreground">{upcomingAppointments.length}</div>
                <p className="text-xs text-muted-foreground">
                  {upcomingAppointments.length > 0 
                    ? `Next: ${upcomingAppointments[0].type} on ${new Date(upcomingAppointments[0].date).toLocaleDateString()}` 
                    : 'No upcoming appointments'}
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="health-history" className="space-y-4">
        <TabsList className="bg-background/50 border border-border">
          <TabsTrigger value="health-history" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Health History</TabsTrigger>
          <TabsTrigger value="insights" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Insights & Recommendations</TabsTrigger>
          <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">My Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="health-history" className="space-y-4">
          <HealthHistory />
        </TabsContent>
        <TabsContent value="insights" className="space-y-4">
          <Card className="border-accent-foreground/10 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-foreground">Health Insights</CardTitle>
              <CardDescription className="text-muted-foreground">
                Personalized recommendations based on your health data and symptom history
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <div className="space-y-6">
                  {healthInsights.map((insight, index) => (
                    <div key={index} className="border-b border-border pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-foreground">{insight.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          insight.status === 'Good' ? 'bg-green-900/20 text-green-400' :
                          insight.status === 'Monitor' ? 'bg-amber-900/20 text-amber-400' :
                          insight.status === 'Recommended' ? 'bg-blue-900/20 text-blue-400' :
                          insight.status === 'Pending' ? 'bg-slate-900/20 text-slate-400' :
                          'bg-red-900/20 text-red-400'
                        }`}>
                          {insight.status}
                        </span>
                      </div>
                      <p className="text-foreground/80 text-sm">{insight.recommendation}</p>
                    </div>
                  ))}
                </div>
              )}
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