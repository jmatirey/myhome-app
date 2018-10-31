const express = require('express');
const router = express.Router({mergeParams: true});
const chatController = require('./../controllers/chats.controller');
const middlewares = require('./../middlewares/secure.middleware');

router.get('/:userId/messages', chatController.list); //que middleware le pongo porque el de isme no valdria y el isauth no me va????
router.post('/:userId/message', middlewares.chatSecure, chatController.create); // create a chat to someone

// /users/:userId/messages

module.exports = router;
