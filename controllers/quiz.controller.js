const successResponse = require("../helper/sendSuccessResponse");
const Quiz = require("../models/quizzes.model");
const AppError = require("../helper/AppError");
const { default: mongoose } = require("mongoose");

const getAllQuizzes = async (req, res, next) => {
  try{
  const quizzes = await Quiz.find();
    return successResponse(req, res, {
      statusCode: 200,
      message: "Quiz fetched successfully",
      payload: [...quizzes],
    });
  }catch(err){
  next(
    new AppError({
      message: "Internal server error",
      statusCode: 500,
    })
  );
  }
};

const createQuiz = async (req, res, next) => {
  try{
  let data = req.body;
  let newQuiz = new Quiz(data);
  newQuiz = await newQuiz.save();
  successResponse(req, res, {
    statusCode: 200,
    message: "Quiz created successfully",
    payload: newQuiz,
  });
  }catch(err){
   return next(
      new AppError({
        message: "Internal server error",
        statusCode: 500,
      })
    );  
  }
};

  const getQuizById = async(req,res,next)=>{
    const {
      params: { id },
    } = req;
    if(!mongoose.Types.ObjectId.isValid(id)){
      return next(  
        new AppError({
          message: "Invalid ID",
          statusCode: 404,
        })
      );
    }

    const quiz = await Quiz.findById(id);
    if(quiz){
      return successResponse(req, res, {
        statusCode: 200,
        message: "Quiz found",
        payload: quiz,
      });
      
    }else{
      return next(
        new AppError({
          message: "Quiz not found",
          statusCode: 404,
        })
      );  
    }
  }


const EditQuiz = async(req,res,next)=>{
  try{
  const id = req.params.id;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return next(
      new AppError({
        message: "Invalid ID",
        statusCode: 404,
      })
    );
  }
  const data = req.body
  console.log(data)
  Quiz.findByIdAndUpdate(id,data,(err,resp)=>{
    if(err) {      return next(
      new AppError({
        message: "Quiz not found",
        statusCode: 404,
      })
    );  }
    else{
      return successResponse(req, res, {
        statusCode: 200,
        message: "Quiz updated successfully",
        payload: {...data},
      });
    }
  })
  }catch(error){
    return next(
      new AppError({
        message: "Unable to edit quiz",
        statusCode: 500,
      })
    );  
  }
}
  
module.exports = { getAllQuizzes, createQuiz, getQuizById,EditQuiz };
