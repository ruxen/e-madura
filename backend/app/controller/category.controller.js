const Category = require("../model/category.model");
const { generateUniqueSlug } = require("../helpers/slug.helpers");

const index = async (req, res) => {
  try {
    const categories = await Category.query();

    res.status(200).json({
      message: "Categories retrieved successfully!",
      data: categories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch categories. Please try again later!",
    });
  }
};

const store = async (req, res) => {
  try {
    const { name } = req.body;
    const uniqueSlug = await generateUniqueSlug(name, Category);
    const category = await Category.query().insert({
      name,
      slug: uniqueSlug,
    });

    res.status(201).json({
      message: "Category successfully created!",
      data: category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create category. Please try again later!",
    });
  }
};

const show = async (req, res) => {
  const { slug } = req.params;

  try {
    const category = await Category.query()
      .where('slug', slug)
      .withGraphFetched('products');

    if (category.length === 0) {
      return res.status(404).json({
        message: "Category not found!",
      });
    }

    res.status(200).json({
      message: "Category and products retrieved successfully!",
      data: category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to retrieve category. Please try again later!",
    });
  }
};

module.exports = {
  index,
  store,
  show,
};
