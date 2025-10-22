const Review = require('../models/Review');
const Course = require('../models/Course');
const User = require('../models/User');


const addReview = async (req, res) => {
  try {
    const { courseId } = req.params;       
    const { userId, rating, comment = '' } = req.body; 

   
    if (!userId) return res.status(400).json({ message: 'userId is required in body' });
    if (rating === undefined || rating === null) {
      return res.status(400).json({ message: 'rating is required in body' });
    }

    const parsedRating = Number(rating);
    if (Number.isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      return res.status(400).json({ message: 'rating must be a number between 1 and 5' });
    }

    // Vérifier existence course et user
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Cours non trouvé' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });


    const review = new Review({
      course: courseId,
      user: userId,
      rating: parsedRating,
      comment,
    });

    const savedReview = await review.save();

    return res.status(201).json(savedReview);
  } catch (err) {
    return res.status(500).json({ message: "Erreur lors de l'ajout de la critique", error: err.message });
  }
};


const getCourseReviews = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Vérifier que le cours existe (optionnel mais utile)
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Cours non trouvé' });

    const reviews = await Review.find({ course: courseId }).populate('user', 'username email').sort({ createdAt: -1 });

    return res.status(200).json(reviews);
  } catch (err) {
    return res.status(500).json({ message: "Erreur lors de la récupération des critiques", error: err.message });
  }
};

module.exports = {
  addReview,
  getCourseReviews,
};
