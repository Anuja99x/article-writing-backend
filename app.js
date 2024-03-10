const express = require("express");
const mongoose = require("mongoose");
const app = express();
const UserRoute = require('./route/userRoute');
const ContactMessageRoute = require('./route/contactMessageRoute');

const topicDomainRoute = require('./route/topicDomainRoute');
const topicRoutes = require('./route/topicRoute');
const keywordRoutes = require('./route/keywordRoute');
const readerArticle = require('./route/readerArticleRoute');
const comment = require('./route/commentRoute');
const flaggedTopicRoute = require('./route/flaggedTopicRoute')
const article = require('./route/articleRoute')
const fileRoutes = require('./route/fileRoutes')

const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require('body-parser')

const PORT = 3001;
app.use(bodyParser.json());

var cors = require('cors');
const flaggedTopicSchema = require("./model/flaggedTopicSchema");
app.use(cors());

mongoose.connect(process.env.URI)
  .then(() => {
    console.log("Successfully Connected to the MongoDB Database");
  })
  .catch(error => {
    console.log("MongoDB connection error", error);
  });


app.use('/api/user', UserRoute); //http://localhost:3001/api/user
app.use('/api/contactMessage', ContactMessageRoute);

app.use('/api/topicDomains', topicDomainRoute);

app.use('/api/topics', topicRoutes);
app.use('/api/keywords', keywordRoutes);
app.use('/api/readerArticle', readerArticle);
app.use('/api/comment', comment);

app.use('/api/flaggedTopics', flaggedTopicRoute);
app.use('/api/article', article)
app.use('/api/file', fileRoutes)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

// Export the app instance
module.exports = app;


