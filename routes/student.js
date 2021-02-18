var express = require('express');
var router = express.Router();
//controllers
const _StudentController = require('../controllers/StudentController');

/*estudiantes*/
router.get("/all",_StudentController.all)
router.post("/store",_StudentController.store)
router.post("/update/:id",_StudentController.update)
router.delete("/delete/:id",_StudentController.deleteElement)

module.exports = router;
