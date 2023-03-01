const mongoose = require("mongoose")
const {questionSchema} = require("../models/questions.model")

const quizSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique : true
    },
    description : {
        type : String,
        required : true
    },
    questions : [questionSchema]
})


const Quiz = mongoose.model('Quiz',quizSchema);
module.exports = Quiz;