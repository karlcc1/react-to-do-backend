// PS> $env:DEBUG='myapp:*'; npm start

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const sqlite3 = require('sqlite3');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testAPI');
var toDoListRouter = require('./routes/toDoList');
const { appendFileSync } = require('fs');
const { runInContext } = require('vm');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testAPI', testAPIRouter);
app.use('/toDoList', toDoListRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const populatedb = () => {
  const sql_create1 = `CREATE TABLE IF NOT EXISTS ToDoList (
    ToDoListID INTEGER PRIMARY KEY AUTOINCREMENT,
    Title TEXT);`;
  
  const sql_create2 = `CREATE TABLE IF NOT EXISTS ToDoItems (
    ToDoItemID INTEGER PRIMARY KEY AUTOINCREMENT,
    ToDoListID INTEGER,
    Name TEXT,
    CONSTRAINT Tasks_FK_ToDoListID FOREIGN KEY (ToDoListID)
      REFERENCES ToDoList(ToDoListID) ON UPDATE CASCADE ON DELETE CASCADE
    );`;
    
  const sqlinsert1 = `INSERT INTO ToDoList (Title) VALUES (?);`;
    
  db.run(sql_create1);
  console.log("todolist table created");
  
  db.run(sql_create2);
  console.log("todoitems table created");
  
  // db.run(sqlinsert1, ['One']);
  // db.run(sqlinsert1, ['Two']);
  // db.run(sqlinsert1, ['Three']);
  // console.log("inserted into todolist");
};

const querydb = () => {
  const query1 = `SELECT * FROM ToDoList;`;
  const res_query1 = db.all(query1);
  console.log(res_query1);
};

var db = new sqlite3.Database('./test.db', (err) => {
  if (err) {
    console.log('Could not connect to database', err)
  } else {
    console.log('Connected to database');
    db.serialize(populatedb);
    db.close();
  }
})




module.exports = app;