const express = require("express");
const mongoose = require("mongoose");
const app = express();
const UserRoute = require('./route/userRoute');
const ContactMessageRoute = require('./route/contactMessageRoute');
const bodyParser = require('body-parser')

const PORT = 3001;
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://shiran:FBbzAro4KQOKyO2L@cluster0.djzafbx.mongodb.net/articleData')
  .then(() => {
    console.log("Successfully Connected to the MongoDB Database");
  })
  .catch(error => {
    console.log("MongoDB connection error", error);
  });

app.use('/api/user', UserRoute); //http://localhost:3001/api/user
app.use('/api/contactMessage', ContactMessageRoute);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

// Export the app instance
module.exports = app;


