var express = require('express');
var router = express.Router();

var Group = require("../models/group");
var User = require('../models/user');
/* GET home page. */
router.get('/', function(req, res, next) {
    var myGroup = new Array();
    
    User.findOne({userID : req.session.userID}, (err, user) => {
        var myGroupName = user.group;
        console.log(myGroupName);
        for (var gName of myGroupName) {
            Group.findOne({groupName : gName}, (err, group) => {
                myGroup.push(group);
                console.log(group);
            });
        }
        console.log(myGroup);
    });


    Group.find({}, function(err, group){

        res.render('groupPage', { group : group, isLogin: req.session.is_login, userName : req.session.name, userEmail : req.session.email, userID : req.session.userID });
    });
});
router.get('/test', function(req, res, next) {
    res.render('canvasTest');
})

router.get('/grouplist/:groupid', function(req, res, next) {
    Group.findOne({groupUrlName:req.params.groupid}, (err, group) => {
        if (err) {
            res.render('error');
        }
        else if (group) {


            res.render('groupPageInfo', {isLogin: req.session.is_login,userName : req.session.name, groupName : group.groupName, groupExplanation : group.groupExplanation, groupMember : group.groupMember});
        }
        else {
            res.send('그룹을 찾을 수 없습니다.')
        }
    });
});


router.get('/makegroup', function(req, res, next) {
    res.render('groupPageMakeGroup',{ isLogin: req.session.is_login, userName : req.session.name, userEmail : req.session.email, userID : req.session.userID});

});
router.post('/makegroup', function(req, res, next) {
    var group = new Group();
    

    group.groupName = req.body.groupName;
    group.groupExplanation = req.body.groupContents;
    group.groupUrlName = req.body.groupURL;
    group.groupMember.push(req.session.userID);
    group.groupLeader.push(req.session.userID);
    User.findOneAndUpdate({userID : req.session.userID}, { $push : {group : req.body.groupName}}, function(err, success) {
        if (err) {
            console.log(err);
        }
    });
    /*
    User.findOne({userID : req.session.userID}, (err, user) => {
        console.log("유저 찾음");
        if (err) console.log(err)
        else if (user) {
            user.group.push(req.body.groupName)
        }
        else {
            res.send('잘못된 접근 입니다.');
        }
    });
    */
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
