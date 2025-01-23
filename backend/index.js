const express = require("express");
const connectDB = require("./config/db");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
connectDB();
app.listen(port || 3000, () => {
  console.log(`Server is running on port ${port}`);
});
