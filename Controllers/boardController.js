const db = require("../db");

const noticeController = (req, res) => {
  const selectQuery = `
  SELECT	id,
            title,
            user,
            DATE_FORMAT(createdAt, "%Y.%m.%d") 	AS createdAt
    FROM	notice
   ORDER    BY  createdAt DESC
  `;

  try {
    db.query(selectQuery, (error, rows) => {
      if (error) {
        console.log(" -- 데이터베이스 쿼리 실행 오류 --");
        console.error(error);
      }

      res.render("notice", { potato: rows });
    });
  } catch (error) {
    console.error(error);
    res.render("index");
  }
};
const reviewScreenController = (req, res) => {
  res.render("review");
};

const reviewPostController = (req, res) => {
  const insertQuery = `
    INSERT INTO notice 
    (
        title,
        content,
        user,
        createdAt
    )   VALUES 
    (
      "${req.body.title}",
      "${req.body.content}",
      "${req.body.user}",
      now()
    )
  `;

  try {
    db.query(insertQuery, (error, rows) => {
      if (error) {
        console.error(error);
        throw "데이터베이스 에러 발생!";
      }

      res.redirect("/b/notice");
    });
  } catch (error) {
    console.error(error);
    res.render("index");
  }
};

const boardControllers = {
  noticeController,
  reviewScreenController,
  reviewPostController,
};

module.exports = boardControllers;