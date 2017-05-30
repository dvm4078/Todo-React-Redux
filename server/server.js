var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var router = require('./routers');

var app = express();

mongoose.connect('mongodb://localhost:27017/redux2', {}, function (err) {
  if(err){
    console.log("Connect fail" + err);
  }
  else {
    console.log("Connected Database redux2");
  }
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use('/', router);

app.listen(8000, function (err) {
  if(err){
    console.log("Server running fail" + err);
  }else {
    console.log("Server is running on port 8000");
  }
})