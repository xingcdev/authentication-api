import express from 'express';
import UserModel from '../model/User.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();
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
		console.log(email, password);
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
	res.send(req.user);
});

// Log user out of the application
router.post('/users/me/logout', authMiddleware, async function (req, res) {
	try {
		// Remove the token that was used to log in
		req.user.tokens = req.user.tokens.filter(function (token) {
			// Return a new array that contains any other tokens apart from the one that was used to log in
			return token.token != req.token;
		});
		await req.user.save();
		res.send({ error: 'Successful logout.' });
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
});

// Log user out of all devices
router.post('/users/me/logoutall', authMiddleware, async function (req, res) {
	try {
		// Remove the token that was used to log in
		// Clear all tokens from index 0
		req.user.tokens.splice(0, req.user.tokens.length);
		await req.user.save();
		res.send({ error: 'Successful logout on all devices.' });
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
});

export default router;
