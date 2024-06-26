const express = require('express');
const router = express.Router();

// In-memory storage for users
let users = [];
let nextId = 1;

// POST route for registering new users
router.post('/', (req, res) => {
    const { username, password } = req.body;

    // Validate the length of the username and password
    if (username.length < 8 || username.length > 12 || password.length < 8 || password.length > 12) {
        return res.status(400).json({ message: 'Username and password must be between 8 and 12 characters long' });
    }

    // Basic validation to check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    // Check if the username already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    // User and store it in memory
    const newUser = { id: nextId++, username, password };
    users.push(newUser);

    // Respond with success and user ID
    res.status(201).json({ message: 'User registered successfully', user: { id: newUser.id } });
});

module.exports = router;
