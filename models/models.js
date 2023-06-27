const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  surname: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  image: { type: DataTypes.TEXT },
  role: { type: DataTypes.STRING },
});

const Favorites = sequelize.define("favorites", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const FavoriteProduct = sequelize.define("favoriteProduct", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Product = sequelize.define("product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.TEXT, allowNull: false },
  address: { type: DataTypes.TEXT, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  images: { type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: false },
  views: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    defaultValue: [],
  },
});

const Category = sequelize.define("category", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

User.hasOne(Favorites);
Favorites.belongsTo(User);

User.hasMany(Product);
Product.belongsTo(User);

Favorites.hasMany(FavoriteProduct);
FavoriteProduct.belongsTo(Favorites);

Product.hasMany(FavoriteProduct);
FavoriteProduct.belongsTo(Product);

Category.hasMany(Product);
Product.belongsTo(Category);

module.exports = {
  User,
  Favorites,
  FavoriteProduct,
  Product,
  Category,
};
