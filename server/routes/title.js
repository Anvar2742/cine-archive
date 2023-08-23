const { Router } = require("express");
const { addRemoveFavorites, addRemoveWatchlist } = require("../controllers/TitleController");
const router = Router();

router.put("/favorite", addRemoveFavorites);

router.put("/watchlist", addRemoveWatchlist);

module.exports = router;
