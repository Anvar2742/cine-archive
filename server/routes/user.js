const Router = require("express");
const { single_user_get } = require("../controllers/UserController");
const router = Router();

router.get("/user", single_user_get);

module.exports = router;
