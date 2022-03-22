const errorHandler = require("../utils/errorHandler")
const jwt = require("jsonwebtoken")
const User=require("../models/userModel")
exports.isAuthenticatedUser = async (req, res, next) => {
      console.log(req.session)
      const { token } = req.session
      if (!token) {
            return next(new errorHandler("please login to acess this",401))
      }
      const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decodeToken.id)
      next()
}
exports.authorizedRoles = (...roles) => {
      return (req, res, next) => {
            console.log(req.user,"u")
            if (!roles.includes(req.user.role)) {
                  return next(new errorHandler(
                        `Role:${req.user.role} is not allowed to access this resource`,403
                  ))
            }
            next()
      }
}