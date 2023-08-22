const { Router } = require("express");
const { addToFavorites } = require("../controllers/TitleController");
const router = Router();

router.put("/favorite", addToFavorites);

module.exports = router;
