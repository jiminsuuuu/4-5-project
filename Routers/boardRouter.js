const express = require("express");
const dotenv = require("dotenv");
const mysql2 = require("mysql2");
dotenv.config();

const dbConfig = {
  host: process.env.host,
  port: process.env.port,
  user: process.env.user,
  password: process.env.password,
  dbName: process.env.dbName,
};

const conn = mysql2.createConnection({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.dbName,
});

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

router.post("/review", (req,res,next) => {
    const selectQuery = `
    SELECT	id,
            title
            user
      FROM	notice
    `;

    conn.query(selectQuery, (error, result) => {
        if (error) {
            return res.status(403).send("다시 시도해주세요.");
        } else {
            res.render("screens/detail", { kimchi : result});
        }
        });
});

module.exports = router;