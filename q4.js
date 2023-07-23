const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Student Information</title>
      </head>
      <body>
        <h1>Student Information</h1>
        <form method="POST">
          <label for="name">Name:</label>
          <input type="text" name="name" id="name" required><br><br>
          <label for="regno">Registration No.:</label>
          <input type="text" name="regno" id="regno" required><br><br>
          <label for="rollno">Roll No.:</label>
          <input type="text" name="rollno" id="rollno" required><br><br>
          <label for="mobile">Mobile No.:</label>
          <input type="text" name="mobile" id="mobile" required><br><br>
          <label for="email">Mail Id:</label>
          <input type="email" name="email" id="email" required><br><br>
          <input type="submit" value="Submit">
        </form>
      </body>
    </html>
  `);
});

app.post('/', [
  body('name').notEmpty().withMessage('Name is required'),
  body('regno').notEmpty().withMessage('Registration number is required'),
  body('rollno').notEmpty().withMessage('Roll number is required'),
  body('mobile').notEmpty().withMessage('Mobile number is required')
                .isLength({ min: 10, max: 10 }).withMessage('Mobile number must be 10 digits'),
  body('email').notEmpty().withMessage('Email is required')
               .isEmail().withMessage('Invalid email address')
], (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => `<li>${error.msg}</li>`).join('');
    res.send(`
      <html>
        <head>
          <title>Student Information</title>
        </head>
        <body>
          <h1>Student Information</h1>
          <ul>${errorMessages}</ul>
          <form method="POST">
            <label for="name">Name:</label>
            <input type="text" name="name" id="name" value="${req.body.name}" required><br><br>
            <label for="regno">Registration No.:</label>
            <input type="text" name="regno" id="regno" value="${req.body.regno}" required><br><br>
            <label for="rollno">Roll No.:</label>
            <input type="text" name="rollno" id="rollno" value="${req.body.rollno}" required><br><br>
            <label for="mobile">Mobile No.:</label>
            <input type="text" name="mobile" id="mobile" value="${req.body.mobile}" required><br><br>
            <label for="email">Mail Id:</label>
            <input type="email" name="email" id="email" value="${req.body.email}" required><br><br>
            <input type="submit" value="Submit">
          </form>
        </body>
      </html>
    `);
  } else {
    res.send(`
      <html>
        <head>
        <title>Student Information</title>
        </head>
        <body>
          <h1>Student Information</h1>
          <p>Name: ${req.body.name}</p>
          <p>Registration No.: ${req.body.regno}</p>
          <p>Roll No.: ${req.body.rollno}</p>
          <p>Mobile No.: ${req.body.mobile}</p>
          <p>Mail Id: ${req.body.email}</p>
        </body>
      </html>
    `);
    }
    });
    
    const PORT = 3000;
    
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

