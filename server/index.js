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
  database: "hitmen_db",
});


// Create an API endpoint (Adding stuff to the database).
// req is to send something from the front-end and res is to send something to the front-end.

// NOTE: Create functionality
app.post("/create", (req, res) => {
  const name = req.body.name;
  // const age = req.body.age;
  const location = req.body.location;
  // const position = req.body.position;
  // const wage = req.body.wage;

  db.query(
    // "INSERT INTO customer (name, age, country, position, wage) VALUES (?,?,?,?,?)",
    "INSERT INTO customer (name, location) VALUES (?,?)",
    [name, location],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

// NOTE: Read functionality
app.get('/hitman', (req, res) => {
// select everything from the hitman table.
  db.query("SELECT * FROM hitman", (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result);
    }
  }) 
})

// NOTE: Delete Functionality
app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM hitman WHERE h_id = ?", id, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result);
    }
  })
});

app.listen(3001, () => {
  console.log("Hooray!, server is running on port 3001.");
});