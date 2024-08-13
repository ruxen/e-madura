const path = require("path");

const Product = require("../model/product.model");
const { generateUniqueSlug } = require("../helpers/slug.helpers");

const index = async (req, res) => {
  try {
    const products = await Product.query();

    res.status(200).json({
      message: "Products retrieved successfully!",
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch products. Please try again later!",
    });
  }
};

const store = async (req, res) => {
  try {
    const { name, price, category_id } = req.body;
    const imagePath = req.file ? req.file.path : null;
    const uniqueSlug = await generateUniqueSlug(name, Product);

    const product = await Product.query().insert({
      name,
      slug: uniqueSlug,
      price,
      category_id,
      image: imagePath,
    });

    res.status(201).json({
      message: "Product successfully created!",
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create product. Please try again later!",
    });
  }
};

module.exports = {
  index,
  store,
};
