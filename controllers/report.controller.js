const successResponse = require("../helper/sendSuccessResponse");
const UserSubmission = require("../models/user.submissions.model")
const {User} = require("../models/users.model")
const AppError = require("../helper/AppError");
const Quiz = require("../models/quizzes.model");
const { default: mongoose } = require("mongoose");


const getResultByQuizId = async(req,res,next)=>{
  try{
    const{params:{id}} =req;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return next(
      new AppError({
        message: "Invalid ID",
        statusCode: 404,
      })
    );
    }

  let UserResults = await UserSubmission.find({quizId:id})
  let quizDetails = await Quiz.findById(id)
  let total = 0;
  let userStat = []
  for(ur of UserResults){
    let userStats = {}
    let user = await User.findById(ur.userId)
    userStats["username"] =  user.username
    userStats["ID"] =  ur._id
    userStats["score"] =  ur.score
    userStats["correctAns"] =  ur.correctAns
    userStats["wrongAns"] =  ur.wrongAns
    userStats["percentage"] =  (ur.score/ur.totalScore)*100
    total+=ur.score 
    userStat.push(userStats)
  }
  let statistic={}
  statistic['quizName'] = quizDetails.title
  statistic["averageScore"] = (total/UserResults.length)
  statistic["totalPoints"] = (UserResults[0].totalScore)
  statistic["totalAttempts"] = UserResults.length
  statistic["userStats"] = [...userStat]
return  successResponse(req, res, {
      statusCode: 200,
      message: "Quiz created successfully",
      payload: {...statistic},
    });
  }catch(err){
    return next(
       new AppError({
         message: "Internal server error",
         statusCode: 500,
       })
     );  
   }

}


module.exports = {getResultByQuizId};