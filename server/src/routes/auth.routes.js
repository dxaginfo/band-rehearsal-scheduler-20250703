const express = require('express');
const router = express.Router();

// Mock controller functions - to be implemented
const register = (req, res) => {
  res.status(201).json({ message: 'User registered successfully' });
};

const login = (req, res) => {
  res.status(200).json({ 
    message: 'Login successful',
    token: 'mock_jwt_token',
    user: { id: '123', name: 'Test User', email: 'test@example.com' }
  });
};

const getProfile = (req, res) => {
  res.status(200).json({ 
    user: { id: '123', name: 'Test User', email: 'test@example.com' }
  });
};

// Routes
router.post('/register', register);
router.post('/login', login);
router.get('/profile', getProfile);

module.exports = router;