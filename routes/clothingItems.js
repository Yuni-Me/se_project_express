const router = require("express").Router();

const {
  createItem,
  getItems,
  // updateItem,
  likeItem,
  dislikeItem,
  deleteItem,
} = require("../controllers/clothingItems");

// CRUD

//  Create
router.post("/", createItem);

// Read
router.get("/", getItems);

// Update
router.put("/:itemId/likes", likeItem);

// Delete
router.delete("/:itemId", deleteItem);
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
