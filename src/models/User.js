const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        businessName: {
            type: String,
            required: true,
            trim: true
        },
        businessType: {
            type: String,
            required: true
        },
        logo: {
            type: String // URL or path to the uploaded icon
        },
        productDescription: {
            type: String,
            trim: true
        },
        partnershipInterest: {
            type: String,
            trim: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
