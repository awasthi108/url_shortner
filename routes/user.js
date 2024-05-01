const express=require("express");
const {handleUserSignup,handleLogin} = require("../controllers/user")
const router = express.Router();


router.post("/",handleUserSignup);
router.post("/login",handleLogin);

module.exports = router;