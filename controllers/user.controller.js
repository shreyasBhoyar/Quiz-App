const successResponse = require("../helper/sendSuccessResponse");
const { User } = require("../models/users.model");
const AppError = require("../helper/AppError");
const Quiz = require("../models/quizzes.model");
const UserSubmission = require("../models/user.submissions.model");
const { default: mongoose } = require("mongoose");


const getResultById = async (req, res, next) => {
  const {
    params: { id },
  } = req;
    
  console.log(" id " , id)
  console.log("is valid " , mongoose.Types.ObjectId.isValid(id))

  if(!mongoose.Types.ObjectId.isValid(id)){
    return next(
      new AppError({
        message: "Invalid ID",
        statusCode: 404,
      })
    );
    }

  try {
    // Find the user submission result by ID
    const result = await UserSubmission.findById(id);
    
    if (!result) {
      // If the result is not found, return a 404 error response
      return next(
        new AppError({
          message: "Result not found",
          statusCode: 404,
        })
      );
    }
    
    // Find the quiz data by ID
    const quiz = await Quiz.findById(result.quizId);
    
    if (!quiz) {
      // If the quiz is not found, return a 404 error response
      return next(
        new AppError({
          message: "Result not found",
          statusCode: 404,
        })
      );
    }
    
    // Return a success response with the result and quiz data
    return successResponse(req, res, {
      statusCode: 200,
      message: "Result found",
      payload:{
        result: result,
        quiz: quiz,
      }
    });
  } catch (err) {
    // If there was an error, return a 500 error response
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return successResponse(req, res, {
      statusCode: 200,
      message: "Quiz fetched successfully",
      payload: [...users],
    });
  } catch (err) {
    next(
      new AppError({
        message: "Internal server error",
        statusCode: 500,
      })
    );
  }
};

const verifyUser = async (req, res, next) => {
  let username = req.body.username;
  let user = await User.find({ username: username })
  if (user.length > 0) {
    return successResponse(req, res, {
      statusCode: 200,
      message: "User exists",
      payload: user[0],
    });
  } else {
    return next();
  }
}

const createUser = async (req, res, next) => {

  try {
    let data = req.body;
    let newUser = new User(data);
    newUser = await newUser.save();

    return successResponse(req, res, {
      statusCode: 200,
      message: "User created successfully",
      payload: newUser,
    });
  } catch (err) {
    return next(
      new AppError({
        message: "Internal server error",
        statusCode: 500,
      })
    );
  }
};

const removeCorrectOptions = async (req, res, next) => {
  const {
    params: { quizId },
  } = req;

  if(!mongoose.Types.ObjectId.isValid(quizId)){
    return next(
      new AppError({
        message: "Invalid ID",
        statusCode: 404,
      })
    );
  }
  const quiz = await Quiz.findById(quizId);
  let questions = quiz.questions;
  questions.forEach((el) => {
    el.options.forEach((option) => {
     option.isCorrect=false;
    })
  })

  quiz.questions = questions
  req.body.quiz = quiz;
  return next();
}

const quizForUser = async (req, res, next) => {
  let quizForUsers = req.body.quiz._doc;
  return successResponse(req, res, {
    statusCode: 200,
    message: "Quiz found",
    payload: { ...quizForUsers },
  });
}

const addAttemptedQuizToUser = async (req, res, next) => {
  let userQuiz = req.body
  let user = await User.findById(userQuiz.userId);
  if (user) {
      user.quizAttempted.push(userQuiz.quizId)
      User.findByIdAndUpdate(userQuiz.userId, user)
        .then((resp) => {
          return successResponse(req, res, {
            statusCode: 200,
            message: "User submission added",
            payload: { 
              user: {...user},
              userSubmission:{...userQuiz.userSubmission}
            }
          })
        }).catch((err) => {
          return next(
            new AppError({
              message: "Internal server error",
              statusCode: 500,
            })
          );
        })
  } else {
    return next(
      new AppError({
        message: "User not found",
        statusCode: 404,
      })
    );
  }


}
const submitQuiz = async (req, res, next) => {
  try {
    const {
      params: { quizId,userId }
    } = req;
    if(!mongoose.Types.ObjectId.isValid(quizId)){
      return next(
        new AppError({
          message: "Invalid ID",
          statusCode: 404,
        })
      );
    }

    if(!mongoose.Types.ObjectId.isValid(userId)){
      return next(
        new AppError({
          message: "Invalid ID",
          statusCode: 404,
        })
      );
    }
    let quizData = await Quiz.findById(quizId);
    let userQuiz = req.body;
    let correctAns = 0;
    let wrongAns = 0;
    let totalScore = 0;
    let score = 0;
    let existingUserSubmission=await UserSubmission.find({quizId:quizId,userId:userId})
    if (quizData && existingUserSubmission.length===0) {
      for (let i = 0; i < quizData.questions.length; i++) {
        totalScore = totalScore + quizData.questions[i].points;
        let flag = 0;
        for (let j = 0; j < 4; j++) {
          if (quizData.questions[i].options[j].isCorrect !== userQuiz.questions[i].options[j].isSubmitted) {
            flag = 1;
          }
        }
        if (flag === 0) {
          correctAns = correctAns + 1;
          score = score + quizData.questions[i].points;
        } else {
          wrongAns = wrongAns + 1;
        }
      }

      const userSubmission = {
        score: score,
        correctAns: correctAns,
        wrongAns: wrongAns,
        totalScore: totalScore,
        quizId: quizId,
        userId: userId
      }
      let newUserSubmission = new UserSubmission(userSubmission);
      newUserSubmission = await newUserSubmission.save()
      req.body.userSubmission=newUserSubmission;

    } else {
      if(!quizData){
        return next(
          new AppError({
            message: "Quiz not found",
            statusCode: 404,
          })
        );
      }else if(existingUserSubmission.length>0){
        return next(
          new AppError({
            message: "User has already attempted the quiz",
            statusCode: 404,
          })
        );
      } 
    }
  } catch (err) {
    return next(
      new AppError({
        message: "Internal server error",
        statusCode: 500,
      })
    );
  }
  return next();
}




module.exports = {getResultById, getAllUsers,verifyUser, createUser, removeCorrectOptions, quizForUser, submitQuiz, addAttemptedQuizToUser };
