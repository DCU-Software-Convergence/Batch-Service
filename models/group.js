var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var groupSchema = new Schema({
    groupName : String,
    groupExplanation : String,
    groupMember : Array
});

module.exports = mongoose.model('group', groupSchema);