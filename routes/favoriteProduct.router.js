const Router = require("express");
const favoriteProductController = require("../controllers/favoriteProduct.controller");
const userMiddleware = require("../middlewares/userMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const router = new Router();

router.post("/", authMiddleware, favoriteProductController.add);
router.get("/:userId", authMiddleware, favoriteProductController.getAllByUser);
router.delete("/:id", authMiddleware, favoriteProductController.delete);

module.exports = router;
