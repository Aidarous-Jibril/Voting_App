const express = require('express');
const path = require('path');
const cors = require('cors');
require('./config/db')


const app = express();

const poll = require('./routes/poll');

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable CORS
app.use(cors());

app.use('/poll', poll);

const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
