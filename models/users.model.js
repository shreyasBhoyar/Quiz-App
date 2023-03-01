const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    quizAttempted :[
       { type: mongoose.Types.ObjectId,
        unique: true
    }
       
    ]
})

const User = mongoose.model('User',userSchema);
module.exports = {User,userSchema};