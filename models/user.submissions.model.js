const mongoose = require('mongoose')
// const {userSchema} = require("../models/users.model")

const UserSubmissionSchema = mongoose.Schema({
    score : {
        type : Number,
        required : true
    },
    correctAns : {
        type : Number,
        required : true
    },
    wrongAns: {
        type : Number,
        required : true
    },
    totalScore:{
        type : Number,
        required : true
    },
    quizId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Quizzes"
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users"
    }
})

const UserSubmission = mongoose.model('UserSubmission',UserSubmissionSchema)
module.exports = UserSubmission;