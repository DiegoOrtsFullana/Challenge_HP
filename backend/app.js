// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Import authentication routes

// Instance of the Express application
const app = express();

// Middlewares
app.use(bodyParser.json()); // Middleware to parse request bodies as JSON
app.use(cors({ // Middleware to allow CORS
    origin: 'http://localhost:3000', // Allow requests
    methods: ['GET', 'POST'] 
}));

// Routes
app.use('/signup', authRoutes); // Use authentication routes for the '/signup' route

// Start the server on port 3001
const PORT = process.env.PORT || 3001; // Port scpecifed
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Log in the console indicating that the server is running
});
