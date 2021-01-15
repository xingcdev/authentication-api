const express = require('express');
const initiateMongoServer = require('./config/db');
// Import user router
const userRouter = require('./router/user');

// Ihe port in .env file
const port = process.env.PORT;

const app = express();

// Initiate Mongo server
initiateMongoServer();

// Middleware
app.use(express.json());

// Route to render HTML Page
// see: https://codehandbook.org/how-to-render-html-page-in-express/
// app.get("/", (req, res) => {
// 	res.sendFile("client/index.html", {
// 		// gives the current path of the running script
// 		root: path.join(__dirname, "./"),
// 	});
// });

// User router contains routes related to user
app.use(userRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));
