const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: false,
  },
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: false,
  },
  taxApplicability: {
    type: Boolean,
    required: true,
  },
  tax: {
    type: Number,
    default: 0, // only applicable if taxApplicability is true
  },
  baseAmount: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  totalAmount: {
    type: Number,
    required: true,
    default: function () {
      return this.baseAmount - this.discount;
    },
  },
});

module.exports = mongoose.model("Item", ItemSchema);
