const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/QuickNotes';

const connectToMongo = () => {
    try {
        mongoose.set('strictQuery', true);
        mongoose.connect(url);
        console.log('Mongo connected');
    } catch (err) {
        console.log(error)
        process.exit()
    }
};


module.exports = connectToMongo;
