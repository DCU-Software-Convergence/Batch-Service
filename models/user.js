var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
    email: String, // 아이디
    userID: String,
	password: String, // 비밀번호
    name: String, // 이름
    group : Array
});

module.exports = mongoose.model('user', userSchema);