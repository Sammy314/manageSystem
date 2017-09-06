var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/list', function (req, res) {
  res.send('Hello list!');
});

var server = app.listen(3000);