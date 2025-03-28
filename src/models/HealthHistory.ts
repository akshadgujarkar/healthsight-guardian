
import mongoose from 'mongoose';

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

export default mongoose.models.HealthHistory || mongoose.model('HealthHistory', HealthHistorySchema);
