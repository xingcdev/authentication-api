const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const initiateMongoServer = require('./config/db');

const app = express();

// Import user routes
const userRoutes = require('./routes/user');

// Initiate Mongo server
initiateMongoServer();

// Middleware
app.use(bodyParser.json());

// Route to render HTML Page 
// see: https://codehandbook.org/how-to-render-html-page-in-express/
app.get('/', (req, res) => {
    res.sendFile( 'client/index.html', {
        // gives the current path of the running script
        root: path.join(__dirname, './')
    } );
});

// wow route
app.get('/wow', (req, res) => {
    res.send('wow!');
});

// User router contains routes related to user
app.use('/api/auth', userRoutes);

// Port
const PORT = process.env.PORT || 4000;

app.listen(PORT, (req, res) => console.log('Server is runnning at ' + PORT));