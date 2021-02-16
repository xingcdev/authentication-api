import mongoose from 'mongoose';

const mongoUrl = 'mongodb://localhost:27017/test';

// Connect to the database
const initiateMongoServer = async () => {
	try {
		await mongoose.connect(mongoUrl, {
			// Avoid deprecation warnings in MongoDB driver
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
		});
		console.log('Connected to the Database!');
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export default initiateMongoServer;
