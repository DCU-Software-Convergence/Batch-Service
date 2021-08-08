var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET home page. */
router.get('/Login', function(req, res, next) {
  res.render('authLogin',  {email_and_password_match : true});
});

router.get('/SignUp', function(req, res, next) {
    res.render('authSignUp');
});

router.get('/Logout', function(req, res, next) {
    req.session.destroy();
    res.redirect('/');
});

router.post('/SignUp', function(req, res) {
    var new_user = new User();

    new_user.name = req.body.signup_uname;
    new_user.email = req.body.signup_email;
    new_user.password = req.body.signup_pswd;
    var i = req.body.signup_email.indexOf('@');
    new_user.userID = req.body.signup_email.slice(0, i);

    new_user.save((err) => {
        if (err) console.log(err);
        else {
            console.log("회원가입 성공");
            res.render('authLogin', {email_and_password_match : true});
        }
    })
});

router.post('/Login', function(req, res) {
    User.findOne({email : req.body.login_email, password : req.body.login_pswd}, (err, user) => {
        if (err) console.log(err);
        else if (user) {
            console.log("로그인 성공");
            console.log(user);
            console.log(user.name);
            req.session.idcode = user._id;
            req.session.name = user.name;
            req.session.email = user.email;
            req.session.userID = user.userID;
            req.session.is_login = true;
            req.session.save(function() { // 세션을 세션 스토어에 저장이 끝나면 function()이 실행됩니다. save() 부분이 없다면, session store에 저장하는 일보다 redirect가 먼저 실행되어 로그인 상태가 유지가 안되는 버그(?)가 발생할 수 있습니다.
                res.redirect('/');
            });
        }
        else {
            res.render('authLogin', {email_and_password_match : false});

        }
    });
});

module.exports = router;
