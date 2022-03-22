const errorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError")
const User = require("../models/userModel")
const sendToken = require("../utils/sendToken")
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")
const bcrypt = require("bcryptjs")
const cloudinary = require("cloudinary").v2

exports.registerUser = catchAsyncError(async (req, res, next) => {
      let file = req.files.avatar
      console.log(file)
      const myCloud = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "avatar",
            width: 150,
            crop: "scale",
      }, function (err, result) {
            console.log(err)
            console.log(result)
      });
      console.log(myCloud)
      const { name, email, password, } = req.body

      const user = new User({
            name,
            email,
            password,
            avatar: {
                  public_id: myCloud.public_id,
                  url: myCloud.secure_url,
            },
      })
      user.save().then(() => sendToken(user, 201, res,req))


});
exports.loginUser = catchAsyncError(async (req, res, next) => {
      const { email, password } = req.body
      if (!email || !password) {
            return next(new errorHandler("please enter email & password", 400))
      }
      const user = await User.findOne({ email }).select("+password")
      if (!user) {
            return next(new errorHandler("invalid credentials", 401))
      }
      bcrypt.compare(password.toString(), user.password, (err, isMatch) => {
            if (err) throw err
            if (isMatch) {
                  req.session.user=user
                  sendToken(user, 200, res, req)

            }
            else {
                  return next(new errorHandler("User not found", 404));
            }
      })
})

exports.logoutUser = catchAsyncError(async (req, res, next) => {
      req.session.destroy()
      res.status(200).clearCookie("Token").json({
            success: true,
            message: "loggged out"
      })
})
// Forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
      const user = await User.findOne({ email: req.body.email });
      console.log(user)
      if (!user) {
            return next(new errorHandler("User not found", 404));
      }

      // Get ResetPassword Token
      const resetToken = user.getResetPasswordToken();
      await user.save({ validateBeforeSave: false })

      const resetPasswordUrl = `http://localhost:3001/password/reset/${resetToken}`;
      const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
      try {
            await sendEmail({
                  email: user.email,
                  subject: `Ecommerce Password Recovery`,
                  message,
            });
            res.status(200).json({
                  success: true,
                  message: `Email sent to ${user.email} successfully`,
            });
      } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false });
            return next(new errorHandler(error.message, 500));
      }
});

// Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
      // creating token hash
      const resetPasswordToken = crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex");

      const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
      });

      if (!user) {
            return next(
                  new errorHandler(
                        "Reset Password Token is invalid or has been expired",
                        400
                  )
            );
      }

      if (req.body.password !== req.body.confirmPassword) {
            return next(new errorHandler("Password does not password", 400));
      }
      else {
            user.password = req.body.password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();
            res.json({
                  success: true
            })
      }

});

exports.getUserDetails = catchAsyncError(async (req, res, _next) => {
      console.log(req.user)
      const user = await User.findById(req.user.id);
      res.status(200).json({
            success: true,
            user,
      });
});

// update User password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
      const { oldPassword } = req.body
      const user = await User.findById(req.user.id).select("+password");
      if (req.body.newPassword !== req.body.confirmPassword) {
            return next(new errorHandler("password does not match", 400));
      }
      bcrypt.compare(oldPassword.toString(), user.password, (err, isMatch) => {
            if (err) throw err
            if (isMatch) {
                  user.password = req.body.newPassword;
                  user.save();
                  sendToken(user, 200, res);

            }

            else {
                  return next(new errorHandler("User not found", 404));
            }
      })

});
//update user data

exports.UpdateUserDetails = catchAsyncError(async (req, res, _next) => {

      const newUserData = {
            name: req.body.name,
            email: req.body.email,
      };
      let file = req.files.avatar
      if (file !== "") {
            const user = await User.findById(req.user.id);

            const imageId = user.avatar.public_id;
            await cloudinary.uploader.destroy(imageId)
            const myCloud = await cloudinary.uploader.upload(file.tempFilePath, {
                  folder: "avatar",
                  width: 150,
                  crop: "scale",
            });
            newUserData.avatar = {
                  public_id: myCloud.public_id,
                  url: myCloud.secure_url,
            };
      }

      const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
      });

      res.status(200).json({
            success: true,
      });
})
// Get all users(admin)
exports.getAllUser = catchAsyncError(async (_req, res, _next) => {
      const users = await User.find();
      res.status(200).json({
            success: true,
            users,
      });
});

// Get single user (admin)
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
      const user = await User.findById(req.params.id);

      if (!user) {
            return next(
                  new errorHandler(`User does not exist with Id: ${req.params.id}`)
            );
      }
      res.status(200).json({
            success: true,
            user,
      });
});
//update user role --admin
exports.UpdateUserRole = catchAsyncError(async (req, res, _next) => {
      const newUserData = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role
      }
      const user = await User.findByIdAndUpdate(req.params.id, newUserData, { new: true, runValidators: true, useFindAndModify: false })
      res.status(200).json({
            success: true
      })
})
//delete user --admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {
      const user = await User.findById(req.params.id)
      if (!user) {
            return next(new errorHandler(`user does not exist with ${req.params.id}`))
      }
      await user.remove()
      res.status(200).json({
            success: true,
            message: "user deleted"
      })
})