const exprees = require("express");
const {
    handleShortUrl
} = require("../controllers/url")

const router = exprees.Router();

router.get("/:shortId", handleShortUrl);

module.exports = router;