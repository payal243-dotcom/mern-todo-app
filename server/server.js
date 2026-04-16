const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Todo = require("./Todo");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/todoapp")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// GET all todos
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// ADD todo
app.post("/todos", async (req, res) => {
  const newTodo = new Todo({
    text: req.body.text
  });

  await newTodo.save();
  res.json(newTodo);
});

// DELETE todo
app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});