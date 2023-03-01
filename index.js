const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const app = require("./app");
mongoose.set('strictQuery', true);
dotenv.config({ path: path.join(__dirname, "config.env") });
const {PORT,DB_URI} = process.env;

mongoose
  .connect(DB_URI)
  .then((connection) => {
    console.log("Connected to DB");
    app.listen(PORT,()=>{
        console.log("Server is listening")
    })
  })
  .catch((err) => {
    console.log("Error in DB")
  });
