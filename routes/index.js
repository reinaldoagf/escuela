var express = require('express');
var router = express.Router();
//controllers
const _AuthController = require('../controllers/AuthController');
const _StudentController = require('../controllers/StudentController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post("/auth/signup/",_AuthController.singUp)
router.post("/auth/login/",_AuthController.logIn)
/*estudiantes*/
router.get("/student/all",_StudentController.all)
router.post("/student/store",_StudentController.store)
router.post("/student/update/:id",_StudentController.update)
router.delete("/student/delete/:id",_StudentController.deleteElement)

module.exports = router;
