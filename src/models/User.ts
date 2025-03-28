import { Schema, model, models, Model, Document } from 'mongoose';

// Define User interface
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dob?: Date;
  gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  medicalHistory?: string;
  emergencyContact?: string;
  createdAt?: Date;
}

// Define User schema
const UserSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  dob: { type: Date },
  gender: { type: String, enum: ['male', 'female', 'other', 'prefer-not-to-say'] },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  medicalHistory: { type: String },
  emergencyContact: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Ensure model is not redefined in Next.js environments
const User: Model<IUser> = models?.User || model<IUser>('User', UserSchema);

export default User;
