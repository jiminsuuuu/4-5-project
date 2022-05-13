const express = require("express");
const boardControllers = require("../Controllers/boardController");
const router = express.Router();

router.get("/notice", (req, res, next) => {
    res.render("screens/notice");
});
router.get("/review", (req, res, next) => {
    res.render("screens/review");
});
router.get("/detail", (req, res, next) => {
    res.render("screens/detail");
});



module.exports = router;