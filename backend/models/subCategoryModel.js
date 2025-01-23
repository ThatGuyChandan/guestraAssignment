const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema({
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
    required: true,
  },
  taxApplicability: {
    //
    type: Boolean,
    default: function () {
      return this.categoryId?.taxApplicability || false;
    },
  },
  tax: {
    //
    type: Number,
    default: function () {
      return this.categoryId?.tax || 0;
    },
  },
});

module.exports = mongoose.model("SubCategory", SubCategorySchema);
