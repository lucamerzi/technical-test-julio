const express = require("express");
const router = express.Router();
const query = require("../db/db");

/**
* Retrieve rows and total number of rows from the db.
*
*/
router.post("/", async (req, res, next) => {
  let selectedVar;
  if (!req.body.selectedVar) {
    selectedVar = "class of worker";
  } else {
    selectedVar = req.body.selectedVar;
  }

  let sql = `select value, count(*) as count, avg(age) as average_age from
    (
    select  [${selectedVar}] as value, age
    from census_learn_sql 
    where [${selectedVar}] is not null
    )
    group by value
    order by count desc
    limit 100
    `;
  let sql2 = `select count(*) as row_number from
    (select value, count(*) as count, avg(age) as average_age from
      (
      select  [${selectedVar}] as value, age
      from census_learn_sql 
      where [${selectedVar}] is not null
      )
    group by value
    order by count desc)
    `;

  try {
    const arrays = await Promise.all([query(sql), query(sql2)]);
    res.json({
      rowCount: arrays[1][0]["row_number"],
      rows: arrays[0]
    });
  } catch (err) {
    res.send("Error when retrieving column or during count: " + err);
  }
});

module.exports = router;
