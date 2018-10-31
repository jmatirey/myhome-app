const express = require('express');
const router = express.Router();
const uploader = require('./../configs/multer.config');
const userController = require('./../controllers/user.controller');
const middlewares = require('./../middlewares/secure.middleware');

//CREATE AND GET USERS

router.post('/', userController.createUser); // CREATE
router.patch('/:userId/edit', middlewares.isMe, uploader.single('image'), userController.edit);//GET USERS
router.get('/:id', userController.getUser); //GET USER BY ID
router.get('/', userController.listUsers);//GET USERS

// //GET HOME(S)
// router.get('/:userId/houses/:homeId', userController.getHouse);//GET HOME OF A USER
router.get('/:userId/houses', userController.listHousesOfUser);//GET houses OF USER ID


//USER CREATE A HOUSE
router.post('/:userId/houses', middlewares.isMe, uploader.array('photos'), middlewares.datesCheck, userController.createHouse);

//CREATE A BOOKING
router.post('/:userId/houses/:homeId/booking', middlewares.isMe, middlewares.datesCheck, middlewares.reservationsOfHouseCheck, userController.makeBooking);




module.exports = router;
