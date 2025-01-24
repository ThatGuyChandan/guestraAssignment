const Item = require("../models/itemModel");
const Category = require("../models/categoryModel");
const SubCategory = require("../models/subCategoryModel");
//creating item
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
//update items by id
const editItem = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const currentItem = await Item.findById(id);

    if (!currentItem) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    // Use existing values if baseAmount or discount is not provided
    const baseAmount =
      updates.baseAmount !== undefined
        ? updates.baseAmount
        : currentItem.baseAmount;
    const discount =
      updates.discount !== undefined ? updates.discount : currentItem.discount;

    // Recalculate totalAmount
    updates.totalAmount = baseAmount - discount;

    // Update the item
    const item = await Item.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

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
    const query = id ? { _id: id } : { name };
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
// search item by name
const searchItemByName = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Item name is required" });
  }

  try {
    const items = await Item.find({ name: new RegExp(name, "i") });

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
