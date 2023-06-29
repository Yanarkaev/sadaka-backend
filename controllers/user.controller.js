const ApiError = require("../error/ApiError");
const { User, Favorites } = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJwt = (id, name, surname, phone, role) => {
  return jwt.sign(
    {
      id,
      name,
      surname,
      phone,
      role,
    },
    process.env.SECRET_JWT,
    { expiresIn: "7d" }
  );
};

class UserController {
  async signup(req, res, next) {
    try {
      const { name, surname, phone, password, role } = req.body;
      const phonePattern =
        /^\+?\d{1,3}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/;

      if (!name.trim()) {
        return next(ApiError.badRequest("Введите имя"));
      } else if (!phonePattern.test(phone)) {
        return next(ApiError.badRequest("Недопустимый номер телефона"));
      }

      const condidate = await User.findOne({ where: { phone } });

      if (condidate) {
        return next(ApiError.badRequest("Такой номер телефона уже существует"));
      }

      const hashPassword = await bcrypt.hash(
        password,
        Number(process.env.HASH_SALT)
      );
      const user = await User.create({
        name,
        surname,
        phone,
        password: hashPassword,
        role,
      });
      const favorites = await Favorites.create({ userId: user.id });
      const token = generateJwt(
        user.id,
        user.name,
        user.surname,
        user.phone,
        user.role
      );

      return res.json({ token });
    } catch (error) {
      return next(ApiError.badRequest(error.message));
    }
  }

  async signin(req, res, next) {
    try {
      const { phone, password } = req.body;
      const user = await User.findOne({ where: { phone } });
      if (!user) {
        return next(ApiError.internal("Неверный номер или пароль"));
      }

      let comparePassword = bcrypt.compareSync(password, user.password);

      if (!comparePassword) {
        return next(ApiError.internal("Неверный номер или пароль"));
      }

      const token = generateJwt(
        user.id,
        user.name,
        user.surname,
        user.phone,
        user.role
      );

      return res.json({ token });
    } catch (error) {
      return next(ApiError.badRequest(error.message));
    }
  }

  async auth(req, res, next) {
    try {
      const token = generateJwt(
        user.id,
        user.name,
        user.surname,
        user.phone,
        user.role
      );

      return res.json({ token });
    } catch (error) {
      return next(ApiError.badRequest(error.message));
    }
  }
}

module.exports = new UserController();
