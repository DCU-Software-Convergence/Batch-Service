var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/SignIn', function(req, res, next) {
  res.render('authSignIn');
});

router.get('/SignOut', function(req, res, next) {
    res.render('authSignOut');
});
  

module.exports = router;
