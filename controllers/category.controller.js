const { Category } = require("../models/models");
const ApiError = require("../error/ApiError");

class CategoryController {
  async add(req, res) {
    try {
      const { name } = req.body;
      const category = await Category.create({ name });
      return res.json(category);
    } catch (error) {
      return next(ApiError.badRequest(error.message));
    }
  }

  async getAll(res) {
    try {
      const all = await Category.findAll();
      return res.json(all);
    } catch (error) {
      return next(ApiError.badRequest(error.message));
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const category = await Category.destroy({ where: { id } });
      return res.json("Категория удалена");
    } catch (error) {
      return next(ApiError.badRequest(error.message));
    }
  }
}

module.exports = new CategoryController();
