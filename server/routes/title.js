const { Router } = require("express");
const {
    addRemoveWatchlist,
    add_remove_favs,
} = require("../controllers/TitleController");
const router = Router();

router.put("/favorite", add_remove_favs);

router.put("/watchlist", addRemoveWatchlist);

module.exports = router;
