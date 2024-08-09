const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const blogRouters = require("./routes/blogDataRoutes");
const path = require("path");

const PORT = process.env.PORT;
const dbURI = process.env.dbURI;

mongoose
  .connect(dbURI)
  .then((res) => {
    console.log("connected to mongoDB successfully");
  })
  .catch((err) => {
    console.log("Err connectiong mongoDB : -- ", err);
  });

app.use(express.json());
app.use("/", blogRouters);

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, 'build')));

// Handle all other routes with the React app's index.html
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});
