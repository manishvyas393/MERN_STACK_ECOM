const paymentAuth = (req, res, next) => {
      console.log(req.session)
      const {Token}=req.cookies
      console.log(Token)
      if (!Token) {
            res.json({
                  msg: "login in"
            })
      }
      else {
           return next()
      }
}
module.exports=paymentAuth