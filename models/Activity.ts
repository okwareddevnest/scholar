import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['assignment', 'message', 'notification', 'grade', 'payment', 'system'],
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'in_progress'],
    default: 'pending',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  relatedUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  // For backward compatibility
  refModel: {
    type: String,
    enum: ['Assignment', 'Payment', 'Message', 'Review', null],
    default: null,
  },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add virtual properties for backward compatibility
activitySchema.virtual('relatedId')
  .get(function() {
    return this.relatedUserId;
  })
  .set(function(value) {
    this.relatedUserId = value;
  });

activitySchema.virtual('createdAt')
  .get(function() {
    return this.timestamp;
  })
  .set(function(value) {
    this.timestamp = value;
  });

// Add indexes for common queries
activitySchema.index({ userId: 1, timestamp: -1 });
activitySchema.index({ relatedUserId: 1, timestamp: -1 });
activitySchema.index({ type: 1 });

const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);

export default Activity; 