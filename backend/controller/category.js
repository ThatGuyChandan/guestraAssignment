const Category = require("../models/categoryModel");
//create category
const createCategory = async (req, res) => {
  const { name, image, description, taxApplicability, tax, taxType } = req.body;

  try {
    const category = new Category({
      name,
      image,
      description,
      taxApplicability,
      tax: taxApplicability ? tax : 0,
      taxType: taxApplicability ? taxType : "percentage",
    });

    await category.save();
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
//update category by id
const editCategory = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const category = await Category.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a category by name or ID
const getCategory = async (req, res) => {
  const { id, name } = req.query;

  try {
    const query = id ? { _id: id } : { name: new RegExp(name, "i") };
    const category = await Category.findOne(query);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = {
  createCategory,
  editCategory,
  getAllCategories,
  getCategory,
};
