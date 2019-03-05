const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
    deviceId: String,
    logsArray: [{date: String, action: String}]
});

const logModel = mongoose.model('log', logSchema);

module.exports = logModel;