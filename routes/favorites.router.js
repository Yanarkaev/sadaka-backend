const Router = require("express");
const favoritesController = require("../controllers/favorites.controller");
const router = new Router();

router.post("/", favoritesController.addToFavorite);
router.get("/", favoritesController.getFavorites);

module.exports = router
