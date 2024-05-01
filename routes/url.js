const exprees = require('express');
const {
    handleGenerateNewShortUrl,
    handleGetAnalytics
} = require("../controllers/url")
const router = exprees.Router();

router.post('/', handleGenerateNewShortUrl);

router.get("/analytics/:shortId",handleGetAnalytics);


module.exports = router;