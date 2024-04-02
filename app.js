const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

const flash = require('connect-flash');
const session = require('express-session');


// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Express Session
app.use(session({
  secret: 'session-secret-string',
  resave: true,
  saveUninitialized: true,
}));


// Connect flash
app.use(flash());


// Blobal vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});


// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


// Database connection
mongoose.connect(process.env.MONGO_URI)
    .then((result) => app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`)))
    .catch((err) => console.log(err));