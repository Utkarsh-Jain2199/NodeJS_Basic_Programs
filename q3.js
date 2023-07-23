const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send(`

      <head>
        <title>Cookie Form</title>
      </head>
      <body>
        <h1>Cookie Form</h1>
        <form action="/setCookie" method="POST">
          <label for="fname">First Name:</label>
          <input type="text" id="fname" name="fname">
          <label for="lname">Last Name:</label>
          <input type="text" id="lname" name="lname">
          <br> <br>
          <button type="submit">Set Cookie</button>
        </form>
        <form action="/getCookie" method="POST">
          <button type="submit">Get Cookie</button>
        </form>
        <form action="/deleteCookie" method="POST">
          <button type="submit">Delete Cookie</button>
        </form>
        <div id="cookie-message">${req.cookies ? `Cookie: ${JSON.stringify(req.cookies)}` : ''}</div>
      </body>
    </html>
  `);
});

app.post('/setCookie', (req, res) => {
  const { fname, lname } = req.body;
  res.cookie('firstname', fname);
  res.cookie('lastname', lname);
  res.redirect('/');
});

app.post('/getCookie', (req, res) => {
  const firstName = req.cookies.firstname;
  const lastName = req.cookies.lastname;
  res.send(`Cookie: First Name: ${firstName}, Last Name: ${lastName}`);
});

app.post('/deleteCookie', (req, res) => {
  res.clearCookie('firstname');
  res.clearCookie('lastname');
  res.redirect('/');
});

app.listen(4000, () => {
  console.log('Server started on port 4000');
});