//user env variable to protect important info
require("dotenv").config();
// import express (after npm install express)
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// create new express app and save it as "app"
const app = express();
//use cors so we can cross domain
app.use(cors());
// server configuration
const PORT = 8080;
//connect mongodb
// Set `strictQuery` to `false`, so Mongoose doesn't strip out non-schema
// query filter properties by default.
// This does **not** affect `strict`.
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI);
console.log("mongodb connected");

// create a route for the app
app.get("/gettodo", (req, res) => {
  res.send("Hello World im using nodemon");
});

// addtodo post request
app.post("/addtodo", (req, res) => {
  console.log(req.body);
  res.send("here is post");
});

// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
