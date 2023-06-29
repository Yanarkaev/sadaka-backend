const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const [type, token] = req.headers.authorization.split(" ");

    if (!token) {
      return res.status(401).json({ message: "Вы не авторизовались" });
    }

    else if(type !== "Bearer"){
      return res.status(401).json({ message: "Неверный тип токена" });

    }

    const decoded = jwt.verify(token, process.env.SECRET_JWT);

    req.user = decoded;
    next();

  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
