const createError = require('http-errors');
const mongoose = require('mongoose');
const Booking = require('./../models/booking.model');

//BOOKINGS OF ONE USER
module.exports.list = (req, res, next)=>{

    Booking.find({user: req.user._id})
    .populate({ path: 'house', populate: {path: 'owner'}})
    .then(bookings => {  
        console.log(req.user);
              
        res.status(200).json(bookings);
    })
    .catch(error => {
        next(error);
    });
};

module.exports.delete = (req, res, next)=>{    
    Booking.findOneAndRemove({_id: req.params.id})
    .then(()=> {
        res.status(204).json();
    }) 
    .catch(error => {
        next(error);
    });
};
