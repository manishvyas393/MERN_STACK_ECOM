const express = require("express");
const catchAsyncError=require("../middleware/catchAsyncError")
const stripe = require("stripe")('sk_test_51KEojrSGnScXNqhfpWdJPi3Z9pWJCSJqkByxxPKYlGs1IDfKZXT3ojreQsbVclzntSrSvPVpIUV6bPhr7LLVB9Rc00pZYf1ALo')
const {
      processPayment,
      sendStripeApiKey,
} = require("../controller/paymentController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");
const paymentAuth  = require("../middleware/paymentauth");

router.post("/payment/process",paymentAuth,async(req, res, next) => {
      const { amount, id } = req.body
      const payment = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'inr',
            payment_method_types: ['card'],
      });
      console.log(payment);
      res.status(200).json({
            client_secret: payment['client_secret']
      })
})

router.get("/stripeapikey",isAuthenticatedUser, sendStripeApiKey);

module.exports = router;