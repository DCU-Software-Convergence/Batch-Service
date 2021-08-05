var express = require('express');
var router = express.Router();

var Group = require("../models/group");

/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('groupPage', { isLogin: req.session.is_login, userName : req.session.name, userEmail : req.session.email });
});

router.post('/', function(req, res) {
    var group = new Group();

    group.groupName = req.body.groupName;
    group.groupExplanation = req.body.groupContents;

    group.save(function(err) {
        if (err) {
            res.redirect('/group');
        }
        res.redirect('/group');
    });
});

module.exports = router;
