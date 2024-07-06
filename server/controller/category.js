const categoryModel = require("../model/category");
const subcategoryModel = require("../model/subCat");

const createSubCategory = async (req, res) => {
    try {
        const { name, desc, catId } = req.body;

        const subCats = await subcategoryModel.create({ name, desc });
        if (subCats) {
            await categoryModel.findByIdAndUpdate(
                catId,
                { $push: { subCat: subCats._id } },
                { new: true, useFindAndModify: false }
            );
        }

        return res.status(201).json({
            success: true,
            message: "Subcategory created",
            subCats,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the subcategory",
        });
    }
};

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const cat = await categoryModel.create({ name });
        return res.status(201).json({
            success: true,
            message: "Category created",
            cat,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the category",
        });
    }
};

const getAllCategory = async (req, res) => {
    try {
        const cats = await categoryModel.find({}).populate("subCat").exec();
        return res.status(200).json({
            success: true,
            cats,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while retrieving categories",
        });
    }
};

module.exports = { createSubCategory, createCategory, getAllCategory };
