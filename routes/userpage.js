var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:userid', function(req, res, next) {
  res.render('userpage', { isLogin: req.session.is_login, userName : req.session.name, userId : req.session.id, userEmail : req.session.email });
});

module.exports = router;
