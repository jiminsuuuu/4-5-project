const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
    res.render("screens/main");
});

router.get("/review", (req,res,next) => {
    res.render("screens/review");
});

router.get("/b/review", (req,res,next) => {
    res.render("screens/detail");
});



module.exports = router;