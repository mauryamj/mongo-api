require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express(); //creates the server object
const cors = require('cors');

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Database connection
connectDB();

const errorHandler = require('./middleware/errorMiddleware');

// Routes
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Export the app for Vercel (Serverless)
module.exports = app;

// Only listen if the file is run directly (not required by Vercel)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
