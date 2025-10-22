const Profile = require('../models/Profile');
const User = require('../models/User');


const createProfile = async (req, res) => {
  try {
    const { userId } = req.params; 
    const { bio = '', website = '' } = req.body;


    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    // vérifier s'il n'a pas déjà de profil
    const existing = await Profile.findOne({ user: userId });
    if (existing) return res.status(400).json({ message: 'Profil déjà créé pour cet utilisateur' });

    const profile = new Profile({ user: userId, bio, website });
    const saved = await profile.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la création du profil', error: err.message });
  }
};


const getProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = await Profile.findOne({ user: userId }).populate('user');
    if (!profile) return res.status(404).json({ message: 'Profil non trouvé' });
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};


const updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body; 
    const profile = await Profile.findOneAndUpdate({ user: userId }, updates, { new: true, runValidators: true });
    if (!profile) return res.status(404).json({ message: 'Profil non trouvé' });
    res.status(200).json(profile);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour du profil', error: err.message });
  }
};

module.exports = { createProfile, getProfile, updateProfile };
