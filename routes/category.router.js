const Router = require("express");
const categoryController = require("../controllers/category.controller");
const router = new Router();
const roleMiddleware = require("../middlewares/roleMiddleware");

router.post("/", roleMiddleware("admin"), categoryController.add);
router.delete("/:id", roleMiddleware("admin"), categoryController.delete);
router.get("/", categoryController.getAll);

module.exports = router;