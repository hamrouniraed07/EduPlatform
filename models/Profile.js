const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required'],
    unique: true, // one-to-one
  },
  bio: { type: String, default: '' },
  website: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.models.Profile || mongoose.model('Profile', profileSchema);
