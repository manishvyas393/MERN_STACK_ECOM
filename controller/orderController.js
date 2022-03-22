const Order = require("../models/orderModel")
const Product = require("../models/productsModel")
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.newOrder = catchAsyncError(async (req, res, next) => {
      const { shippingInfo, orderItems, paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
      } = req.body;

      const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice: itemsPrice + shippingPrice + taxPrice,
            paidAt: Date.now(),
            user: req.user.id,
      });
      order.orderItems.forEach(async (o) => {
            await updateStock(o.product, o.quantity)
      })
      res.status(201).json({
            success: true,
            order,
      });
})
//get single order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
      const order = await Order.findById(req.params.id).populate("user", "name email")
      if (!order) {
            return next(new ErrorHandler("order not found", 404))
      }
      res.status(200).json({
            success: true,
            order
      })
})
//logged user orders
exports.myOrders = catchAsyncError(async (req, res, next) => {
      const orders = await Order.find({ user: req.user.id })
      res.status(200).json({
            success: true,
            orders
      })
})
//get all orders --admin
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
      const order = await Order.find()
      let totalAmount = 0
      order.forEach(o => {
            totalAmount += o.totalPrice
      })
      res.status(200).json({
            success: true,
            order,
            totalAmount
      })
})
//update order --admin
exports.updateOrder = catchAsyncError(async (req, res, next) => {
      const order = await Order.findById(req.params.id)
      if (order.orderStatus === "delivered" || order.orderStatus === "Delivered") {
            return next(new ErrorHandler("order is delivered", 400))
      }
      order.orderStatus = req.body.status
      if (req.body.status === "delivered" || req.body.status === "Delivered") {
            order.deliveredAt = Date.now()
      }
      await order.save({ validateBeforeSave: false })
      res.status(200).json({
            success: true,
            order
      })
})
//delete order admin
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
      const order = await Order.findById(req.params.id)
      if (!order) {
            return next(new ErrorHandler("order not found", 404))
      }
      order.orderItems.forEach(async (o) => {
            await reStoreStock(o.product, o.quantity)
      })
      await order.remove()
      res.status(200).json({
            success: true,
      })
})

async function updateStock(id, quantity) {
      const product = await Product.findById(id)
      product.stock -= quantity
      await product.save({ validateBeforeSave: false })
}
async function reStoreStock(id, quantity) {
      const product = await Product.findById(id)
      product.stock += quantity
      await product.save({ validateBeforeSave: false })
}