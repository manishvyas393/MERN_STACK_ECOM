const { newOrder, getSingleOrder, myOrders, deleteOrder, getAllOrders, updateOrder } = require("../controller/orderController")
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth")
const router = require("express").Router()

router.post("/neworder", isAuthenticatedUser, newOrder)
router.get("/myorders", isAuthenticatedUser, myOrders)
router.get("/getsingleorder/:id", isAuthenticatedUser,getSingleOrder)
router.get("/admin/getallorders", isAuthenticatedUser, authorizedRoles("admin"),getAllOrders)
router.delete("/admin/deleteorder/:id", isAuthenticatedUser, authorizedRoles("admin"), deleteOrder)
router.put("/admin/updateorder/:id",isAuthenticatedUser,authorizedRoles("admin"),updateOrder)
module.exports=router