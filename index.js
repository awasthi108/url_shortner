const express = require('express');
const cookieParser = require("cookie-parser");
const {
    connectToMongoDB
} = require('./connect');
const {restrictToLoggedinUserOnly,checkAut} =require("./middlewares/auth")
const urlRoute = require("./routes/url");
const redirect = require("./routes/redirect")
const URL = require("./models/url");
const path = require("path");
const staticRouter = require("./routes/staticRouter");
const userRoute = require("./routes/user")


const app = express();
const PORT = 3000;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
    .then(() => console.log("MongoDb Connected"))
    .catch((err) => {
        console.log("Error While connecting MongoDB: ", err);
    })


app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

//MiddleWare for parsing json 
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use("/url", restrictToLoggedinUserOnly,urlRoute);
app.use("/user", userRoute);

app.use("/",checkAut,staticRouter);
app.use("/redirect", redirect);


app.listen(PORT, (err) => {
    if (err) console.log("ERROR: ", err)
    console.log(`Server started at PORT : ${PORT}`);
})
