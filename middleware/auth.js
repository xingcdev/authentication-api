const jwt = require('jsonwebtoken');
const User = require('../model/User');
const UserModel = require('../model/User');

// Check if a user is authorized to access the server resources
const auth = async function (req, res, next) {
	// Get the token from the request header
	const token = req.header('authorization').replace('Bearer ', '');
	// Check if the received token was created using our JWT_KEY
	// Return the payload that was used to create the token
	const data = jwt.verify(token, process.env.JWT_KEY);
	try {
		const foundUser = await User.findOne({
			_id: data._id,
			'tokens.token': token,
		});

		if (!foundUser) {
			throw new Error();
		}
		// Attach the found user on our request
		req.user = foundUser;
		req.token = token;
		next();
	} catch (error) {
		res.status(401).send({ error: 'Not authorized to access this resource' });
		console.log(error);
	}
};

module.exports = auth;
