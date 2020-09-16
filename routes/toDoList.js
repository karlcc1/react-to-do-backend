var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3');
// var db = new sqlite3.Database('test.db')


router.get('/', (req, res, next) => {
    res.send("get todolist api");
});

module.exports = router;