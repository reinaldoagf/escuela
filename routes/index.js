var express = require('express');
var router = express.Router();
//controllers
const _AuthController = require('../controllers/AuthController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post("/auth/signup/",_AuthController.singUp)
router.post("/auth/login/",_AuthController.logIn)

module.exports = router;
