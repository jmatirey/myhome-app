const createError = require('http-errors');
const mongoose = require('mongoose');
const Message = require('./../models/messages.model');

//CHATS WITH THAT USER
module.exports.list = (req, res, next)=>{
    
    // A VECES ME DA UNDEFINED AQUI=> era porque ARRNCABA CON NPM RUN START !!!
    Message.find({$or:[{$and:[{from: req.user._id},{to: req.params.userId}]},{$and:[{from: req.params.userId},{to: req.user._id}]}]})
    .populate('from')
    .populate('to')
    .then(messages => {         
        res.status(201).json(messages);
    })
    .catch(error => {
        next(error);
    });
};

//CREATE ONE CHAT WITH A MESSAGE
module.exports.create = (req, res, next)=>{   
    console.log(req.body);
           
    const message = new Message({from: req.user._id, to: req.params.userId, text
        : req.body.text});
    message.save()
    .then(message => {
        return Message.findById(message.id)
        .populate('from')
        .populate('to')
        .then(message => {
            console.log(1111, message);
            
            res.status(201).json(message);
        });
        
    })
    .catch(error => {
        next(error);
    });
};
