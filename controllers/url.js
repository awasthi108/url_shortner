const ShortUniqueId = require('short-unique-id');
const URL = require('../models/url');
const {
    json
} = require('express');
const uid = new ShortUniqueId({
    length: 8
});
async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({
        error: "url is required"
    });
    const shortId = uid.rnd();

    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });

    return res.render("home", {
        id: shortId,
    })

}

async function handleGetAnalytics(req, res) {
    let shortId = req.params.shortId;
    let result = await URL.findOne({
        shortId: shortId
    });

    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    })
}


async function handleShortUrl(req, res) {
    let shortId = req.params.shortId;

    let result = await URL.findOneAndUpdate({
        shortId: shortId
    }, {
        $push: {
            visitHistory: {
                timeStamp: Date.now()
            }
        }
    })

    return res.redirect(result.redirectUrl);
}
module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics,
    handleShortUrl,
}