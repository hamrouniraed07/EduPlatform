const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: [1, 'Rating minimum 1'],
    max: [5, 'Rating maximum 5'],
  },
  comment: { type: String, default: '' },
  // One To Many
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.models.Review || mongoose.model('Review', reviewSchema);
