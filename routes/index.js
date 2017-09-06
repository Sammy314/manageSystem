var express = require('express');
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var pageSize = 8;
var pagenum = 1;

/* GET home page. */
router.get('/', function(req, res, next) {
  //  res.send(req.session.login);
  var page = req.query.page ? req.query.page : 1;
  
  MongoClient.connect("mongodb://127.0.0.1:27017/newclass",function(err, db) {
        var collection = db.collection("comment");
        collection.find({

          }).limit(pageSize).skip((page-1)*8).toArray(function(err, result) {
            if(err) {
              res.send("数据库出错了");
              return;
            }

            collection.find({}).count(function(err, totalNum) {
              pageNum = Math.ceil(totalNum / pageSize);
               res.render('index',{
                  result: result,
                  pageNum: pageNum,
                  login: req.session.login,
                  username: req.session.username
               })
              db.close();
            })
          })
      })
  });

module.exports = router;
