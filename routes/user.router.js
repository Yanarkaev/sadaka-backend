const Router = require("express");
const router = new Router();

const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.get("/auth", authMiddleware, userController.auth);

module.exports = router;
