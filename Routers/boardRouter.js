const express = require("express");
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        console.log(req);
        res.json(req);
    }   catch (err) {
        console.log(err);
        return next(err);
    }
 });

module.exports = router;