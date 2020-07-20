const mongoose = require('mongoose');
const keys = require('./keys');


// Mongoose Connect
mongoose
  .connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

