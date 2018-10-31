const createError = require('http-errors');
const User = require('./../models/user.model');
const Booking = require('./../models/booking.model');
const mongoose = require('mongoose');
const moment = require('moment');

module.exports.isAuthenticated = (req, res, next) =>{ 
   
  if(req.isAuthenticated()){      
    console.log('you are auth back');
    next();
  } else{    
    console.log('you are not auth back');
    throw createError(403);
  }
};

module.exports.isMe = (req, res, next) =>{    
  if(!req.isAuthenticated()){
    throw createError(403);
  } else if(!req.user._id.equals(req.params.userId)){
    throw createError(401, `You are trying to access with another id`);
  } else{
    console.log(`passed is me`);
    next();
  }
};

module.exports.chatSecure = (req, res, next) =>{  
  if(!req.isAuthenticated()){
    throw createError(403);
  } else if(req.user.id == req.params.to){
    throw createError(401, `You cannot send a message to yourself`);
  } else{
    console.log(`passed is me`);
    next();
  }
};

module.exports.datesCheck = (req, res, next) =>{   
  
  if (req.query.start && req.query.end) {
    if (new Date(req.query.start) < new Date()) {      
      throw createError(401, `The starting date is before today`);
    } else if(new Date(req.query.start) > new Date(req.query.end)){
      throw createError(401, `The starting date is later than the ending date`);
    } else{
      console.log('passed dates validation(no wrong dates) having query');
      next();
    }
  } else if(req.body.start && req.body.end){
    if (new Date(req.body.start) < new Date()) {
      throw createError(401, `the start date is before today`);
    } else if(new Date(req.body.start) > new Date(req.body.end)){
      throw createError(401, `The start date is after the end date`);
    }  else{
      console.log('passed dates validation(no wrong dates) having body');
      next();
    }
  }
};   


// module.exports.checkBookigsOfAllHousesToDisplayAvailableHouses = (req, res, next) =>{


//   Booking.find({$or:[{$and:[{start:{$lte:req.query.start}},{end:{$gte:req.query.start}}]} , {$and:[{start:{$lte:req.query.end}},{end:{$gte:req.query.end}}]}, {$and:[{start:{$gte:req.query.start}},{end:{$lte:req.query.end}}]}]})
//   .then(bookings => {    
//     if (bookings.length > 0) {    


//     } else{
//       console.log('no overall bookings yet');
//       next();
//     }
//   })
//   .catch(error => { 
//     console.log(error);

//     next(error);
//   });
// };


module.exports.reservationsOfHouseCheck = (req, res, next) =>{    
  Booking.find({house: req.params.homeId})
  .then(bookings => {    
    if (bookings.length > 0) {
      let inConflict = false;
      
      for (let i = 0; i < bookings.length; i++) {
        
        const collision1 = moment(bookings[i].start).isSameOrBefore(new Date(req.body.start)) && moment(new Date(req.body.start)).isSameOrBefore(bookings[i].end);
        const collision2 = moment(bookings[i].start).isSameOrBefore(new Date(req.body.end)) && moment(new Date(req.body.end)).isSameOrBefore(bookings[i].end);
        const collision3 = moment(new Date(req.body.start)).isSameOrBefore(bookings[i].start) && moment(new Date(req.body.end)).isSameOrAfter(bookings[i].end);
        
        if (collision1 || collision2 || collision3) {
          inConflict = true;
          break;
        }
      }
      
      if (inConflict) {
        inConflict = false;
        console.log(`You booking is in conflict with other booking`);
        throw createError(403, `Your booking is in conflict with other booking`);
      } else{
        console.log('you booking is not in conflict with other bookings');
        next();
      }
      
    } else{
      console.log('passed check reservations of this house - no bookings yet in this house');
      next();
    }
  })
  .catch(error => { 
    console.log(error);
    
    next(error);
  });
};