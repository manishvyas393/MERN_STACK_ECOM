const { getAllProducts,createProduct,deleteProduct, getSingleProduct, createProductReview, getProductReviews, deleteReview, getAdminProducts, updateProductImages, updateProductDetails} = require("../controller/productController")
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth")

const router = require("express").Router()

//get product
router.get("/products", getAllProducts)
router.get("/admin/products",isAuthenticatedUser,authorizedRoles("admin"),getAdminProducts)
//create product
router.post("/admin/product/new", isAuthenticatedUser,authorizedRoles("admin"),createProduct)
//update product
router.put("/admin/updateproduct/details/:id", isAuthenticatedUser, authorizedRoles("admin"),updateProductDetails)
router.put("/admin/updateproduct/images/:id", isAuthenticatedUser, authorizedRoles("admin"), updateProductImages)
//delete product
router.delete("/admin/product/:id", isAuthenticatedUser, authorizedRoles("admin"),deleteProduct)
//get single product
router.get("/singleproduct/:id", getSingleProduct)
router.put("/review", isAuthenticatedUser, createProductReview)
router.get("/getProductreviews", isAuthenticatedUser, getProductReviews)
router.delete("/deleteReview",isAuthenticatedUser,deleteReview)

module.exports=router