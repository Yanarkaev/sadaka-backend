const ApiError = require("../error/ApiError");
const { FavoriteProduct, Product, Favorites } = require("../models/models");

class FavoriteProductController {
  async add(req, res, next) {
    try {
      const { favoriteId, productId } = req.body;

      const existFavoriteProduct = await FavoriteProduct.findOne({
        where: { favoriteId, productId },
      });

      if (existFavoriteProduct) {
        return next(ApiError.badRequest("Уже добавлено в избранное"));
      }

      const favoriteProduct = await FavoriteProduct.create({
        favoriteId,
        productId,
      });
      return res.json(favoriteProduct);
    } catch (error) {
      return next(ApiError.badRequest(error.message));
    }
  }

  async getAllByUser(req, res, next) {
    try {
      const { userId } = req.params;
      const currentFavorites = await Favorites.findOne({ where: { userId } });
      const favoriteProductsList = await FavoriteProduct.findAll({
        where: { favoriteId: currentFavorites.id },
        include: [Product],
      });
      return res.json(favoriteProductsList);
    } catch (error) {
      return next(ApiError.badRequest(error.message));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await FavoriteProduct.destroy({ where: { id } });
      return res.json({ message: "Товар удален" });
    } catch (error) {
      return next(ApiError.badRequest(error.message));
    }
  }
}

module.exports = new FavoriteProductController();
