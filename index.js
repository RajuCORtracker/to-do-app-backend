const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
//const env_port=require('./env');
const taskRoutes = require('./routes/taskRoutes');
require('dotenv').config();
const app = express();
//middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Database connection
mongoose.connect('mongodb://0.0.0.0:27017/todo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(
    console, 'MongoDB connection error:'
    ));
db.once('open', function() {
  console.log('Connected to the database');
});

// Routes
app.use('/to-do', taskRoutes);

// Server
const port =process.env.PORT || PORT;
app.listen(port, ()=> {
    console.log(`App is Listening at the port : ${port}`);
});