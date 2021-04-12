import mongoose from 'mongoose';

// Connect to the database
const initiateMongoServer = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URL, {
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
