const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

// CREATE
exports.createUser = asyncHandler(async (req, res) => {
    const user = await User.create(req.body);
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
    const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(user);
});

// DELETE
exports.deleteUser = asyncHandler(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
});
