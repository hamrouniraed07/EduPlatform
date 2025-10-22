const express = require('express');
const router = express.Router();
const {createCourse, getAllCourses, getCourseById, enrollUser, getCourseStudents, addReview, getCourseReviews,} = require('../controllers/courseController');

router.post('/', createCourse);
router.get('/', getAllCourses);
router.get('/:id', getCourseById);


router.post('/:courseId/enroll/:userId', enrollUser);


router.get('/:courseId/students', getCourseStudents);


router.post('/:courseId/reviews', addReview); 
router.get('/:courseId/reviews', getCourseReviews);

module.exports = router;
