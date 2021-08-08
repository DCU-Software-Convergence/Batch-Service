var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/:userid', function(req, res, next) {

  if (req.session.userID == req.params.userid) { // 로그인 되었을때
    res.render('userpage', { isLogin: req.session.is_login, userName : req.session.name, userId : req.session.idcode, userEmail : req.session.email, userID : req.session.userID });
  }
  else {
    User.findOne({userID : req.params.userid}, (err, user) => {
      if (err) console.log(err);
      else if (user) {
        res.render('userpage', { isLogin: req.session.is_login, userName : user.name, userEmail : user.email});
      }
    });
  }
  
});

module.exports = router;
