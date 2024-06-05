
const express = require('express');
const mysql = require('mysql');
const cors =require("cors");
const bodyParser = require('body-parser');
const studentsController = require('./controllers/studentsController');
const authController = require('./controllers/authController');
const db = require('./db');

const app = express();

app.use(express.json());
app.use(cors());

// Use controllers
app.use("/students", studentsController);
app.use("/auth", authController);

db.connect(function (error) {
  if (error) {
    console.log("Error in connecting database");
  } else {
    console.log("Successfully connected");
  }
});

app.listen(8081, ()=> {
  console.log("listening")
});


