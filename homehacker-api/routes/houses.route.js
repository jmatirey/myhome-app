const express = require('express');
const router = express.Router();
const houseController = require('./../controllers/house.controller');
const middlewares = require('./../middlewares/secure.middleware');

//GET HOUSES
// router.get('/filterSearchHomePage', houseController.listByFilteredInHomePage);
router.delete('/:id', middlewares.isAuthenticated, houseController.deleteOneHouseOfUser); // delete one house of one user
router.get('/filter', middlewares.isAuthenticated, middlewares.datesCheck, houseController.filteredSearch); // 

router.get('/', middlewares.isAuthenticated, houseController.list);
router.get('/:houseId', middlewares.isAuthenticated, houseController.get);

module.exports = router;
