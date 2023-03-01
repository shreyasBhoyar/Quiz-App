const sendErrorResponse = (error,req,res,next)=>{
    res.status(error.statusCode).json({
        message: error.message
      });
}

module.exports = sendErrorResponse;