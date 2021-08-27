var express = require('express');
var router = express.Router();

var Group = require("../models/group");
var User = require('../models/user');
/* GET home page. */

/*
router.get('/', function(req, res, next) {
    var myGroup = new Array();
    var groupObject = new Object();
    User.findOne({userID : req.session.userID}, (err, user) => {
        var myGroupName = user.group;   
        myGroupName = myGroupName.filter(function(e){return e}); 
        console.log(myGroupName);   // 1
        for (var gName of myGroupName) {
            Group.findOne({groupName : gName}, (err, group) => {
                console.log(group);     // 4
                console.log(typeof(group));     // 5
                myGroup.push(group);
            });
        }
    });
    

    Group.find({}, function(err, group){
        console.log('출력');        // 2
        console.log(myGroup);      // 3
        res.render('groupPage', { group : group, isLogin: req.session.is_login, userName : req.session.name, userEmail : req.session.email, userID : req.session.userID });
    });
});
*/
router.get('/', async function(req, res, next) {
    console.log(req.session.is_login);
    if (req.session.is_login) {
        
        await User.findOne({email : req.session.email}, async (err, user) => {
            var myGroup = new Array();
            var myGroupName = user.group;

            myGroupName = myGroupName.filter(function(e){return e});
            for (var gName of myGroupName) {
                await Group.findOne({groupName : gName}, (err, group) => {
                    myGroup.push(group);

                });
            }

            await Group.find({}, function(err, group){ 
                res.render('groupPage', { group : group,
                    isLogin: req.session.is_login,
                    userName : req.session.name,
                    userEmail : req.session.email,
                    userID : req.session.userID,
                    myGroup : myGroup 
                });
            });
        });
    }

    else {
        await Group.find({}, function(err, group){
            res.render('groupPage', { group : group,
                isLogin: req.session.is_login,
                userName : req.session.name,
                userEmail : req.session.email,
                userID : req.session.userID 
            });
        });
    }
});
router.get('/test', function(req, res, next) {
    res.render('canvasTest', {isLogin: req.session.is_login,
        userName : req.session.name,
        userEmail : req.session.email,
    });
})

router.get('/grouplist/:groupid', function(req, res, next) {
    Group.findOne({groupUrlName:req.params.groupid}, (err, group) => {
        if (err) {
            res.render('error');
        }
        else if (group) {


            res.render('groupPageInfo', {isLogin: req.session.is_login,
                userName : req.session.name,
                userEmail : req.session.email,
                groupName : group.groupName,
                groupExplanation : group.groupExplanation,
                groupMember : group.groupMember
            });
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
    group.groupMember.push(req.session.email);
    group.groupLeader.push(req.session.email);
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
