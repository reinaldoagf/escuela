var express = require('express');
var router = express.Router();
//controllers
const _CourseController = require('../controllers/CourseController');

/*cursos*/
router.get("/all",_CourseController.all)
router.post("/store",_CourseController.store)
router.post("/update/:id",_CourseController.update)
router.delete("/delete/:id",_CourseController.deleteElement)

module.exports = router;