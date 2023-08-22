import { single_user_get } from "../controllers/UserController";

const Router = requier("express");
const router = Router();

router.get("/user", single_user_get);
