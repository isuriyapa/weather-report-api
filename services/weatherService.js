// services/weatherService.js
const axios = require('axios');
const User = require('../models/User');
const nodeCron = require('node-cron');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const fetchWeatherData = async (location) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OPENWEATHERMAP_API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};

const sendWeatherReport = async () => {
  const users = await User.find();
  users.forEach(async (user) => {
    const weatherData = await fetchWeatherData(user.location);
    const date = new Date().toISOString().split('T')[0];
    const time = new Date().toISOString().split('T')[1].split('.')[0];
    user.weatherData.push({ date, time, data: weatherData });
    await user.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: user.email,
      subject: 'Hourly Weather Report',
      text: `Weather report for ${user.location} at ${time}:\n${JSON.stringify(weatherData, null, 2)}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  });
};

const start = () => {
  nodeCron.schedule('0 */3 * * *', sendWeatherReport);
};

module.exports = { start };
