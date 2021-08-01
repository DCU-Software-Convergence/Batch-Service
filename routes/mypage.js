var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('mypage', { isLogin: req.session.is_login })
});

module.exports = router;
