const express = require("express");
const router = express.Router();
const customer_cont = require("../Controllers/customerControllers");
const user_cont = require("../Controllers/userControllers");
const middlewares = require("../middlewares/middleware")
const {check} = require("express-validator")
const multer = require("multer")
const upload = multer({ storage: multer.diskStorage({}) });


router.get("*" , middlewares.isUserLogin);

router.post("*" , middlewares.isUserLogin);

router.get("/",user_cont.user_index_get);

router.get("/dashboard" , middlewares.requireAuth , customer_cont.customer_dashboard_get);

router.get("/customer/add" , middlewares.requireAuth, customer_cont.customer_add_get);

router.get("/customer/edit" , middlewares.requireAuth, customer_cont.customer_edit_get);

router.get("/customer/search" , middlewares.requireAuth, customer_cont.customer_search_get);

router.post("/customer/add", customer_cont.customer_index_post);

router.get("/view/:id", middlewares.requireAuth, customer_cont.customer_view_get);

router.get("/edit/:id", middlewares.requireAuth, customer_cont.customer_editspecif_get);

router.delete("/delete/:id", customer_cont.customer_index_delete);

router.put("/edit/:id", customer_cont.customer_index_put);

router.post("/search", customer_cont.customer_search_post);

router.get("/login" , user_cont.user_login_get);

router.get("/register" , user_cont.user_reg_get);

router.post("/register",[check("email", "Please provide a valid email").isEmail(),
    check("password", "Password must be at least 8 characters with 1 uppercase letter and 1 number and 1 digit").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)] , user_cont.user_reg_post)

router.post("/login" , user_cont.user_login_post)

router.get("/signout" , user_cont.user_signout_get)

router.post("/update_profile" , upload.single("avatar") , user_cont.user_update_profile_post)

module.exports = router;
