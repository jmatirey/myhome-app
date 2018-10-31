const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'The name is required'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description: {
        type: String,
        // required: 'Description is required'
    },
    price:{
        type: Number,
        default: 0
    },
    start: {
		type: Date,
		// default: Date.now,
		required: 'Must have start date - default value is the created date'
	},
	end: {
		type: Date,
		required: 'Must have end date - default value is the created date + 1 week'
    },
    photos:{
        type: [String],
        default: [],
        required: 'one image is at least required'
    },
    location: {
        type: {
            type: String, 
            enum: ['Point'], 
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            required: 'the location is required'
        },
    },
    address: {
        type: String,
        required: true,
    },
    people: {
        type: Number,
        default: 2
    },
    amenities: {
        type: [String],
        default: 'No amenities included'
    }
}, {timestamps: true,
    toObject: {
        virtuals: true, 
    },
    toJSON: {
        virtuals: true, 
        transform: (doc, ret) => {
            ret.id = doc._id;
            const coordinates = ret.location.coordinates;
            delete ret.location;
            ret.location = coordinates;
            
            if (!ret.bookings) {
                ret.bookings = [];
            }
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

houseSchema.index({ "location": "2dsphere" });


//  LA INVERSA, AHORA TENGO REFERENCIA DEL BOOKING EN MI CASA
houseSchema.virtual('bookings', {
    ref: 'Booking',
    localField: '_id',
    foreignField: 'house',
    options: { sort: { createdAt: -1 } }
});

const House = mongoose.model('House', houseSchema);

module.exports = House;
