const { Router } = require("express");
const {
    addRemoveWatchlist,
    add_to_favs,
} = require("../controllers/TitleController");
const router = Router();

router.put("/favorite", add_to_favs);

router.put("/watchlist", addRemoveWatchlist);

module.exports = router;
