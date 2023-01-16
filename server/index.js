//user env variable to protect important info
require("dotenv").config();
// import express (after npm install express)
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Todo = require("./todoSchema");
// create new express app and save it as "app"
const app = express();
//use cors so we can cross domain
app.use(cors());
//to get the req.body info print in terminal
app.use(bodyParser.json());
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
  Todo.find(function (err, data) {
    if (err) return console.error(err);
    res.send(data);
  });
});

// addtodo post request
app.post("/addtodo", (req, res) => {
  const { input } = req.body;
  const todo = new Todo({
    value: input,
    id: Date.now().toString(),
  });
  todo.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Model saved successfully!");
    }
  });
});

app.delete("/deletetodo/:id", (req, res) => {
  Todo.deleteOne({ id: req.params.id }, function (err) {
    if (err) return console.error(err);
    res.send("Deleted successfully!");
  });
});
// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
