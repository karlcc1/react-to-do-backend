var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('test.db');

// var queryToDoList = [];

// const getAllToDoList = () => {
//     db.serialize(() => {
//         db.each("SELECT ToDoListID, Title FROM ToDoList;", (err, row) => {
//             queryToDoList.push({'ToDoListID': row.ToDoListID, 'Title': row.Title});
//         });
//     });
// };

// db.all("SELECT * FROM ToDoList;", (err, rows) => {
//     console.log(rows);
//     console.log("db all fin", typeof rows);
// });

router.get('/', (req, res, next) => {    
    // getAllToDoList();

    db.all("SELECT * FROM ToDoList;", (err, rows) => {
        // console.log(rows);
        // console.log("db all fin", typeof rows);
        res.send(rows);
    });
    
    // queryToDoList = [];
});


router.get('/:id', (req, res, next) => {
    // getAllToDoList();
    
    db.all("SELECT * FROM ToDoList;", (err, rows) => {        
        rows.forEach((item) => {
            if(item.ToDoListID === parseInt(req.params.id)) {res.send(item);}
        });
    });

    // queryToDoList = [];
});


module.exports = router;