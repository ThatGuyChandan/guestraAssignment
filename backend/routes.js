const express = require("express");
const category = require("./controller/category");
const subCategory = require("./controller/subCategory");
const item = require("./controller/item");

const router = express.Router();

// Category Routes
router.post("/categories", category.createCategory);
router.put("/categories/:id", category.editCategory);
router.get("/categories", category.getAllCategories);
router.get("/categories/search", category.getCategory);

// SubCategory Routes
router.post("/subcategories", subCategory.createSubCategory);
router.put("/subcategories/:id", subCategory.editSubCategory);
router.get("/subcategories", subCategory.getAllSubCategories);
router.get("/subcategories/category", subCategory.getSubCategoriesByCategory);
router.get("/subcategories/search", subCategory.getSubCategory);

// Item Routes
router.post("/items", item.createItem);
router.put("/items/:id", item.editItem);
router.get("/items", item.getAllItems);
router.get("/items/category", item.getItemsByCategory);
router.get("/items/subcategory", item.getItemsBySubCategory);
router.get("/items/search", item.getItem);
router.get("/items/searchByName", item.searchItemByName);

module.exports = router;
