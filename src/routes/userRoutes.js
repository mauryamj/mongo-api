const express = require('express');
const router = express.Router();

const controller = require('../controllers/userController');
const validate = require('../middleware/validate');
const { createUserRules } = require('../validators/userValidator');

router.post('/', createUserRules, validate, controller.createUser);
router.get('/', controller.getUsers);
router.get('/:id', controller.getUserById);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);

module.exports = router;
