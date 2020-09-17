var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('test.db');



router.get('/', (req, res, next) => {    
    db.all("SELECT * FROM ToDoList;", (err, rows) => {
        res.send(rows);
    });
});

router.get('/:id', (req, res, next) => {    
    db.all("SELECT * FROM ToDoList;", (err, rows) => {        
        rows.forEach((item) => {
            if(item.ToDoListID === parseInt(req.params.id)) {res.send(item);}
        });
    });
});

router.post('/:title', (req, res, next) => {
    db.run(`INSERT INTO ToDoList (Title) VALUES ('${req.params.title}');`, () => {
        db.all("SELECT last_insert_rowid();", (err, rows) => {
            res.send(`${rows[0]['last_insert_rowid()']}`);
        });
    });
});

router.put('/:id/:title', (req, res, next) => {
    db.run(`UPDATE ToDoList SET Title = '${req.params.title}' WHERE ToDoListID = ${parseInt(req.params.id)};`, () => {
        res.end();
    });
});

router.delete('/:id', (req, res, next) => {
    db.run(`DELETE FROM ToDoList WHERE ToDoListID = ${parseInt(req.params.id)};`, () => {
        res.end();
    });
});


module.exports = router;