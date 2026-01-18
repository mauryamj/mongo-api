const express = require('express');
const router = express.Router();
const multer = require('multer');

// Configure Multer
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB Limit
});

const controller = require('../controllers/userController');
const validate = require('../middleware/validate');
const { createUserRules } = require('../validators/userValidator');

router.post('/', upload.single('logo'), createUserRules, validate, controller.createUser);
router.get('/', controller.getUsers);
router.get('/:id', controller.getUserById);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);

module.exports = router;
