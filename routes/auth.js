var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/Login', function(req, res, next) {
  res.render('authLogin');
});

router.get('/SignUp', function(req, res, next) {
    res.render('authSignUp');
});

router.post('/SignUp', function(req, res) {
    var new_user = new User();

    new_user.name = req.body.signup_user_name;
    new_user.email = req.body.signup_user_email;
    new_user.password = req.body.signup_user_password;

    new_user.save((err) => {
        if (err) console.log(err);
        else {
            console.log("회원가입 성공");
            res.render('authLogin', {email_and_password_match : true});
        }
    })
});

module.exports = router;
