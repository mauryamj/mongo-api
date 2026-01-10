require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

if (!uri) {
    console.error("❌ MONGO_URI is missing from .env");
    process.exit(1);
}

// Masked URI for safe logging
const maskedUri = uri.replace(/:\/\/([^:]+):([^@]+)@/, '://$1:****@');
console.log(`ℹ️  Attempting to connect to: ${maskedUri}`);

mongoose.connect(uri)
    .then(() => {
        console.log("✅ MongoDB Connected Successfully!");
        process.exit(0);
    })
    .catch(err => {
        console.error("❌ Connection Failed:");
        console.error(`   Message: ${err.message}`);
        console.error(`   Code: ${err.code}`);
        console.error(`   Name: ${err.name}`);
        if (err.cause) console.error(`   Cause: ${JSON.stringify(err.cause)}`);
        process.exit(1);
    });
