const router = require("express").Router();

const {
  createItem,
  getItems,
  likeItem,
  dislikeItem,
  deleteItem,
} = require("../controllers/clothingItems");

const { authUser } = require("../middlewares/auth");
const { validateId, validateCardBody } = require("../middlewares/validation");

// CRUD

//  Create
router.post("/", authUser, validateCardBody, createItem);

// Read
router.get("/", getItems);

// Update
router.put("/:itemId/likes", authUser, validateId, likeItem);

// Delete
router.delete("/:itemId", authUser, validateId, deleteItem);
router.delete("/:itemId/likes", authUser, validateId, dislikeItem);

module.exports = router;
