var express = require('express');
var router = express.Router();
//controllers
const _EnrollmentController = require('../controllers/EnrollmentController');

/*cursos*/
router.post("/add",_EnrollmentController.add)
router.get("/all",_EnrollmentController.all)

module.exports = router;