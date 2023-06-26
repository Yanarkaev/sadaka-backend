const { Category } = require("../models/models");
const ApiError = require("../error/ApiError");

class CategoryController {
  async add(req, res) {
    try {
      const { name } = req.body;
      const category = await Category.create({ name });
      return res.json(category);
    } catch (error) {
      res.json({ error: error.parent.detail });
    }
  }

  async getAll(req, res) {
    const all = await Category.findAll();
    return res.json(all);
  }
}

module.exports = new CategoryController();
