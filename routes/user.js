const express = require('express');
const { check, validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const router = express.Router();

// Import the User model
const User = require('../model/User');

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

 router.post(
     '/signup',
     
 );

 router.get('/login', function (req, res) {
    res.send('Birds home page')
  });

 module.exports = router;
