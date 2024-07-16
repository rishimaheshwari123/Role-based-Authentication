const postModel = require("../model/post")
const commentModel = require("../model/comment")

const createPostCtrl = async (req, res) => {
    try {
        const { title, desc, images } = req.body;

        const imagesArray = typeof images === 'string' ? JSON.parse(images) : images;


        const post = await postModel.create({
            title,
            desc,
            images: imagesArray
        });

        return res.status(201).json({
            success: true,
            message: "Post created successfully!",
            post
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in create post"
        });
    }
};

const getAllPostCtrl = async (req, res) => {
    try {

        const posts = await postModel.find({}).populate("comment").exec();
        return res.status(200).json({
            success: true,
            posts
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in get all post"
        })
    }
}
const getSinglePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await postModel.findById(id).populate("comment").exec();
        return res.status(200).json({
            success: true,
            post
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in getting single post"
        })
    }
}

const createCommentCtrl = async (req, res) => {
    try {
        const { title } = req.body;
        const { id } = req.params;
        const post = await commentModel.create({
            title,
        })
        if (post) {
            await postModel.findByIdAndUpdate(id, { $push: { comment: post._id } }, { new: true })
        }
        return res.status(201).json({
            success: true,
            message: "comment created successfully!",
            post
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Error in create comment"
        })
    }
}



module.exports = { createPostCtrl, getAllPostCtrl, getSinglePost, createCommentCtrl }