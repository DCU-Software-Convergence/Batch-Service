var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { isLogin: req.session.is_login, userName : req.session.name, userEmail : req.session.email, userID : req.session.userID });
});

module.exports = router;
