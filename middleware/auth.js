import jwt from 'jsonwebtoken';
import User from '../model/User.js';

// Check if a user is authorized to access the server resources
const auth = async function (req, res, next) {
	try {
		const token = req.header('authorization').replace('Bearer ', '');
		// Check if the received token was created using our JWT_KEY
		const data = jwt.verify(token, process.env.JWT_KEY);

		const foundUser = await User.findOne({
			_id: data._id,
			token: token,
		});

		if (!foundUser) throw new Error('The user is not found.');

		// Attach the found user on our request
		req.user = foundUser;
		req.token = token;
		next();
	} catch (error) {
		res
			.status(401)
			.send({ error: 'You are not authorized to access to this resource.' });
		console.error(error);
	}
};

export default auth;
