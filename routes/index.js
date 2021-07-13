var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { is_login: req.session.is_login });
});

module.exports = router;
