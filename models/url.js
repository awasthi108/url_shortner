const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        require: true,
        unique: true,
    },
    redirectUrl: {
        type: String,
        require: true,
    },
    visitHistory: [{
        timeStamp: {
            type: Number
        }
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    }
}, {
    timeStamp: true
})

const URL = mongoose.model('url', urlSchema);

module.exports = URL;