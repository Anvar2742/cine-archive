const { Router } = require("express");
const { addRemoveFavorites } = require("../controllers/TitleController");
const router = Router();

router.put("/favorite", addRemoveFavorites);

module.exports = router;
