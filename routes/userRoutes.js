const express = require('express');
const router = express.Router();
const {createUser, getAllUsers, getUserById, getUserCourses} = require('../controllers/userController');

const { createProfile, getProfile, updateProfile } = require('../controllers/profileController');

// Users
router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);

// User courses
router.get('/:userId/courses', getUserCourses);

// Profile (1-to-1)
router.post('/:userId/profile', createProfile);
router.get('/:userId/profile', getProfile);
router.put('/:userId/profile', updateProfile);

module.exports = router;
