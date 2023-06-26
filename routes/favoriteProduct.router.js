const Router = require("express");
const favoriteProductController = require("../controllers/favoriteProduct.controller");
const router = new Router();

router.post("/", favoriteProductController.post);
router.get("/", favoriteProductController.get);

module.exports = router
