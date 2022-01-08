

require('dotenv').config();
const {
    PORT
} = process.env;

const express = require('express');
const cors = require('cors');

const { connectDB } = require('./database/settings.database');

// Server set up
const app = express();

// Database set up
connectDB();

// CORS Policy
app.use(cors());

// Public directory
app.use( express.static('public') );

// Body parse
app.use( express.json() );

// Routes
app.use(`/api/auth`, require('./routes/auth.route'));
app.use(`/api/events`, require('./routes/events.route'));

app.listen( PORT, () => {
    console.log(`Server on port ${PORT}`);
});
