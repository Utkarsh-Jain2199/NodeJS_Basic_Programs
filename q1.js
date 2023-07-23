// mkdir express-app
// cd express-app
// npm init -y
// npm install express body-parser --save
/*
Q1 Implement an express application for the following 
a) Accept a number from the input text field of a user web and perform the basic airthmetic operations, increment (++), decrement (-), and square, on the number inside a middleware funtion of server node.js application.
b)Display the output values in the user web page as a response to the click event from the button.
*/

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(bodyParser.urlencoded({ extended: true }));

// middleware function to perform arithmetic operations on the input number
const performOperations = (req, res, next) => {
  const num = Number(req.body.number);
  req.result = {
    increment: num + 1,
    decrement: num - 1,
    square: num * num,
  };
  next();
};

// route to serve the HTML form
app.get('/', (req, res) => {
  res.send(`
    <form action="/" method="POST">
      <label for="number">Enter a number:</label>
      <input type="number" name="number" id="number">
      <button type="submit">Perform operations</button>
    </form>
  `);
});

// route to handle the form submission
app.post('/', performOperations, (req, res) => {
  res.send(`
    <h1>Arithmetic operations on ${req.body.number}</h1>
    <p>Increment: ${req.result.increment}</p>
    <p>Decrement: ${req.result.decrement}</p>
    <p>Square: ${req.result.square}</p>
  `);
});

// start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
