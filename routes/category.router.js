const Router = require("express");
const categoryController = require("../controllers/category.controller");
const router = new Router();

router.post("/", categoryController.add);
router.get("/", categoryController.getAll);

module.exports = router
