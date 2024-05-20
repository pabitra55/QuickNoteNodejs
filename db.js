const mongoose = require("mongoose");
// const url = "mongodb://localhost:27017/VividTechHubDB"; // Local Database
const url = 'mongodb+srv://pabitrakumarnahak22:gQ6LIKgTsZn3mIab@vivid-tech-hub-db.8czxlhn.mongodb.net/'; // Cloud Database

const connectToMongo = () => {
  try {
    mongoose.set("strictQuery", true);
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // console.log('Mongo DB connected!');
    console.log("%c Mongo DB 🚙 Connected", "color:blue; font-size:50px");
  } catch (err) {
    console.log(error);
    process.exit();
  }
};

module.exports = connectToMongo;
