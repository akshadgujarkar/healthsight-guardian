import mongoose from 'mongoose';

const MONGODB_URI: string = 'mongodb://localhost:27017/healthAssistant';

let isConnected: boolean = false; // Prevent multiple connections

export const connectDB = async (): Promise<void> => {
  if (isConnected) {
    console.log('✅ Using existing database connection');
    return;
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);

    isConnected = true;
    console.log(`🚀 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Database Connection Failed: ${(error as Error).message}`);
    process.exit(1); // Exit process if connection fails
  }
};
