const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;


// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


// Database connection
mongoose.connect(process.env.MONGO_URI)
    .then((result) => app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`)))
    .catch((err) => console.log(err));