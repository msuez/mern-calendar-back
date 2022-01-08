
const mongoose = require('mongoose');

const {
    MONGO_URL
} = process.env;

const connectDB = async() => {
    try {

        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`Database online.`);

    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    connectDB
}