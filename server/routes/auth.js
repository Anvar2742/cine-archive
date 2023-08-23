const { Router } = require("express");
const {
    signup_post,
    login_post,
    refresh,
} = require("../controllers/AuthController");
const { logout } = require("../controllers/LogoutController");
const router = Router();

router.post("/signup", signup_post);

router.post("/login", login_post);

router.get("/refresh", refresh);

router.post("/logout", logout);

module.exports = router;
