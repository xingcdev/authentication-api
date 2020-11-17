const userModel = require('../model/User');
const bcrypt = require('bcrypt');
const User = require('../model/User');
const jsonWebToken = require('jsonwebtoken')

exports.signup = (req, res) => {
    
    console.log(req.body);

    // Hash the password 10 times
    bcrypt.hash(req.body.password, 10)
    .then( hash => {
        console.log('then')
        // Create a new user with the hashed password 
        const user = new User( {
            username: req.body.username,
            email: req.body.email,
            password: hash
        } );

        // Save the created user in the Database
        user.save()
        .then( () => res.status(201).json( {message: 'User created!'} ) )
        // When the user does not filled all the fields
        .catch( error => res.status(400).json( {error} ) );
    })

    // When the user has no password
    .catch( error => res.status(500).json( {error} ) );
};

exports.login = (req, res) => {

    // Try to find a user with the same email
    User.findOne( { email: req.body.email } ) // Return a promise or null
    // The param "user" is a json object
    .then( user => {
        // If we didn't found the user with same user
        // If user === null
        if (!user) return res.status(401).json( {error : 'User not found'} )
        
        // Compare the password
        bcrypt.compare(req.body.password, user.password)
        .then( valid => {
            // If we didn't found the user with same password
            // valid === false
            // Return 401 Unauthorized error
            if (!valid) return res.status(401).json( {error : 'Incorrect password'} )

            // valid ==== true
            // Send the user id and the token to the frontend
            res.status(200).json( {
                userId: user._id,
                // Create a Json web token
                token: jsonWebToken.sign(
                    // The Token's payload
                    { userId: user._id },
                    // Random string key
                    'RANDOM_STRING',
                    // Token expires in 24h
                    { expiresIn: '24h' }
                )
            } )

        } )
        // Server connection issue
        .catch( error => res.status(500).json( {error} ) );
        

    })
    // Server connection issue
    .catch( error => res.status(500).json( {error} ) );
};