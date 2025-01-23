const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
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
  taxApplicability: {
    type: Boolean,
    required: true,
    default: false,
  },
  tax: {
    type: Number,
    default: 0, // applicable if taxApplicability is true
  },
  taxType: {
    type: String,
    default: "percentage",
  },
});

module.exports = mongoose.model("Category", CategorySchema);
