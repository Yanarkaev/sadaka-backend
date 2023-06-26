const Router = require("express");
const productController = require("../controllers/product.controller");
const router = new Router();

router.post("/", productController.add);
router.get("/", productController.getAll);
router.get("/:id", productController.getOne);

module.exports = router
