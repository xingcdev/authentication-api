import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import initiateMongoServer from './config/db.js';
// Import user router
import userRouter from './router/user.js';
import indexRouter from './router/index.js';

// Ihe port in .env file
const port = process.env.PORT;
const app = express();

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

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
app.use(indexRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));
