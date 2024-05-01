const jwt = require("jsonwebtoken");
const secret = "raunak#212"

function setUser(user) {
    return jwt.sign({
        _id: user.id,
        email: user.email,
    }, secret)
}

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secret)

    } catch (err) {
        return null; 
    }
}

module.exports = {
    getUser,
    setUser,
};