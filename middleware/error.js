
const ErrorHandler = require("../utils/errorHandler")
module.exports = (err, req, res, next) => {
      err.statusCode = err.statusCode || 500;
      err.message = err.message || "internal server error"
      //mongo errors
      if (err.name === "CastError") {
            const message = `resource not found.invalid:${err.path}`;
            err = new ErrorHandler(message, 400)
      }
      if (err.code === 11000) {
            const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
            err = new ErrorHandler(message, 400)
      }
      if (err.code === "JsonWebTokenError") {
            const message = `json web token is invalid,try again`
            err = new ErrorHandler(message, 400)
      }
      if (err.code === "TokenExpiredError") {
            const message = `json web token is Expired,try again`
            err = new ErrorHandler(message, 400)
      }
      res.status(err.statusCode).json({
            success: false,
            error: err.captureStackTrace,

      })
}