import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';

const UserSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		isValidate: function (value) {
			if (!validator.isEmail(value)) {
				throw new Error({ error: 'Invalid Email address' });
			}
		},
	},
	password: {
		type: String,
		required: true,
		minLength: 7,
	},
	// Useful to enable a user to be logged in on different devices
	tokens: [{ token: { type: String, required: true } }],
});

// Apply the uniqueValidator plugin to userSchema.
UserSchema.plugin(uniqueValidator);

// Hash the password if it’s modified
UserSchema.pre('save', async function (next) {
	const currentUser = this;
	if (currentUser.isModified('password')) {
		currentUser.password = await bcrypt.hash(currentUser.password, 8);
	}
	next();
});

UserSchema.methods.generateAuthToken = async function () {
	const currentUser = this;
	const token = jwt.sign({ _id: currentUser._id }, process.env.JWT_KEY);
	// Add the new token into the list of token of the user
	currentUser.tokens = currentUser.tokens.concat({ token });
	await currentUser.save();
	return token;
};

UserSchema.statics.findByCredentials = async function (email, password) {
	// Search for a user by email and password
	const foundUser = await this.findOne({ email: email });
	if (!foundUser) {
		throw new Error({ error: 'Login not found' });
	}

	const isPasswordMatch = await bcrypt.compare(password, foundUser.password);
	if (!isPasswordMatch) {
		throw new Error({ error: 'Password not found' });
	}

	return foundUser;
};

// Export the model user with UserSchema
export default mongoose.model('User', UserSchema);
