# weather-report-api

## Objective
This Node.js API stores users’ emails and locations and automatically sends hourly weather reports every 3 hours.

Features
Store user details and update user locations.
Fetch and store weather data for users' locations using the OpenWeatherMap API.
Provide routes to retrieve users’ weather data for a given day from the database.
Send hourly weather reports to users' emails every 3 hours using Nodemailer and Gmail.
Generate weather report text using OpenAI or Gemini APIs.
Use Google Cloud to get the city name from coordinates.
Deployable on platforms like Vercel and AWS.
Requirements
Node.js
Express.js
Mongoose
MongoDB
Nodemailer
OpenWeatherMap API
Google Cloud API
OpenAI or Gemini API
Node-cron
Setup Instructions
1. Set up the Node.js project
bash
Copy code
mkdir weather-report-api
cd weather-report-api
npm init -y
npm install express mongoose nodemailer axios node-cron dotenv
2. Set up MongoDB
Create a MongoDB database and define a schema for storing user details such as email, location, and weather data.

3. Environment Variables
Create a .env file and add your environment variables:

makefile
Copy code
PORT=3000
MONGODB_URI=your_mongodb_uri
OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
GOOGLE_CLOUD_API_KEY=your_google_cloud_api_key
GMAIL_USER=your_gmail_address
GMAIL_PASS=your_gmail_password
OPENAI_API_KEY=your_openai_api_key


4. Define MongoDB Schema
Create a models/User.js file for the MongoDB schema:

5. Set up Express Routes
Create routes for storing user details, updating users’ locations, and retrieving users’ weather data:

6. Postman API Collection
Provide a Postman API collection to test the routes.

Error Handling and Validation:

Add middleware for error handling.
Validate incoming data using libraries like Joi.
Authentication:

Implement JWT authentication for secure routes.

Useful Links
Setting up Nodemailer with Gmail
Node-cron
OpenWeatherMap API

