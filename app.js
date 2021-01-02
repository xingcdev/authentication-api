const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const initiateMongoServer = require('./config/db');
// Import user router
const userRouter = require('./router/user');
const expressLayouts = require('express-ejs-layouts');

// Ihe port in .env file
const port = process.env.PORT;

const app = express();

// EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Access email & password html form variable from the request body
app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
	res.render('index', { name: 'Xing' });
});

app.get('/login', function (req, res) {
	res.render('login');
});

app.get('/register', function (req, res) {
	res.render('register');
});

app.get('/dashboard', function (req, res) {
	res.render('dashboard');
});

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
