var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var groupSchema = new Schema({
    groupName : String,
    groupExplanation : String,
    groupUrlName : String,
    groupMember : Array,
    groupLeader : String
});

module.exports = mongoose.model('group', groupSchema);