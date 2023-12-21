const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config(); // Load variables from .env file

const app = express();
const port = 3000;

const uri = process.env.MONGO_URI;
mongoose.connect(uri);

app.use(express.json());

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Category = mongoose.model("Category", categorySchema);

// Creating an item model
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  price: Number,
  quantity: Number,
});

const Item = mongoose.model("Item", itemSchema);

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/categories", async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });
    await category.save();
    res.send(category);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/items", async (req, res) => {
  try {
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
    })
    await item.save();
    res.send(item);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
