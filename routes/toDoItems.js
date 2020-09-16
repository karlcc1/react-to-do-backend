const { query } = require('express');
var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('test.db');

router.get('/:tableId', (req, res, next) => {
    db.all(`SELECT * FROM ToDoItems WHERE ToDoListID = ${req.params.tableId}`, (err, rows) => {
        // console.log(rows);
        res.send(rows);
    })
});

module.exports = router;