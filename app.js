const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// Route to render HTML Page 
// see: https://codehandbook.org/how-to-render-html-page-in-express/

app.get('/home', (req, res) => {
    res.sendFile( 'client/index.html', {
        // gives the current path of the running script
        root: path.join(__dirname, './')
    } );
});

// Middlewares
app.post('api/stuff', (req, res) => {
    console.log(req.body);
    res.status(201).json({
        message: 'Objet crée!'
    })
});

module.exports = app;