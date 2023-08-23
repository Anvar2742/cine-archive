const Router = require("express");
const { single_user_get } = require("../controllers/UserController");
const { approveRequestToken } = require("../controllers/ApproveReqToken");
const router = Router();

router.get("/user", single_user_get);

router.put("/user/request_token", approveRequestToken);

module.exports = router;
