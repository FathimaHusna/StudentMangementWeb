const express = require('express');
const mysql = require('mysql');
const cors =require("cors")
const bodyParser = require('body-parser')
const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'studentsdb',
  port: 3307
});

db.connect(function (error) {
  if (error) {
    console.log("Error in connecting database");
  } else {
    console.log("Successfully connected");
  }
});



app.get("/", (req, res) => { 
  const sql = "SELECT * FROM students";
  db.query(sql, (err, data)=> {
    if(err) return res.json("Error");
    return res.json(data);
  })

})


app.get('/search/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM students WHERE id = ?" ;
  db.query(sql, [id], (err, data) => {
    if(err) return res.json("error");
    return res.json(data);

  })

})



app.post("/create", (req, res) => { 
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

app.put("/update/:id", (req, res) => { 
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

app.delete("/delete/:id", (req, res) => {
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


//Login Controller

app.post("/signup", (req, res) => { 
  const sql = "INSERT INTO staff (first_name, last_name, email, password) VALUES (?, ?, ?, ?)";
  const values = [
    req.body.first_name,
    req.body.last_name,
    req.body.email,
    req.body.password,
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

app.post("/login", (req, res) => { 
  const sql = "SELECT * FROM staff WHERE email = ? AND password = ?";
 
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json({ error: "Error in login" });
    }
    if (data.length > 0){
      return res.json({ message: "success" });
    } else {
      return res.json({ message: "failed" });
    }
  });
});









app.listen(8081, ()=> {
  console.log("listening")
})


