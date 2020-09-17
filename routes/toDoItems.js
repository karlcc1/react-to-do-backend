const { query } = require('express');
var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('test.db');

router.get('/:tableId', (req, res, next) => {
    db.all(`SELECT * FROM ToDoItems WHERE ToDoListID = ${req.params.tableId}`, (err, rows) => {
        res.send(rows);
    })
});

router.post('/:tableid/:name', (req, res, next) => {
    db.run(`INSERT INTO ToDoItems (ToDoListID, Name) VALUES (${parseInt(req.params.tableid)}, '${req.params.name}');`, () => {
        console.log(req.params.tableid, req.params.name);
        db.all("SELECT last_insert_rowid();", (err, rows) => {
            res.send(`${rows[0]['last_insert_rowid()']}`);
        });
    });
});

router.delete('/:itemid', (req, res, next) => {
    db.run(`DELETE FROM ToDoItems WHERE ToDoItemID = ${req.params.itemid};`, () => {
        res.end();
    })
});



module.exports = router;