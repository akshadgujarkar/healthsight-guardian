
import mongoose, { model, Model, models, Schema }  from 'mongoose';


export interface IHealthHistory extends Document {
  userId: Schema.Types.ObjectId;
  date: Date;
  symptoms: string[];
  diagnosis?: string;
  recommendations?: string;
  severity: 'Low' | 'Medium' | 'High';
}


const HealthHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  symptoms: [{
    type: String
  }],
  diagnosis: {
    type: String
  },
  recommendations: {
    type: String
  },
  severity: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  }
});

const HealthHistory: Model<IHealthHistory> = models?.HealthHistory || model<IHealthHistory>('HealthHistory', HealthHistorySchema);

export default HealthHistory;