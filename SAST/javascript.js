// Assuming you have required necessary modules and set up the MySQL connection (db)...

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Assuming you have a route to handle incoming requests
app.get('/users', (req, res) => {
  // Source: User input from a query parameter (e.g., /users?username=john)
  const userInput = req.query.username;

  // Vulnerable sink: Using user input directly in the SQL query (insecure)
  const queryString = `SELECT * FROM users WHERE username = '${userInput}'`;

  // Executing the vulnerable query
  db.query(queryString, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Process the query results
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
