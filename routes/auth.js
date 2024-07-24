// routes/auth.js

const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
const User = require(path.join(__dirname, '..', 'models', 'User'));
const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Credenciales invalidas' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Credenciales invalidas' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: 'Autenticacion exitosa', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
