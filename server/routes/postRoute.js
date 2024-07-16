const express = require("express");
const { createPostCtrl, getAllPostCtrl, getSinglePost, createCommentCtrl, getAllComment } = require("../controller/postCtrl");

const router = express.Router();

router.post("/create", createPostCtrl)
router.get("/getAll", getAllPostCtrl)
router.get("/get/:id", getSinglePost)
router.post("/create-comment/:id", createCommentCtrl)


module.exports = router;