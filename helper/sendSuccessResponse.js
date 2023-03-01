const successResponse = (req,res,config)=>{
    const {statusCode,message,payload} = config;
    res.status(statusCode || 200).json({
        message : message,
        data : payload 
    })
}

module.exports = successResponse;