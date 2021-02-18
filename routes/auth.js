var express = require('express');
var router = express.Router();
//controllers
const _AuthController = require('../controllers/AuthController');

router.post("/signup",_AuthController.singUp)
router.post("/login",_AuthController.logIn)

module.exports = router;
