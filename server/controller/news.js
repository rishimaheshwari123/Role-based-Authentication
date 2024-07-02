const newsModel = require("../model/news")

const createNews = async (req, res) => {
    try {
        const { name } = req.body;
        const news = await newsModel.create({ name });
        return res.status(201).json({
            success: true,
            message: "created",
            news
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "error",
        })
    }
}
const getNew = async (req, res) => {
    try {
        const news = await newsModel.find({});
        return res.status(200).json({
            success: true,
            news
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error",
            news
        })
    }
}
const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { active } = req.body;
        const news = await newsModel.findByIdAndUpdate(id, { active })
        return res.status(200).json({
            success: true,
            news
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error",
            news
        })
    }
}



module.exports = { createNews, getNew, update }