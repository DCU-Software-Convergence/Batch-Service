var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/:userid', function(req, res, next) {
  User.findOne({userID : req.params.userid}, (err, user) => {
    if (err) console.log(err);
    else if (user) {
      if (req.session.userID == req.params.userid) { // 자신의 유저 페이지에 접속 했을때 수정 기능 추가 할 것
        res.render('userpage', { isLogin: req.session.is_login, userName : req.session.name, userId : req.session.idcode, userEmail : req.session.email, userID : req.session.userID });
      }
      else { // 로그인안한 사용자 + 로그인 했지만 다른 사용자를 볼떄
        res.render('userpage', { isLogin: req.session.is_login, userName : user.name, userEmail : user.email});
      }
    }
    else {
      res.send('유저를 찾을 수 없음');
    }
  });

  
});

module.exports = router;