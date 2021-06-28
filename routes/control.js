// 이 파일이 라우터를 관리하는 파일임

const express = require('express');
const router = express.Router();

const index = require('./index.js');
const users = require('./users.js');

router.use('/', index);
router.use('/users', users);

module.exports = router;