const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Le titre est obligatoire'],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'La description est obligatoire'],
  },
  instructor: {
    type: String,
    required: [true, "L'instructeur est obligatoire"],
  },
  // students many-to-many -> User
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
}, { timestamps: true });

module.exports = mongoose.models.Course || mongoose.model('Course', courseSchema);
