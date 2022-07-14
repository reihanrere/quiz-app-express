var router = require('express').Router();
var controller = require('../contollers/lessonCategory');

router.get('/', controller.getData);
router.post('/', controller.createData);
router.put('/:id', controller.updateData);
router.delete('/:id', controller.deleteOne);
router.get('/:id',controller.getById);

module.exports = router;