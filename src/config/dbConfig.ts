import mongoose from 'mongoose';

const MONGO_URI: string ='mongodb://localhost:27017/healthAssistant';

let isConnected = false; // Track the connection status

export const connectDB = async (): Promise<void> => {
  if (isConnected) {
    console.log('✅ Already connected to MongoDB');
    return;
  }

  try {
    const db = await mongoose.connect(MONGO_URI);

    isConnected = db.connection.readyState === 1; // 1 means connected
    console.log('✅ MongoDB Connected:', db.connection.host);
  } catch (error) {
    console.error('❌ MongoDB connection error:', (error as Error).message);
    throw new Error('Database connection failed');
  }
};
