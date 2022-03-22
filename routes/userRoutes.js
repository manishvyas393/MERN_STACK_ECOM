const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getAllUser, getUserDetails, updatePassword, UpdateUserDetails, getSingleUser, UpdateUserRole, deleteUser } = require("../controller/userController")
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth")

const router = require("express").Router()


router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/password/forgot", forgotPassword)
router.get("/logout", logoutUser)
router.put("/password/reset/:token", resetPassword)
router.get("/myprofile",isAuthenticatedUser,getUserDetails)
router.put("/update/password", isAuthenticatedUser, updatePassword)
router.put("/myprofile/update", isAuthenticatedUser, UpdateUserDetails)
router.get("/admin/getallusers", isAuthenticatedUser,authorizedRoles("admin"), getAllUser)
router.get("/admin/:id/user", isAuthenticatedUser, authorizedRoles("admin"), getSingleUser)
router.put("/admin/user/updaterole/:id", isAuthenticatedUser, authorizedRoles("admin"), UpdateUserRole)
router.delete("/admin/user/delete/:id", isAuthenticatedUser,authorizedRoles("admin"),deleteUser)

module.exports=router