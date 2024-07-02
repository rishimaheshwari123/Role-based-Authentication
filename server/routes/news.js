const express = require("express");
const { createNews, getNew, update } = require("../controller/news");

const router = express.Router();

router.post("/create", createNews)
router.get("/get", getNew)
router.put("/up/:id", update)

module.exports = router;