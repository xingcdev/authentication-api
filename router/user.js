const express = require('express');
const UserModel = require('../model/User');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// Route to create a new user
router.post('/users', async function (req, res) {
	try {
		const newUser = new UserModel(req.body);
		await newUser.save();
		const token = await newUser.generateAuthToken();
		res.status(201).send({ newUser, token });
	} catch (error) {
		res.status(400).send(error);
	}
});

router.post('/users/login', async function (req, res) {
	// Login a registered user
	try {
		const { email, password } = req.body;
		const foundUser = await UserModel.findByCredentials(email, password);
		if (!foundUser) {
			// "unauthorized" error
			return res.status(401).send({ error: 'Login failed.' });
		}
		const token = await foundUser.generateAuthToken();
		res.send({ foundUser, token });
	} catch (error) {
		console.log(error);
		res.status(400).send(error);
	}
});

router.get('/users/me', authMiddleware, async function (req, res) {
	res.send(req);
});

module.exports = router;
