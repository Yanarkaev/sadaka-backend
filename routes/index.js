const Router = require("express");
const router = new Router();

const categoryRouter = require("./category.router");
const favoriteProductRouter = require("./favoriteProduct.router");
const favoritesRouter = require("./favorites.router");
const productRouter = require("./product.router");
const userRouter = require("./user.router");

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/favorites", favoritesRouter);
router.use("/favoriteProduct", favoriteProductRouter);
router.use("/category", categoryRouter);

module.exports = router;
