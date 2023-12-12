const router = require("express").Router();

const { authUser } = require("../middlewares/auth");

const { getCurrentUser, updateUser } = require("../controllers/users");
const { validateUserUpdate } = require("../middlewares/validation");

router.use(authUser);

router.get("/me", authUser, getCurrentUser);
router.patch("/me", authUser, validateUserUpdate, updateUser);

module.exports = router;
