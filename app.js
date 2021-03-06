const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// Start Express and Routing
const app = express();
const port = process.env.PORT || 3000;

// Connecting to the Data Base and Structuring the Schema

if (process.env.ENV === "Test") {
  console.log("This is a test");
  const db = mongoose.connect("mongodb://localhost/bookAPI_Test");
} else {
  console.log("This is for real");
  const db = mongoose.connect("mongodb://localhost/bookAPI");
}

// const db = mongoose.connect("mongodb://localhost/bookAPI");
const Book = require("./models/bookModel");
const bookRouter = require("./routes/bookRouter")(Book);

// setting up body parser to get data out of the body and request Object
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

app.server = app.listen(port, () => {
  console.log(`Running on Port ${port}`);
});

module.exports = app;
