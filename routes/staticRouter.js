const exprees = require("express");

const URL =require("../models/url")

const router = exprees.Router();

router.get("/",async (req,res)=>{
    if(!req.user) return res.redirect("/login");
    console.log(req.user);
    const allUrls = await URL.find({createdBy:req.user._id});
    return res.render("home",{
        urls:allUrls,
    });
})

router.get("/signup",(req,res)=>{
    return res.render("signup");
})
router.get("/login",(req,res)=>{
    return res.render("login");
})

module.exports =router;