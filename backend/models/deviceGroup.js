const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: String,
    devices: [String]
});

const groupModel = mongoose.model('deviceGroup', groupSchema);

module.exports = groupModel;