const Product = require("../model/Product");

const createProduct = async (req, res) => {
  try {
    // Extracting data from the request body
    const { title, description, price, highPrice, quantity, sizes, images } =
      req.body;


    const imagesArray = JSON.parse(req.body.images);

    if (
      !title ||
      !description ||
      !price ||
      !sizes ||
      !quantity ||
      !imagesArray
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      });
    }



    // Creating a new product object
    const newProduct = await Product.create({
      title,
      description,
      price,
      highPrice,
      sizes,
      quantity,
      images: imagesArray,
    });

    res.status(200).json({
      success: true,
      data: newProduct,
      message: "Product Created Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
};


const getAllProductCtrl = async (req, res) => {
  try {
    const products = await Product.find({})
    return res.status(200).json({
      success: true,
      totalProduct: products.length,
      products
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Error in getting all products api"
    })
  }
}

const deleteProductCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id)
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully!"
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Error in deleting product api"
    })
  }
}

const updateProuctCtrl = async (req, res) => {
  try {
    const { title, description, price, highPrice, quantity } = req.body;
    const { id } = req.params;
    const product = await Product.findById(id)


    if (!product) {
      return res.status(404).send('Product not found');
    }

    const updatedValue = {
      title: !title ? product.title : title,
      description: !description ? product.description : description,
      price: !price ? product.price : price,
      highPrice: !highPrice ? product.highPrice : highPrice,
      quantity: !quantity ? product.quantity : quantity,
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedValue, { new: true })


    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      updatedProduct
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Error in updating product api"
    })

  }
}

module.exports = { createProduct, getAllProductCtrl, deleteProductCtrl, updateProuctCtrl }