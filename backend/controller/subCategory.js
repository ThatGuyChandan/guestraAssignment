const SubCategory = require("../models/subCategoryModel");
const Category = require("../models/categoryModel");
//create subCategory
const createSubCategory = async (req, res) => {
  const { name, image, description, categoryId, taxApplicability, tax } =
    req.body;

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    const subCategory = new SubCategory({
      name,
      image,
      description,
      categoryId,
      taxApplicability: taxApplicability ?? category.taxApplicability,
      tax: tax ?? category.tax,
    });

    await subCategory.save();
    res.status(201).json({ success: true, data: subCategory });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
//updating subCategory by id
const editSubCategory = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const subCategory = await SubCategory.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!subCategory) {
      return res
        .status(404)
        .json({ success: false, message: "SubCategory not found" });
    }

    res.status(200).json({ success: true, data: subCategory });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
// Get all subCategories
const getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find();
    res.status(200).json({ success: true, data: subCategories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all subCategories under a category
const getSubCategoriesByCategory = async (req, res) => {
  const { categoryId } = req.query;

  try {
    const subCategories = await SubCategory.find({ categoryId });
    if (subCategories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No sub-categories found for this category",
      });
    }

    res.status(200).json({ success: true, data: subCategories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a subCategory by name or ID
const getSubCategory = async (req, res) => {
  const { id, name } = req.query;

  try {
    const query = id ? { _id: id } : { name: new RegExp(name, "i") };
    const subCategory = await SubCategory.findOne(query);

    if (!subCategory) {
      return res
        .status(404)
        .json({ success: false, message: "SubCategory not found" });
    }

    res.status(200).json({ success: true, data: subCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = {
  createSubCategory,
  editSubCategory,
  getAllSubCategories,
  getSubCategoriesByCategory,
  getSubCategory,
};
