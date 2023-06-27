const uuid = require("uuid");
const path = require("path");
const ApiError = require("../error/ApiError");
const { Sequelize } = require("../db");
const { Product } = require("../models/models");

class ProductController {
  async add(req, res, next) {
    try {
      const { userId, categoryId, name, address, description } = req.body;
      const { img } = req.files;
      const images = [];

      for (let i = 0; i < img.length; i++) {
        const filename = uuid.v4() + ".jpg";
        images.push(filename);
        await img[i].mv(path.resolve(__dirname, "..", "static", filename));
      }

      const product = await Product.create({
        userId,
        categoryId,
        name,
        address,
        description,
        images,
      });

      return res.json(product);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getAll(req, res) {
    try {
      const { name, categoryId, limit = 5, page = 1 } = req.query;
      let offset = page * limit - limit;

      let products;

      if (!name && !categoryId) {
        products = await Product.findAndCountAll({ limit, offset });
      } else if (name && categoryId) {
        products = await Product.findAndCountAll({
          where: {
            name: {
              [Sequelize.Op.iLike]: `%${name}%`,
            },
            categoryId: categoryId,
          },
          limit,
          offset,
        });
      } else if (categoryId) {
        products = await Product.findAndCountAll({
          where: { categoryId },
          limit,
          offset,
        });
      } else if (name) {
        products = await Product.findAndCountAll({
          where: {
            name: {
              [Sequelize.Op.iLike]: `%${name}%`,
            },
          },
          limit,
          offset,
        });
      }
      return res.json(products);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findOne({ where: { id } });
      return res.json(product);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}

module.exports = new ProductController();
