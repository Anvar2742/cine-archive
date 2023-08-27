const { Router } = require("express");
const { add_remove_default_lists, get_collectioin_titles } = require("../controllers/TitleController");
const router = Router();

router.put("/default_lists", add_remove_default_lists);

router.post("/default_lists", get_collectioin_titles)

module.exports = router;
