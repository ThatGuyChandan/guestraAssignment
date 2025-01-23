const express = require("express");
const Category = require("../models/categoryModel");

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
module.exports = {
  createCategory,
};
