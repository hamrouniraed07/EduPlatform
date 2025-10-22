const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Le username est obligatoire'],
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: [true, "L'email est obligatoire"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Veuillez entrer un email valide'],
  },
  // Many to Many 
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
