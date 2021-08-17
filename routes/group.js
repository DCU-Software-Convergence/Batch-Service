var express = require('express');
var router = express.Router();

var Group = require("../models/group");
var User = require('../models/user');
/* GET home page. */
router.get('/', function(req, res, next) {
    Group.find({}, function(err, group){
        res.render('groupPage', { group : group, isLogin: req.session.is_login, userName : req.session.name, userEmail : req.session.email, userID : req.session.userID });
    });
});

router.get('/:groupid', function(req, res, next) {
    res.send('group페이지');
});


router.get('/makegroup', function(req, res, next) {
    res.render('groupPageMakeGroup',{ isLogin: req.session.is_login, userName : req.session.name, userEmail : req.session.email, userID : req.session.userID});

});
router.post('/makegroup', function(req, res, next) {
    var group = new Group();
    

    group.groupName = req.body.groupName;
    group.groupExplanation = req.body.groupContents;
    group.groupUrlName = req.body.groupURL;
    group.groupMember.push(req.session.userID)
    group.groupLeader = req.session.userID;

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
            res.redirect('/group');
        }
    });
});

module.exports = router;
