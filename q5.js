const http = require('http');
const url = require('url');
const qs = require('querystring');

function isPrime(num) {
  if (num <= 1) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const path = parsedUrl.pathname;

  if (path === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`
      <html>
        <head>
          <title>Prime Number Checker</title>
        </head>
        <body>
          <h1>Prime Number Checker</h1>
          <form method="POST" action="/check">
            <label for="number">Enter a number:</label>
            <input type="text" id="number" name="number" required>
            <button type="submit">Check</button>
          </form>
        </body>
      </html>
    `);
    res.end();
  } else if (path === '/check' && req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const { number } = qs.parse(body);

      if (isPrime(parseInt(number))) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`
          <html>
            <head>
              <title>Prime Number Checker</title>
            </head>
            <body>
              <h1>Prime Number Checker</h1>
              <p>${number} is a prime number!</p>
            </body>
          </html>
        `);
        res.end();
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`
          <html>
            <head>
              <title>Prime Number Checker</title>
            </head>
            <body>
              <h1>Prime Number Checker</h1>
              <p>${number} is not a prime number.</p>
            </body>
          </html>
        `);
        res.end();
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write('<h1>Page not found</h1>');
    res.end();
  }
});

const PORT = 4000;

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
