var express = require('express');
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('comment',{});
});

router.get('/addComment', function(req, res, next) {
  var content = req.query.content;
  // res.send(JSON.stringify(req.query))

  if(!content){
    res.send("请填写评论内容");
    return;
  }
  MongoClient.connect("mongodb://127.0.0.1:27017/newclass",function(err, db) {
    //往数据库输入的数据一定要做转义，防止sql注入
        var collection = db.collection("comment");
        collection.save({
          comment : content
        },function(err, result) {
          if(err){
            res.send("数据库操作失败")
          }else {
            res.send("发表留言成功")
          }
          db.close();
        })
    })
});

module.exports = router;