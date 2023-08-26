const { Router } = require("express");
const { add_remove_list } = require("../controllers/TitleController");
const router = Router();

router.put("/list", add_remove_list);

module.exports = router;
