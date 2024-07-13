// routes/users.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Store user details
router.post('/', async (req, res) => {
  const { email, location } = req.body;
  const newUser = new User({ email, location, weatherData: [] });
  try {
    await newUser.save();
    res.status(201).send('User created');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Update user location
router.put('/:email', async (req, res) => {
  const { email } = req.params;
  const { location } = req.body;
  try {
    const user = await User.findOneAndUpdate({ email }, { location }, { new: true });
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Get user's weather data for a given day
router.get('/:email/weather', async (req, res) => {
  const { email } = req.params;
  const { date } = req.query;
  try {
    const user = await User.findOne({ email });
    const weatherData = user.weatherData.filter(data => data.date === date);
    res.status(200).send(weatherData);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
