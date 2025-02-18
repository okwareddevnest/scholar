import mongoose from 'mongoose';

const performanceSchema = new mongoose.Schema({
  userId: {
    type: String,  // Changed from ObjectId to String for Kinde compatibility
    required: true,
    index: true,
  },
  date: {
    type: Date,
    required: true,
  },
  metrics: {
    assignmentsCompleted: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    onTimeCompletion: {
      type: Number, // percentage
      min: 0,
      max: 100,
      default: 0,
    },
    earnings: {
      type: Number,
      default: 0,
    },
    activeTime: {
      type: Number, // in minutes
      default: 0,
    },
  },
  tags: [{
    type: String,
    trim: true,
  }],
  notes: {
    type: String,
    trim: true,
  },
});

// Add compound index for user and date
performanceSchema.index({ userId: 1, date: -1 });

// Static method to calculate performance metrics for a date range
performanceSchema.statics.getPerformanceData = async function(userId: string, startDate: Date, endDate: Date) {
  return this.aggregate([
    {
      $match: {
        userId: userId,  // Changed from ObjectId conversion to direct string comparison
        date: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: {
        _id: null,
        totalAssignments: { $sum: '$metrics.assignmentsCompleted' },
        averageRating: { $avg: '$metrics.averageRating' },
        totalEarnings: { $sum: '$metrics.earnings' },
        averageOnTimeCompletion: { $avg: '$metrics.onTimeCompletion' },
      },
    },
  ]);
};

const Performance = mongoose.models.Performance || mongoose.model('Performance', performanceSchema);

export default Performance; 