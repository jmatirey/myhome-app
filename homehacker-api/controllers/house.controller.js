const createError = require('http-errors');
const mongoose = require('mongoose');
const House = require('./../models/house.model');
const Booking = require('./../models/booking.model');
const User = require('./../models/user.model');

//CARGA TODAS LAS CASAS SOLO OFRECIENDO 50 HASTA QUE SE LLEVE A CABO LA BUSQUEDA FILTRADA
module.exports.list = (req, res, next)=>{  
    console.log('LIST ALL HOUSES');
    House.find({$and:[{start:{ $gte: Date.now()}}]})
    .populate('owner') 
    // .populate({ path: 'bookings', populate: { path: 'user' } }) 
    .limit(50)
    .sort({price: 1})
    .then(houses => {  
        console.log(houses.length);
        
        res.status(200).json(houses);
    })
    .catch(error => {        
        next(error);
    });
};

// //BY DATES RANGE
// module.exports.listByDateRange = (req, res, next)=>{    
//     House.find({$and: [{start:{ $lte: req.query.start}},{end:{ $gte: req.query.end}}]}) // BOOSCAR SOBRE BOOKINGS
//     .populate('owner')
//     .then(houses => {    
//         console.log(houses);
        
//         res.status(200).json(houses);
//     })
//     .catch(error => {  
//         console.log(error);
//         next(error);
//     });
// };

//GET ONE
module.exports.get = (req, res, next)=>{
    console.log('GET ONE HOUSE');
    
    House.findById(req.params.houseId)
    .populate('owner')
    .populate('bookings')
    .then(house => {        
        res.status(200).json(house);
    })
    .catch(error => next(error));
};

//BY FILTER
module.exports.filteredSearch = (req, res, next) => {
    console.log(req.query);
    
    const people = Number(req.query.people);

    Booking.find({
        $or:[ 
            {$and:[{start:{$lte:req.query.start}},{end:{$gte:req.query.start}}]} ,
            {$and:[{start:{$lte:req.query.end}},{end:{$gte:req.query.end}}]},
            {$and:[{start:{$gte:req.query.start}},{end:{$lte:req.query.end}}]}]}
        )
        .then(bookings => {
            const houseIdsOfHousesNotToShow = [];
            for (let booking of bookings) {
                houseIdsOfHousesNotToShow.push(booking.house);
            }
            // owner: { $ne: req.user._id }
            return House
                .find({
                    
                    _id: { $nin: houseIdsOfHousesNotToShow },
                    people: { $gte: people },
                    start: { $lte: new Date(req.query.start) },
                    end: { $gte: new Date(req.query.end) },
                    location: {
                        $near: {
                            $geometry: {
                                type: 'Point',
                                coordinates: [ req.query.longitude, req.query.latitude ]
                            },
                            $minDistance: 0,
                            $maxDistance: req.query.range
                        }
                    }
                    }).sort({price: 1})
                    .populate('owner')
                    .then(houses => {
                        console.log(houses.length);
                        
                        res.json(houses);
                    });
        }).catch(error => next(error))        
    };
            
//REMOVE ONE HOUSE OF ONE USER
module.exports.deleteOneHouseOfUser = (req, res, next)=>{            

    Promise.all([
        House.findByIdAndDelete(req.params.id),
        Booking.deleteMany({house: req.params.id})
    ])
    .then(() => { 
        
        res.status(204).json();
    })
    .catch(error => {
        next(error);
    });
    
};
            
            