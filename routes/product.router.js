const Router = require("express");
const productController = require("../controllers/product.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const router = new Router();

router.post("/",authMiddleware,  productController.add);
router.get("/", productController.getAll);
router.get("/:id", productController.getOne);
router.get("/user/:userId", productController.getByUser);

module.exports = router
