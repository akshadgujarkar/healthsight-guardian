import User from '../models/User';
import HealthHistory from '../models/HealthHistory';
import { connectDB } from '../config/dbConfig';
import { toast } from 'sonner';
import mongoose, { ConnectionStates } from 'mongoose';

// Initialize connection when the service is imported
let isConnected = false;

const ensureConnection = async (): Promise<boolean> => {
  try {   
     await connectDB();
    return (mongoose.connection.readyState === 1 as number); // Corrected type comparison
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
};

// User-related operations
export const getUserProfile = async (email: string) => {
  if (!(await ensureConnection())) return null;

  try {
    const user = await User.findOne({ email }).exec();
    return user ? user.toObject() : null;
  } catch (error) {
    console.error('Failed to get user profile:', error);
    toast.error('Failed to load user profile');
    return null;
  }
};

export const saveUserProfile = async (userData: any) => {
  if (!(await ensureConnection())) return null;

  try {
    const { email } = userData; // Fix: Destructure email
    if (!email) throw new Error('Email is required');

    const existingUser = await User.findOne({ email }).exec();

    if (existingUser) {
      // Update existing user
      const updatedUser = await User.findOneAndUpdate(
        { email },
        userData,
        { new: true }
      ).exec();
      return updatedUser ? updatedUser.toObject() : null;
    } else {
      // Create new user
      const newUser = new User(userData);
      const savedUser = await newUser.save();
      return savedUser.toObject();
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
    const history = await HealthHistory.find({ userId }).sort({ date: -1 }).exec();
    return history.map(doc => doc.toObject());
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

    const savedAnalysis = await newAnalysis.save();
    return savedAnalysis.toObject();
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
    const healthHistory = await HealthHistory.find({ userId }).sort({ date: -1 }).limit(5).exec();
    const historyObjects = healthHistory.map(doc => doc.toObject());

    if (historyObjects.length === 0) {
      return [
        {
          title: 'Establish Health Baseline',
          status: 'Pending',
          recommendation: 'Complete your first symptom check to establish your health baseline.'
        }
      ];
    }

    // Extract common symptoms and conditions
    const allSymptoms = historyObjects.length > 0 ? historyObjects.flatMap(record => record.symptoms) : [];
    const symptomFrequency: Record<string, number> = {};

    allSymptoms.forEach(symptom => {
      symptomFrequency[symptom] = (symptomFrequency[symptom] || 0) + 1;
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

    // Check recent diagnoses (Fix: Ensure history is not empty)
    const recentDiagnosis = healthHistory[0]?.diagnosis || 'Unknown Condition';
    recommendations.push({
      title: 'Recent Diagnosis',
      status: 'Follow Up',
      recommendation: `Follow the recommended treatment plan for your recent ${recentDiagnosis} diagnosis.`
    });

    // General health recommendations based on history
    if (historyObjects.some(record => 
        record.diagnosis.toLowerCase().includes('stress') ||
        record.symptoms.some(s => s.toLowerCase().includes('stress') || s.toLowerCase().includes('anxiety')))) {
      recommendations.push({
        title: 'Stress Management',
        status: 'Recommended',
        recommendation: 'Practice daily stress reduction techniques like meditation or deep breathing.'
      });
    }

    if (historyObjects.some(record =>
        record.symptoms.some(s => s.toLowerCase().includes('fatigue') || s.toLowerCase().includes('tired')))) {
      recommendations.push({
        title: 'Energy Levels',
        status: 'Monitor',
        recommendation: 'Ensure you\'re getting 7-9 hours of quality sleep and staying hydrated throughout the day.'
      });
    }

    // Add a default recommendation if none exist
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
    const recentHistory = await HealthHistory.find({ userId }).sort({ date: -1 }).limit(3).exec();
    const historyObjects = recentHistory.map(doc => doc.toObject());

    if (historyObjects.length === 0) {
      return 'No Data';
    }

    // Count high severity issues
    const highSeverityCount = historyObjects.filter(record => record.severity === 'High').length;

    // Count medium severity issues
    const mediumSeverityCount = historyObjects.filter(record => record.severity === 'Medium').length;

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
