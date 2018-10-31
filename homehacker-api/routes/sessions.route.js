const express = require('express');
const router = express.Router();
const sessionController = require('./../controllers/session.controller');

router.post('/', sessionController.create);
router.delete('/', sessionController.delete);

module.exports = router;
