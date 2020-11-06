const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = mongoose.Schema( {

    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
} );

// Users cannot have same email
UserSchema.plugin(uniqueValidator);

// Export the model user with UserSchema
module.exports = mongoose.model('User', UserSchema)