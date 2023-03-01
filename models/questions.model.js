const mongoose = require('mongoose')
const {OptionSchema} = require("../models/options.model")

const questionSchema = mongoose.Schema({
    title : {
        type: String,
        required : true
    },
    points : {
        type : Number,
        default : 5
    },
    options : [OptionSchema],
    isMultipleCorrect : {
        type : Boolean,
        default : false
    }
})

// const Question = mongoose.model('Question',questionSchema)
module.exports = {questionSchema};