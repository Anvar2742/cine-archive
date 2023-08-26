const { Router } = require("express");
const { add_remove_default_list } = require("../controllers/TitleController");
const router = Router();

router.put("/default_lists", add_remove_default_list);

module.exports = router;
