const { Router } = require("express");
const { add_remove_default_lists } = require("../controllers/TitleController");
const router = Router();

router.put("/default_lists", add_remove_default_lists);

module.exports = router;
