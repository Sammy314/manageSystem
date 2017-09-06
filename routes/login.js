var express = require('express');
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var multipart = require("connect-multiparty");
var multipartMiddleware = multipart();
var fs = require("fs");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("register",{link:"login/checkUser"});
});

router.get('/logout', function(req, res, next) {
  req.session.login = null;
  req.session.username = null;
  res.redirect("/")
});

router.get('/addAvatar', function(req, res, next) {
  res.render("addAvatar");
});

router.post('/uploadImg', multipartMiddleware, function(req, res, next) {
    fs.rename(req.files.avatar.path, "./public/images/" + req.files.avatar.name, function(err) {
        console.log(err);
    })
//   console.log(req.files);
});

router.post('/checkUser', function(req, res, next) {
    var username = req.body.username,
        password = req.body.password;

    if(!username || !password){
        res.send("请输入正确的用户名或密码");
        return;
    }

    MongoClient.connect("mongodb://127.0.0.1:27017/newclass",function(err, db) {
        var collection = db.collection("user");
        collection.find({
            username:username,
            password:password
        }).toArray(function(err, result) {
            // if(err) {
            //     res.send(err);
            // }
            if(result.length){
                req.session.login = true;
                req.session.username = result[0].username;
                // res.send("登录成功")
                res.render("register_succ");
            }else {
                res.send("登录失败");
            }
            db.close();
        });
    })
});


module.exports = router;
