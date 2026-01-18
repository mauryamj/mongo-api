const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

// CREATE
exports.createUser = asyncHandler(async (req, res) => {
    const userData = { ...req.body };

    // Handle File Upload (Convert to Data URI for storage)
    // Handle File Upload (Convert to Data URI for storage)
    if (req.file) {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const dataURI = `data:${req.file.mimetype};base64,${b64}`;
        userData.logo = dataURI;
    } else if (req.body.logo) {
        // If logo is provided in body (Base64 string from frontend), use it directly
        userData.logo = req.body.logo;
    }

    const user = await User.create(userData);
    res.status(201).json(user);
});

// READ ALL
exports.getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// READ ONE
exports.getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
});

// UPDATE
exports.updateUser = asyncHandler(async (req, res) => {
    const userData = { ...req.body };

    if (req.file) {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const dataURI = `data:${req.file.mimetype};base64,${b64}`;
        userData.logo = dataURI;
    }

    const user = await User.findByIdAndUpdate(
        req.params.id,
        userData,
        { new: true }
    );
    res.json(user);
});

// DELETE
exports.deleteUser = asyncHandler(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
});
