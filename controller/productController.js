const Product = require("../models/productsModel")
const errorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError")
const features = require("../utils/feature")
const cloudinary = require("cloudinary").v2

//create product
exports.createProduct = catchAsyncError(async (req, res, next) => {
      const { name, description, price, category, stock } = req.body
      let images = [];
      let file = req.files.image
      if (file) {
            file.map((f) => {
                  images.push(f)

            })
            console.log(images[0].tempFilePath)
      }
      let imagesLinks = [];
      for (let i = 0; i < images.length; i++) {
            for (let j = i; j <= i; j++) {
                  console.log(images[i])
                  await cloudinary.uploader.upload(images[i].tempFilePath, {
                        folder: "products",
                  }, function (err, result) {
                        console.log(result)
                        imagesLinks.push({
                              public_id: result.public_id,
                              url: result.secure_url,
                        });
                  });
            }
      }
      console.log(imagesLinks)
      await new Product({
            name, description, price, category, stock, user: req.user.id, images: imagesLinks
      }).save().then(() => {
            images = []
            imagesLinks = []
            res.status(201).json({
                  success: true,
            })
      })

})
//get all products
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
      const resultPerPage = 6
      let ProductsCount = await Product.countDocuments()
      const feature = new features(Product.find(), req.query)
            .search()
            .filter()
            .pagination(resultPerPage);
      let products = await feature.query;
      let filteredProducts = products.length;
      res.status(200).json({ success: true, products, ProductsCount, resultPerPage, filteredProducts, })
})

exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
      const products = await Product.find();

      res.status(200).json({
            success: true,
            products,
      });
});
//update product ---admin
exports.updateProductDetails = catchAsyncError(async (req, res, next) => {
      let product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, })
            res.status(200).json({
                  success: true,
                  product
            })
})
exports.updateProductImages = catchAsyncError(async (req, res, next) => {
      let product = await Product.findById(req.params.id)
      if (!product) {
            return next(new errorHandler("poduct not found", 404))
      }
      else {
            for (let i = 0; i < product.images.length; i++) {
                  await cloudinary.uploader.destroy(product.images[i].public_id);
            }
            let productImages = [];
            let allImages = req.files.image
            if (allImages) {
                  allImages.map((f) => {
                        productImages.push(f)

                  })
            }

            let imagesLinks = [];

            for (let i = 0; i < productImages.length; i++) {
                  for (let j = i; j <= i; j++) {
                        console.log(productImages[i])
                        await cloudinary.uploader.upload(productImages[i].tempFilePath, {
                              folder: "products",
                        }, function (err, result) {
                              console.log(result)
                              imagesLinks.push({
                                    public_id: result.public_id,
                                    url: result.secure_url,
                              });
                        });
                  }
            }
            console.log(imagesLinks)
            product = await Product.findByIdAndUpdate(req.params.id, {images: imagesLinks }, { new: true, runValidators: true, })
            imagesLinks = []
            res.status(200).json({
                  success: true,
                  product
            })
      }
})
//delete product --admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
      console.log(req.user)
      const product = await Product.findById(req.params.id)
      if (!product) {
            return next(new errorHandler("poduct not found", 404))
      }
      else {
            await product.remove()
            res.status(200).json({
                  success: true,
                  message: "product deleted"
            })
      }
})
//get single product
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
      const product = await Product.findById(req.params.id)
      if (!product) {
            return next(new errorHandler("poduct not found", 404))
      }
      else {
            res.status(200).json({
                  success: true,
                  product,
            })
      }
})

//product review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
      console.log(req.user)
      const { rating, comment, productId } = req.body;
      const review = {
            user: req.user.id,
            name: req.user.name,
            rating: Number(rating),
            comment
      };
      const product = await Product.findById(productId)
      console.log(product)
      const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user.id.toString())
      if (isReviewed) {
            product.reviews.forEach(rev => {
                  if (rev.user.toString() === req.user.id.toString()) {
                        rev.rating = rating;
                        rev.comment = comment;
                        rev.name = req.user.name;
                  }
            });
      }
      else {
            product.reviews.push(review)
            product.numOfReviews = product.reviews.length
      }
      let avg = 0
      product.reviews.forEach(rev => {
            avg += rev.rating
      })
      product.ratings = avg / product.reviews.length
      await product.save({ validateBeforeSave: false })
      res.status(200).json({
            success: true
      })
})
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
      const product = await Product.findById(req.query.id)
      console.log(product)
      if (!product) {
            return next(new errorHandler("product not found", 404))
      }

      res.status(200).json({
            success: true,
            reviews: product.reviews
      })
})
exports.deleteReview = catchAsyncError(async (req, res, next) => {
      const product = await Product.findById(req.query.productId)
      if (!product) {
            return next(new errorHandler("product not found", 404))
      }
      const reviews = product.reviews.filter(
            (rev) => rev.id.toString() !== req.query.id.toString()
      );
      let avg = 0;

      reviews.forEach((rev) => {
            avg += rev.rating;
      });

      let ratings = 0;

      if (reviews.length === 0) {
            ratings = 0;
      } else {
            ratings = avg / reviews.length;
      }

      const numOfReviews = reviews.length;
      await Product.findByIdAndUpdate(req.query.productId,
            {
                  reviews,
                  ratings,
                  numOfReviews,
            },
            {
                  new: true,
                  runValidators: true,
                  useFindAndModify: false,
            }
      );
      res.status(200).json({
            success: true,
      })
})