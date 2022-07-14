var router = require('express').Router();
var controller = require('../contollers/users');

/* GET users listing. */
router.get('/', controller.getList);
router.post('/', controller.createUsers);
router.put('/:id', controller.updateUsers);
router.delete('/:id', controller.deleteOne);
router.get('/:id', controller.getById);

module.exports = router;
