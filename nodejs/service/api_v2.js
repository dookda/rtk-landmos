const express = require('express');

const app = express.Router();
const db = require("./db").db;

// new api
app.post("/apiv2/selectmultidata", (req, res) => {
    const { stat_code, start_date, end_date } = req.body;
    let codes = JSON.parse(stat_code)
    let where = `stat_code='${codes[0]}'`;
    if (stat_code.length > 1) {
        for (let i = 1; i < codes.length; i++) {
            where += ` OR stat_code='${codes[i]}'`
        };
    }

    const sql = `SELECT stat_code, CONCAT('station',stat_code) as sta_code_t, de, dn, dh, ts7,TO_CHAR(ts7, 'YYYY/MM/DD HH24:MI') as ts7t, status 
                FROM dataset 
                WHERE (${where}) AND ts7 BETWEEN '${start_date}' AND '${end_date} 24:00:00' ORDER BY  stat_code,ts7`;
    db.query(sql).then((r) => {
        res.status(200).json({
            data: r.rows
        });
    });
})

app.get("/apiv2/basestation", (req, res) => {
    const sql = `SELECT * FROM base_sta`;
    db.query(sql).then((r) => {
        res.status(200).json(r.rows);
    });
})


module.exports = app;