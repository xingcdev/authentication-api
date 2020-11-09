const express = require('express');
const { check, validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const router = express.Router();

// Import user controller
const userController = require('../controllers/userController');

/**
 * @method - POST
 * @param - /signup
 * @description - User Signup
 */
router.post('/signup', userController.signup);

router.post('/login', userController.login);

module.exports = router;
