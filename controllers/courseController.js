const Course = require('../models/Course');
const User = require('../models/User');
const Review = require('../models/Review');


const createCourse = async (req, res) => {
  try {
    const { title, description, instructor } = req.body;
    const course = new Course({ title, description, instructor });
    const saved = await course.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la création du cours', error: err.message });
  }
};


const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};


const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id).populate('students');
    if (!course) return res.status(404).json({ message: 'Cours non trouvé' });
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// POST /api/courses/:courseId/enroll/:userId
const enrollUser = async (req, res) => {
  try {
    const { courseId, userId } = req.params; 
    const course = await Course.findById(courseId);
    const user = await User.findById(userId);
    if (!course) return res.status(404).json({ message: 'Cours non trouvé' });
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    // éviter doublons
    if (!course.students.includes(userId)) {
      course.students.push(userId);
      await course.save();
    }

    if (!user.courses.includes(courseId)) {
      user.courses.push(courseId);
      await user.save();
    }

    res.status(200).json({ message: 'Inscription effectuée', course, user });
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de l'inscription", error: err.message });
  }
};

// GET /api/courses/:courseId/students
const getCourseStudents = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate('students');
    if (!course) return res.status(404).json({ message: 'Cours non trouvé' });
    res.status(200).json(course.students);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// GET /api/courses/:courseId/reviews
const getCourseReviews = async (req, res) => {
  try {
    const { courseId } = req.params;
    const reviews = await Review.find({ course: courseId }).populate('user', 'username email');
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// POST /api/courses/:courseId/reviews
const addReview = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { userId, rating, comment = '' } = req.body; // userId provided in body (could also be param)
    // vérifier validité
    const course = await Course.findById(courseId);
    const user = await User.findById(userId);
    if (!course) return res.status(404).json({ message: 'Cours non trouvé' });
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    const review = new Review({ course: courseId, user: userId, rating, comment });
    const saved = await review.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de l\'ajout de la critique', error: err.message });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  enrollUser,
  getCourseStudents,
  addReview,
  getCourseReviews,
};
