const ApiError = require("../error/ApiError")

class UserController {
  async signup(req, res) {}

  async signin(req, res) {}

  async auth(req, res, next) {
    const { id } = req.query;

    if(!id){
        return next(ApiError.badRequest("не задан ID"))
    }
  }
}

module.exports = new UserController();
