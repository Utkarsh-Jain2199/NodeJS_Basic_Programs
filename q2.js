const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

// configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// route to serve the HTML form
app.get('/', (req, res) => {
  res.send(`
    <form action="/download" method="POST">
      <label for="filename">Enter a filename:</label>
      <input type="text" name="filename" id="filename">
      <button type="submit">Download file</button>
    </form>
  `);
});

// route to handle file download requests
app.post('/download', (req, res) => {
  const filename = req.body.filename;
  const filepath = path.join(__dirname, filename);

  // check if the file exists
  if (fs.existsSync(filepath)) {
    res.sendFile(filepath);
  } else {
    res.status(404).send('File not found');
  }
});

// start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
