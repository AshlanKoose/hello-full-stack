const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  //password: "YOUR_PASSWORD",
  database: "hello_app"
});

// Connect to DB
db.connect(err => {
  if (err) {
    console.error("DB connection failed:", err);
  } else {
    console.log("Connected to MySQL ✅");
  }
});

// API route
app.get("/api/message", (req, res) => {
  db.query("SELECT text FROM messages LIMIT 1", (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results[0]);
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});