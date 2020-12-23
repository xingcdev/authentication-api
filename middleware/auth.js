const jwt = require('jsonwebtoken');
const User = require('../model/User');
const UserModel = require('../model/User');

const auth = async function (req, res, next) {
	// Get the token from the request header
	console.log(req.headers);
	const token = req.header('Authorization').replace('Bearer', '');
	// check if the received token was created using our JWT_KEY
	const data = jwt.verify(token, process.env.JWT_KEY);
	try {
		const foundUser = await User.findOne({
			_id: data._id,
			'tokens.token': token,
		});
		if (!foundUser) {
			throw new Error();
		}
		next();
	} catch (error) {
		console.log(error);
	}
};

module.exports = auth;
