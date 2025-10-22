const User = require('../models/User');
const Profile = require('../models/Profile');


const createUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = new User({ username, email });
    const saved = await user.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de la création de l'utilisateur.", error: err.message });
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('courses');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs.", error: err.message });
  }
};


const getUserById = async (req, res) => {
  try {
    const { id } = req.params; 
    const user = await User.findById(id).populate('courses');
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};


const getUserCourses = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('courses');
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.status(200).json(user.courses);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserCourses,
};
