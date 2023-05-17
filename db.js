const mongoose = require('mongoose');
// const url = 'mongodb://localhost:27017/QuickNotes'; // Local Database
const url = 'mongodb+srv://QuickNotes:QuickNotes@cluster0.tqsyoso.mongodb.net/QuickNotes'; // Cloud Database

const connectToMongo = () => {
    try {
        mongoose.set('strictQuery', true);
        mongoose.connect(url);
        // console.log('Mongo DB connected!');
        console.log("%c Mongo DB 🚙 Connected", "color:blue; font-size:50px");
    } catch (err) {
        console.log(error)
        process.exit()
    }
};


module.exports = connectToMongo;
