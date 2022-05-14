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

router.get("/", (req, res,next) => {
    res.render("screens/login");
});

router.get("/signup", (req, res,next) => {
    res.render("screens/signup");
});

router.post("/signup/check", (req,res,next) => {
    const emailCheckQuery = `
    SELECT  email
      FROM  signup
     WHERE  email = "${req.body.email}"
     `

    conn.query(emailCheckQuery, (error, result) => {
        if (error) {
            return res.status(403).send("다시 시도해주세요.");
        } else {
            if (result.length > 0) {
                return res.status(403).send("이미 가입된 이메일이 존재합니다");
            } else {
                const userInsertQuery = `
                INSERT INTO signup(
                    email,
                    password,
                    name,
                    phone_number
                ) VALUES (
                    "${req.body.email}",
                    "${req.body.password}",
                    "${req.body.name}",
                    "${req.body.phone_number}"
                )
                `;
    
                conn.query(userInsertQuery, (error, result) => {
                    if (error) {
                        console.error(error);
                        return res.status(400).send("회원가입에 실패했습니다.");
                    } else {
                        res.redirect("/");
                    }
                });
            }
        }
        });
   
    });
    
;

router.post("/check", (req,res,next) => {
    const emailCheckQuery = `
      SELECT    email,
                password  
        FROM    signup
       WHERE    email = "${req.body.email}"
         AND    password = "${req.body.password}";
    `;
  
    conn.query(emailCheckQuery, (error,result) => {
      if(error) {
        return res.status(403).send("에러!");
            } else {
            if (result.length > 0) {
                res.render("screens/main");
            }
            else {
                return res.status(403).send("아이디 또는 비밀번호 또는 닉네임이 틀렸습니다.");
            }
        }
    });
});


module.exports = router;