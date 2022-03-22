const sendToken = (user, statusCode, res, req) => {
      const token = user.getJWTToken()
      req.session.token = token
      res.status(statusCode).json({
            success: true,
            user,
            token,
      });
};
module.exports = sendToken;