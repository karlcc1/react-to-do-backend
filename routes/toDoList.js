var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('test.db');

var queryToDoList = [];

const getAllToDoList = () => {
        db.each("SELECT ToDoListID, Title FROM ToDoList;", (err, row) => {
            queryToDoList.push({'ToDoListID': row.ToDoListID, 'Title': row.Title});
        });
};

getAllToDoList();

router.get('/', (req, res, next) => {    
    getAllToDoList();
    res.send(queryToDoList);
    queryToDoList = [];
});


router.get('/:id', (req, res, next) => {
    getAllToDoList();
    res.send(queryToDoList.filter(item => {return item.ToDoListID == req.params.id}));
    queryToDoList = [];
});


module.exports = router;