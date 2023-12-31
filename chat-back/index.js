const express = require('express');
// shorthand
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const cors = require('cors')


mongoose.connect(process.env.MONGO_URL);
const jwtSecret = process.env.JWT_SECRET;



const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));


app.get('/test', (req, res) => {
    res.json('test ok');
})

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const createdUser = await User.create({ username, password });
        jwt.sign({ userId: createdUser._id }, jwtSecret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).status(201).json('ok');
        });

    } catch (err) {
        if (err) {
            throw err;
        }
    }
});

app.listen(9000);
console.log("Working backend")
