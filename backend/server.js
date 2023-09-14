require('dotenv').config();

// Require express package
const express = require('express');

//MONGOOSE
const mongoose = require('mongoose');

// Require routes from the Router
//Workout Routes
const workoutRoutes = require('./routes/workouts');
//User Routes
const userRoutes = require('./routes/user');

// Creating express app inside app constant
const app = express();
const port = process.env.PORT || 4000;

//MIDDLEWARE
//Middleware to parse and get data from the request body
app.use(express.json());

//Middleware to log the path and method of incoming requests
app.use((req, res, next) => {
   console.log(req.path, req.method);
   next();
});

// Use routes from the Router
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

// CONNECT TO DB
mongoose
   .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => {
      //Listening for request
      app.listen(process.env.PORT, () => {
         console.log(`Connected to DB & listening on port ${port}`);
      });
   })
   .catch((error) => {
      console.log(error);
   });
