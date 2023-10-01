const router = require("express").Router();

const { authUser } = require("../middlewares/auth");

const { getCurrentUser, updateUser } = require("../controllers/users");

router.use(authUser);

router.get("/me", authUser, getCurrentUser);
router.patch("/me", authUser, updateUser);

module.exports = router;
