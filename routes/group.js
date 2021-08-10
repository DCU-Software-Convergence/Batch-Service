var express = require('express');
var router = express.Router();

var Group = require("../models/group");
var User = require('../models/user');
/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('groupPage', { isLogin: req.session.is_login, userName : req.session.name, userEmail : req.session.email, userID : req.session.userID });
});

router.post('/', function(req, res) {
    var group = new Group();
    

    group.groupName = req.body.groupName;
    group.groupExplanation = req.body.groupContents;
    group.groupMember.push(req.session.userID)
    User.findOne({userID : req.session.userID}, (err, user) => {
        if (err) console.log(err)
        else if (user) {
            user.group.push(req.body.groupName)
        }
        else {
            res.send('잘못된 접근 입니다.');
        }
    });
    // 
    group.save(function(err) {
        if (err) {
            res.redirect('/group');
        }
        else {
            res.render('groupPage', {isLogin: req.session.is_login, userName : req.session.name, userEmail : req.session.email, userID : req.session.userID});
        }
        
    });
});

module.exports = router;
