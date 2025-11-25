const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: ".env" });

const dbURL = process.env.DB_URL;

const connectDatabase = () => {
    mongoose.connect(dbURL, {
    }).then((response) => {
        console.log("database connected");
    });
};

module.exports = connectDatabase;