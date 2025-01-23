const Item = require("../models/itemModel");
const Category = require("../models/categoryModel");
const SubCategory = require("../models/subCategoryModel");

const createItem = async (req, res) => {
  const {
    name,
    image,
    description,
    categoryId,
    subCategoryId,
    taxApplicability,
    tax,
    baseAmount,
    discount,
  } = req.body;

  try {
    if (!categoryId && !subCategoryId) {
      return res.status(400).json({
        success: false,
        message: "Either categoryId or subCategoryId is required",
      });
    }

    if (categoryId) {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }
    }

    if (subCategoryId) {
      const subCategory = await SubCategory.findById(subCategoryId);
      if (!subCategory) {
        return res
          .status(404)
          .json({ success: false, message: "SubCategory not found" });
      }
    }

    const totalAmount = baseAmount - discount;

    const item = new Item({
      name,
      image,
      description,
      categoryId,
      subCategoryId,
      taxApplicability,
      tax: taxApplicability ? tax : 0,
      baseAmount,
      discount,
      totalAmount,
    });

    await item.save();
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
const editItem = async (req, res) => {
  const { id } = req.params; // Item ID from the URL
  const updates = req.body; // Attributes to update

  try {
    // Recalculate totalAmount if baseAmount or discount is updated
    if (updates.baseAmount || updates.discount) {
      updates.totalAmount = (updates.baseAmount || 0) - (updates.discount || 0);
    }

    const item = await Item.findByIdAndUpdate(id, updates, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    });

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
// Get all items
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all items under a category
const getItemsByCategory = async (req, res) => {
  const { categoryId } = req.query;

  try {
    const items = await Item.find({ categoryId });
    if (items.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No items found for this category" });
    }

    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all items under a sub-category
const getItemsBySubCategory = async (req, res) => {
  const { subCategoryId } = req.query;

  try {
    const items = await Item.find({ subCategoryId });
    if (items.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No items found for this sub-category",
      });
    }

    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get an item by name or ID
const getItem = async (req, res) => {
  const { id, name } = req.query;

  try {
    const query = id ? { _id: id } : { name: new RegExp(name, "i") };
    const item = await Item.findOne(query);

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const searchItemByName = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Item name is required" });
  }

  try {
    const items = await Item.find({ name: new RegExp(name, "i") }); // Case-insensitive search

    if (items.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No items found with the given name",
      });
    }

    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = {
  createItem,
  editItem,
  getAllItems,
  getItemsByCategory,
  getItemsBySubCategory,
  getItem,
  searchItemByName,
};
