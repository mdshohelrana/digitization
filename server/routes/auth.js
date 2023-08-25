const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const users = require('../models/users'); // Your user model or database

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save to your database and get user
    // This is a placeholder, replace with actual DB logic
    const newUser = { id: Date.now(), username, password: hashedPassword };
    users.push(newUser);

    res.json({ message: 'User registered!' });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username);
    if (!user) return res.status(400).json({ error: 'Invalid username or password' });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(400).json({ error: 'Invalid username or password' });

    const token = jwt.sign({ id: user.id }, 'yourSecretKey', { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;
