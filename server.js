const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const app = express();
app.use(express.json());
const port = 3000;
const userRoutes = require('./routes/users');
const weatherService = require('./services/weatherService');
const bodyParser = require('body-parser');

// Use body-parser middleware only for JSON parsing
app.use(bodyParser.json());
dotenv.config();

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.get("/blog", (req, res) => {
//   res.send("Hello Blog");
// });

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected!");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  })
  .catch((error) => console.log(error));

app.use('/api/users', userRoutes);

weatherService.start();
