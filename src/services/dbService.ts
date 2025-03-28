
import User from '../models/User';
import HealthHistory from '../models/HealthHistory';
import { connectDB } from '../config/dbConfig';
import { toast } from 'sonner';

// Initialize connection when the service is imported
let isConnected = false;

const ensureConnection = async () => {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
    } catch (error) {
      console.error('Failed to connect to database:', error);
      toast.error('Database connection failed. Some features may not work correctly.');
      return false;
    }
  }
  return true;
};

// User-related operations
export const getUserProfile = async (email: string) => {
  if (!(await ensureConnection())) return null;
  
  try {
    return await User.findOne({ email });
  } catch (error) {
    console.error('Failed to get user profile:', error);
    toast.error('Failed to load user profile');
    return null;
  }
};

export const saveUserProfile = async (userData: any) => {
  if (!(await ensureConnection())) return null;
  
  try {
    const existingUser = await User.findOne({ email: userData.email });
    
    if (existingUser) {
      // Update existing user
      const updatedUser = await User.findOneAndUpdate(
        { email: userData.email },
        userData,
        { new: true }
      );
      return updatedUser;
    } else {
      // Create new user
      const newUser = new User(userData);
      await newUser.save();
      return newUser;
    }
  } catch (error) {
    console.error('Failed to save user profile:', error);
    toast.error('Failed to save user profile');
    return null;
  }
};

// Health history operations
export const getUserHealthHistory = async (userId: string) => {
  if (!(await ensureConnection())) return [];
  
  try {
    return await HealthHistory.find({ userId }).sort({ date: -1 });
  } catch (error) {
    console.error('Failed to get health history:', error);
    toast.error('Failed to load health history');
    return [];
  }
};

export const saveHealthAnalysis = async (userId: string, analysisData: any) => {
  if (!(await ensureConnection())) return null;
  
  try {
    const newAnalysis = new HealthHistory({
      userId,
      date: new Date(),
      symptoms: analysisData.symptoms,
      diagnosis: analysisData.diagnosis,
      recommendations: analysisData.recommendations,
      severity: analysisData.severity || 'Medium'
    });
    
    await newAnalysis.save();
    return newAnalysis;
  } catch (error) {
    console.error('Failed to save health analysis:', error);
    toast.error('Failed to save health analysis');
    return null;
  }
};

// Recommendation system
export const getHealthRecommendations = async (userId: string) => {
  if (!(await ensureConnection())) return [];
  
  try {
    // Get user's health history
    const healthHistory = await HealthHistory.find({ userId }).sort({ date: -1 }).limit(5);
    
    if (!healthHistory || healthHistory.length === 0) {
      return [
        {
          title: 'Establish Health Baseline',
          status: 'Pending',
          recommendation: 'Complete your first symptom check to establish your health baseline.'
        }
      ];
    }

    // Extract common symptoms and conditions
    const allSymptoms = healthHistory.flatMap(record => record.symptoms);
    const symptomFrequency: Record<string, number> = {};
    
    allSymptoms.forEach(symptom => {
      if (symptom in symptomFrequency) {
        symptomFrequency[symptom]++;
      } else {
        symptomFrequency[symptom] = 1;
      }
    });

    // Generate personalized recommendations
    const recommendations = [];
    
    // Check for recurring symptoms
    const recurringSymptoms = Object.entries(symptomFrequency)
      .filter(([_, count]) => count > 1)
      .map(([symptom]) => symptom);
    
    if (recurringSymptoms.length > 0) {
      recommendations.push({
        title: 'Recurring Symptoms',
        status: 'Attention Needed',
        recommendation: `Consider consulting a specialist about your recurring ${recurringSymptoms.join(', ')} symptoms.`
      });
    }

    // Check recent diagnoses
    const recentDiagnosis = healthHistory[0].diagnosis;
    recommendations.push({
      title: 'Recent Diagnosis',
      status: 'Follow Up',
      recommendation: `Follow the recommended treatment plan for your recent ${recentDiagnosis} diagnosis.`
    });

    // General health recommendations based on history
    if (healthHistory.some(record => record.diagnosis.toLowerCase().includes('stress') || 
        record.symptoms.some(s => s.toLowerCase().includes('stress') || s.toLowerCase().includes('anxiety')))) {
      recommendations.push({
        title: 'Stress Management',
        status: 'Recommended',
        recommendation: 'Practice daily stress reduction techniques like meditation or deep breathing.'
      });
    }

    if (healthHistory.some(record => record.symptoms.some(s => 
        s.toLowerCase().includes('fatigue') || s.toLowerCase().includes('tired')))) {
      recommendations.push({
        title: 'Energy Levels',
        status: 'Monitor',
        recommendation: 'Ensure you\'re getting 7-9 hours of quality sleep and staying hydrated throughout the day.'
      });
    }

    // If we have few recommendations, add general ones
    if (recommendations.length < 3) {
      recommendations.push({
        title: 'Preventive Care',
        status: 'Recommended',
        recommendation: 'Schedule a general check-up with your doctor if you haven\'t had one in the past year.'
      });
    }

    return recommendations;
  } catch (error) {
    console.error('Failed to generate health recommendations:', error);
    return [
      {
        title: 'Health Monitoring',
        status: 'Recommended',
        recommendation: 'Regular health check-ups are recommended to maintain optimal health.'
      }
    ];
  }
};

// Health status determination based on history
export const calculateHealthStatus = async (userId: string) => {
  if (!(await ensureConnection())) return 'Unknown';
  
  try {
    const recentHistory = await HealthHistory.find({ userId }).sort({ date: -1 }).limit(3);
    
    if (!recentHistory || recentHistory.length === 0) {
      return 'No Data';
    }
    
    // Count high severity issues
    const highSeverityCount = recentHistory.filter(record => record.severity === 'High').length;
    
    // Count medium severity issues
    const mediumSeverityCount = recentHistory.filter(record => record.severity === 'Medium').length;
    
    // Determine overall status
    if (highSeverityCount >= 2) {
      return 'Needs Attention';
    } else if (highSeverityCount === 1 || mediumSeverityCount >= 2) {
      return 'Monitor';
    } else {
      return 'Good';
    }
  } catch (error) {
    console.error('Failed to calculate health status:', error);
    return 'Unknown';
  }
};
