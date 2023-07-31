const express = require("express");
const router = express.Router();
const Item = require("../schemas/ItemSchema");

//Get one item
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.find({ id: req.params.id });
    return res.json(item);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
});

//Get all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    return res.json(items);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
});

module.exports = router;
