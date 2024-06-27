const express = require("express");
const router = express.Router();
const { createProduct, getAllProductCtrl, deleteProductCtrl, updateProuctCtrl } = require("../controller/productCtrl");
const { isAdmin, auth } = require("../middleware/auth");

// Create a new product (requires authentication)
router.post("/create", auth, isAdmin, createProduct);
router.delete("/delete/:id", deleteProductCtrl);
router.get("/getAll", getAllProductCtrl);
router.put("/update/:id", updateProuctCtrl);


module.exports = router;
