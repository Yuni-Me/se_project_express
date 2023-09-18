const router = require("express").Router();
const { getUsers, getUser, createUser } = require("../controllers/users");

router.get("/", getUsers);
router.get("/:userId", getUser);
// router.patch("/me", updateCurrentUser);
router.post("/", createUser);

module.exports = router;
