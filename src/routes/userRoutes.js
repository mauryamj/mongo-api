const express = require('express');
const router = express.Router();
const multer = require('multer');

// Configure Multer
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 } // 2MB Limit (Safe for Vercel)
});

// Middleware to handle Multer errors
const uploadMiddleware = (req, res, next) => {
    upload.single('logo')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            return res.status(400).json({ message: `File upload error: ${err.message}` });
        } else if (err) {
            // An unknown error occurred when uploading.
            return res.status(500).json({ message: `Unknown upload error: ${err.message}` });
        }
        // Everything went fine.
        console.log('Multer processed request.');
        console.log('req.body:', req.body);
        console.log('req.file:', req.file);
        next();
    });
};

const controller = require('../controllers/userController');
const validate = require('../middleware/validate');
const { createUserRules } = require('../validators/userValidator');

router.post('/', uploadMiddleware, createUserRules, validate, controller.createUser);
router.get('/', controller.getUsers);
router.get('/:id', controller.getUserById);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);

module.exports = router;
