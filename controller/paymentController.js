const catchAsyncError = require("../middleware/catchAsyncError")
const uuid = require("uuid")
const stripe = require("stripe")('sk_test_51KEojrSGnScXNqhfpWdJPi3Z9pWJCSJqkByxxPKYlGs1IDfKZXT3ojreQsbVclzntSrSvPVpIUV6bPhr7LLVB9Rc00pZYf1ALo')

exports.sendStripeApiKey = catchAsyncError(async (req, res, next) => {
      await res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});