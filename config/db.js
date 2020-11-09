const mongoose = require('mongoose');

const mongoUrl = "mongodb://localhost:27017/test"

// Connect to the database
const initiateMongoServer = async () => {
    try {
        await mongoose.connect(mongoUrl, {
            useNewUrlParser: true
        });
        console.log('Connected to the Database!');
    } catch(error) {
        console.log(error);
        throw error;
    }
};

module.exports = initiateMongoServer;