import express from 'express';
import initiateMongoServer from './config/db.js';
// Import user router
import authRoute from './router/user.js';
import dotenv from 'dotenv';
dotenv.config();
// Ihe port in .env file
const port = process.env.PORT;
const app = express();

// Initiate Mongo server
initiateMongoServer();

// Middleware
app.use(express.json());

app.get('/', (req, res) => {
	res.send('hello');
});

// User router contains routes related to user
app.use(authRoute);

app.listen(port, () => console.log(`Server is running on port ${port}`));
