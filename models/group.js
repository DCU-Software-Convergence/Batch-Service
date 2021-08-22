var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var groupSchema = new Schema({
    groupName : String,
    groupExplanation : String,
    groupUrlName : String,
    groupMember : Array,
    groupLeader : Array
});

module.exports = mongoose.model('group', groupSchema);