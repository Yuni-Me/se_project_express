const router = require("express").Router();

const {
  createItem,
  getItems,
  likeItem,
  dislikeItem,
  deleteItem,
} = require("../controllers/clothingItems");

const { authUser } = require("../middlewares/auth");

// CRUD

//  Create
router.post("/", authUser, createItem);

// Read
router.get("/", getItems);

// Update
router.put("/:itemId/likes", authUser, likeItem);

// Delete
router.delete("/:itemId", authUser, deleteItem);
router.delete("/:itemId/likes", authUser, dislikeItem);

module.exports = router;
