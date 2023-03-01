const mongoose = require('mongoose')

const OptionSchema = mongoose.Schema({

    value : {
        type: String,
        required : true
    },
    isCorrect : {
        type : Boolean,
        default : false
    },
    isSubmitted : {
        type : Boolean,
        default : false
    }

})

module.exports = {OptionSchema};