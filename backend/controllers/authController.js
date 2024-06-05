const express = require('express');
const mysql = require('mysql');
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salt = 10;


const router = express.Router();

//Sign up
router.post("/signup", (req, res) => {
  const sql = "INSERT INTO staff (first_name, last_name, email, password) VALUES (?, ?, ?, ?)";
  const password = req.body.password;
  bcrypt.hash(password.toString(), salt, (err, hash) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Error hashing password" });
    }
    
    const values = [
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      hash 
    ];
    
    db.query(sql, values, (err, data) => {
      if (err) {
        console.error("Error:", err);
        return res.status(500).json({ error: "Error inserting data" });
      }
      console.log("Inserted:", data);
      return res.json({ message: "Data inserted successfully" });
    });
  });
});





//login

router.post("/login", (req, res) => { 
  const sql = "SELECT * FROM staff WHERE email = ? AND password = ?";
 
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json({ error: "Error in login" });
    }
    if (data.length > 0){
      // User authenticated, generate JWT token
      const token = jwt.sign({ email: req.body.email }, 'your_secret_key', { expiresIn: '1h' }); // Change 'your_secret_key' to your own secret key

      // Send the token as response
      return res.json({ token: token });
    } else {
      return res.status(401).json({ message: "Authentication failed" });
    }
  });
});
  


// Middleware to verify JWT token
const verifyJwt = (req, res, next) => {
  const token = req.headers["access-token"];
  if (!token) {
    return res.status(401).json({ message: "Access token is missing" });
  } else {
    jwt.verify(token, 'your_secret_key', (err, decoded) => {
      if (err) {
        console.error("JWT Verification Error:", err);
        return res.status(401).json({ message: "Invalid token" });
      } else {
        // Extract the email from the decoded token
        req.email = decoded.email;
        next();
      }
    });
  }
};

// Route to check authentication
router.get('/checkauth', verifyJwt, (req, res) => {
  return res.json("Authenticated");
});




module.exports = router;
