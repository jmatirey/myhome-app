const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String
    },
    read: {
        type: Boolean,
        default: false
    }
}, {timestamps: true,
    toJSON: {
        transform: (doc, res) => {
            res.id = doc._id;
            delete res._id;
            delete res.__v;
            return res;
        }
    }
});


const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
