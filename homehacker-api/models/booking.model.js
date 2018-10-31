const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    house: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'House',
        required: true
    },
    start: {
		type: Date,
		// default: Date.now,
		required: 'Must have start date - default value is the created date'
	},
	end: {
        type: Date,
        
		required: 'Must have end date - default value is the created date + 1 week'
    }
}, {timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
