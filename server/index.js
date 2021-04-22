const express = require("express"); // Now we have an instance of the express library.
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json()); // Apply json middleware so that when we send information from the frontend, we need to parse the json.

// Able to make all the queries.
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "hitmen_management",
});


// Create an API endpoint (Adding stuff to the database).
// req is to send something from the front-end and res is to send something to the front-end.

app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Hooray!, server is running on port 3001.");
});