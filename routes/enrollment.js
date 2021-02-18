var express = require('express');
var router = express.Router();
//controllers
const _EnrollmentController = require('../controllers/EnrollmentController');

/*cursos*/
router.get("/add/:course_id/:student_id",_EnrollmentController.add)

module.exports = router;