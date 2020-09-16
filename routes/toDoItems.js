const { query } = require('express');
var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('test.db');

queryItems = [];

const getItems = () => {
    db.each("SELECT * FROM ToDoItems;", (err, row) => {
        if (row.ToDoListID == 3) {console.log(row);}
    });
};
getItems();

router.get('/:tableId', (req, res, next) => {
    db.each("SELECT * FROM ToDoItems;", (err, row) => {
        if (row.ToDoListID == req.params.tableId) {queryItems.push(row);}
    });

    res.send(queryItems);
    queryItems = [];
});

module.exports = router;