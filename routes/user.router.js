const Router = require("express");
const router = new Router();

const userController = require("../controllers/user.controller");

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.get("/auth", userController.auth);

module.exports = router;
