const jwt = require("jsonwebtoken");
const { Favorites } = require("../models/models");

module.exports = async function (req, res, next) {
  try {
    const { user } = req;

    const favorites = await Favorites.findOne({ where: { userId: user.id } });

    if (!favorites) {
      return res.status(401).json({ message: "Нет доступа" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
