const { Router } = require("express");
const { signup_post, login_post } = require("../controllers/AuthController");
const { logout } = require("../controllers/LogoutController");
const router = Router();

router.post("/signup", signup_post);

router.post("/login", login_post);

router.post("/logout", logout);

module.exports = router;
