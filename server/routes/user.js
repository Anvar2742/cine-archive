const Router = require("express");
const { single_user_get } = require("../controllers/UserController");
const { approveAndCreateSession } = require("../controllers/TMDBController");
const router = Router();

router.get("/user", single_user_get);

router.put("/user/request_token", approveAndCreateSession);

module.exports = router;
