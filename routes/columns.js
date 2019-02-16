const express = require("express");
const router = express.Router();
const query = require("../db/db");

/**
* Retrieve columns from the db.
*
*/
router.get("/", async (req, res, next) => {
  let sql = `PRAGMA table_info(census_learn_sql)`;
  try {
    const rows = await query(sql);
    res.json(rows);
  } catch (err) {
    res.send("Error when retrieving column: " + err);
  }
});

module.exports = router;
