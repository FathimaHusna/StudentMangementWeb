const express = require('express');
const mysql = require('mysql');
const db = require('../db');

const router = express.Router();

// Get all students
router.get("/", (req, res) => { 
  const sql = "SELECT * FROM students";
  db.query(sql, (err, data)=> {
    if(err) return res.json("Error");
    return res.json(data);
  })
});

// Get student by ID
router.get('/search/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM students WHERE id = ?" ;
  db.query(sql, [id], (err, data) => {
    if(err) return res.json("error");
    return res.json(data);
  });
});

// Create a student
router.post("/create", (req, res) => { 
  const sql = "INSERT INTO students (Name, Email, Phone) VALUES (?, ?, ?)";
  const values = [
    req.body.Name,
    req.body.Email,
    req.body.Phone,
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

// Update a student by ID
router.put("/update/:id", (req, res) => { 
  const sql = "UPDATE students SET Name = ?, Email = ?, Phone = ? WHERE ID = ?";
  const values = [
    req.body.Name,
    req.body.Email,
    req.body.Phone,
    req.params.id
  ];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json({ error: "Error updating data" });
    }
    console.log("Updated:", data);
    return res.json({ message: "Data updated successfully" });
  });
});

// Delete a student by ID
router.delete("/delete/:id", (req, res) => {
  const sql = "DELETE FROM students WHERE ID = ?";
  const id = req.params.id;

  db.query(sql, id, (err, data) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json({ error: "Error deleting data" });
    }
    console.log("Deleted:", data);
    return res.json({ message: "Data deleted successfully" });
  });
});

module.exports = router;
