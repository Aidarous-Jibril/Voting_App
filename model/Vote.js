const mongoose  = require('mongoose');

const VoteSchema = new mongoose.Schema({
    bp: {
        type: 'String',
        required: true
    },
    points: {
        type: 'String',
        required: true
    }
})

module.exports = Vote = mongoose.model('Vote', VoteSchema);