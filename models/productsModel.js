const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
      name: {
            type: String,
            required: [true, "Please enter product name"],
            trim: true
      },
      description: {
            type: String,
            required: [true, "please enter product description"]
      },
      price: {
            type: Number,
            required: [true, "please enter product price"],
            maxLength: [8, "price cannot exceed 8 char"]
      },
      ratings: {
            type: Number,
            default: 0
      },
      images: [
            {
                  public_id: {
                        type: String,
                        required: true
                  },
                  url: {
                        type: String,
                        required: true
                  }
            }
      ],
      category: {
            type: String,
            required: [true, "please enter product category"]
      },
      stock: {
            type: Number,
            required: [true, "please enter product stock"],
            maxLength: [4, "stock should be less than 4digit"],
            default: 1
      },
      numOfReviews: {
            type: Number,
            default:0
       },
      reviews: [{
            user: {
                  type: mongoose.Schema.ObjectId,
                  ref: "User",
                  required: true
            },
            name: {
                  type: String,
            },
            rating: {
                  type: String,
            },
            comment: {
                  type: String,
            }
      }],
      user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
        required:true
      },
      createdAt: {
            type: Date,
            default: Date.now()
      }

})
module.exports = mongoose.model("Product", productSchema)