const express = require('express');
const router = express.Router();
const bookingController = require('./../controllers/booking.controller');
const middlewares = require('./../middlewares/secure.middleware');

//my own bookings
router.get('/', middlewares.isAuthenticated, bookingController.list); // all bookings of one user
router.delete('/:id', middlewares.isAuthenticated, bookingController.delete);

// router.get('/', middlewares.isAuthenticated, houseController.list);
// router.get('/:houseId', middlewares.isAuthenticated, houseController.get);

module.exports = router;
