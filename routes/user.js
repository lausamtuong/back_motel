const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user');


router.post('/login', user_controller.login)

router.get('/rooms', user_controller.allRoom)

router.get('/room/:id', user_controller.getRoomByID)


module.exports = router;
