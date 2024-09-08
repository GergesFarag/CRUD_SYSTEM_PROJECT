const express = require("express");
const router = express.Router();
const controllers = require("../Controllers/customerControllers");
router.get("/", controllers.customer_index_get);

router.get("/customer/add.html", controllers.customer_add_get);

router.get("/customer/edit.html", controllers.customer_edit_get);

router.get("/customer/search.html", controllers.customer_search_get);

router.post("/customer/add.html", controllers.customer_index_post);

router.get("/view/:id", controllers.customer_view_get);

router.get("/edit/:id", controllers.customer_editspecif_get);

router.delete("/delete/:id", controllers.customer_index_delete);

router.put("/edit/:id", controllers.customer_index_put);

router.post("/search", controllers.customer_search_post);

module.exports = router;
