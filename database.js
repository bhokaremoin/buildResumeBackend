const mongoose = require("mongoose");
// const mongoURL = process.env.MONGODB_URL;
const mongoURL =
  "mongodb+srv://bhokaremoin:buildResume01@cluster0.mvggaj5.mongodb.net/?retryWrites=true&w=majority";

const mongoDB = async () => {
  await mongoose.connect(
    mongoURL,
    { useNewUrlParser: true },
    async (err, result) => {
      if (err) {
        console.log("!!!!! ERROR !!!!!");
        console.log(err);
      } else {
        console.log("Database Connected Successfully !!");
      }
    }
  );
};
module.exports = mongoDB;
