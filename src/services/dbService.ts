
import { db } from '@/config/dbConfig';
import { collection, doc, getDocs, getDoc, addDoc, updateDoc, query, where, deleteDoc, Timestamp, setDoc } from 'firebase/firestore';
import { toast } from 'sonner';

// Firestore collection references
const usersCollection = collection(db, 'users');
const healthHistoryCollection = collection(db, 'healthHistory');
const healthAnalysisCollection = collection(db, 'analysis');

// User-related operations
export const getUserProfile = async (email: string) => {
  try {
    const q = query(usersCollection, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty ? null : querySnapshot.docs[0].data();
  } catch (error) {
    console.error('Failed to get user profile:', error);
    toast.error('Failed to load user profile');
    return null;
  }
};



export interface Analysis {
  id?: string;
  date: string;
  symptoms: string[];
  diagnosis: string;
  recommendations: string;
  severity?: "Low" | "Medium" | "High";
}

export const saveUserProfile = async (userData: any) => {
  try {
    const { email } = userData;
    if (!email) throw new Error('Email is required');

    const q = query(usersCollection, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0].ref;
      await updateDoc(userDoc, userData);
      return { id: userDoc.id, ...userData };
    } else {
      const docRef = await addDoc(usersCollection, userData);
      return { id: docRef.id, ...userData };
    }
  } catch (error) {
    console.error('Failed to save user profile:', error);
    toast.error('Failed to save user profile');
    return null;
  }
};

// Health history operations
export const getUserHealthHistory = async (userId: string): Promise<Analysis[]> => {
  try {
    const healthHistoryRef = collection(db, "healthHistory");
    const q = query(healthHistoryRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        date: data.date instanceof Timestamp ? data.date.toDate().toISOString() : data.date,
        symptoms: data.symptoms || [],
        diagnosis: data.diagnosis || "",
        recommendations: data.recommendations || "",
        severity: data.severity || "Medium",
      };
    });
  } catch (error) {
    console.error("Error fetching health history:", error);
    throw error;
  }
};

export const saveHealthAnalysis = async (userId: string, analysisData: any) => {
  try {
    const newAnalysis = {
      userId,
      date: new Date().toISOString(), // Store date in ISO format for consistency
      ...analysisData
    };

    await addDoc(healthAnalysisCollection, newAnalysis);

    return { id: userId, ...newAnalysis };
  } catch (error) {
    console.error("Failed to save health analysis:", error);
    toast.error("Failed to save health analysis");
    return null;
  }
};

// Recommendation system
export const getHealthRecommendations = async (userId: string) => {
  try {
    const q = query(healthHistoryCollection, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const historyObjects = querySnapshot.docs.map(doc => doc.data());

    if (historyObjects.length === 0) {
      return [{ title: 'Establish Health Baseline', status: 'Pending', recommendation: 'Complete your first symptom check.' }];
    }

    const symptomFrequency: Record<string, number> = {};
    historyObjects.flatMap(record => record.symptoms).forEach(symptom => {
      symptomFrequency[symptom] = (symptomFrequency[symptom] || 0) + 1;
    });
    
    const recommendations = [];
    const recurringSymptoms = Object.keys(symptomFrequency).filter(symptom => symptomFrequency[symptom] > 1);
    if (recurringSymptoms.length > 0) {
      recommendations.push({ title: 'Recurring Symptoms', status: 'Attention Needed', recommendation: `Consult a specialist about ${recurringSymptoms.join(', ')}.` });
    }

    const recentDiagnosis = historyObjects[0]?.diagnosis || 'Unknown Condition';
    recommendations.push({ title: 'Recent Diagnosis', status: 'Follow Up', recommendation: `Follow treatment for ${recentDiagnosis}.` });

    if (historyObjects.some(record => record.symptoms.includes('stress') || record.symptoms.includes('anxiety'))){
      recommendations.push({ title: 'Stress Management', status: 'Recommended', recommendation: 'Try meditation or deep breathing.' });
    }

    if (historyObjects.some(record => record.symptoms.includes('fatigue') || record.symptoms.includes('tired'))){
      recommendations.push({ title: 'Energy Levels', status: 'Monitor', recommendation: 'Ensure good sleep and hydration.' });
    }

    if (recommendations.length < 3) {
      recommendations.push({ title: 'Preventive Care', status: 'Recommended', recommendation: 'Schedule a general check-up.' });
    }

    return recommendations;
  } catch (error) {
    console.error('Failed to generate health recommendations:', error);
    return [{ title: 'Health Monitoring', status: 'Recommended', recommendation: 'Regular health check-ups are advised.' }];
  }
};

// Health status determination
export const calculateHealthStatus = async (userId: string) => {
  try {
    const q = query(healthHistoryCollection, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const historyObjects = querySnapshot.docs.map(doc => doc.data());

    if (historyObjects.length === 0) return 'No Data';
    
    const highSeverityCount = historyObjects.filter(record => record.severity === 'High').length;
    const mediumSeverityCount = historyObjects.filter(record => record.severity === 'Medium').length;

    if (highSeverityCount >= 2) return 'Needs Attention';
    if (highSeverityCount === 1 || mediumSeverityCount >= 2) return 'Monitor';
    return 'Good';
  } catch (error) {
    console.error('Failed to calculate health status:', error);
    return 'Unknown';
  }
};
