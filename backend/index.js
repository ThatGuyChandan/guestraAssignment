const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const routes = require("./routes");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(bodyParser.json()); // Middleware
connectDB(); //connect to DB

app.use("/api", routes);
app.listen(port || 3000, () => {
  console.log(`Server is running on port ${port}`);
});
