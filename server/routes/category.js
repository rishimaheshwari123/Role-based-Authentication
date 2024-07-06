const express = require("express");
const { createSubCategory, createCategory, getAllCategory } = require("../controller/category");

const router = express.Router();

router.post("/create-subCat", createSubCategory)
router.post("/create", createCategory)
router.get("/getAll", getAllCategory)

module.exports = router;