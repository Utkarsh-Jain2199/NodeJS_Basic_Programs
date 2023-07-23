function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
  
  const http = require('http');
  const url = require('url');
  const fs = require('fs');
  
  const server = http.createServer((req, res) => {
    const query = url.parse(req.url, true).query;
    const n = parseInt(query.n);
    if (!isNaN(n)) {
      const result = fibonacci(n);
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(`<p>The ${n}th Fibonacci number is ${result}.</p>`);
    } else {
      fs.readFile('q6.html', (err, data) => {
        if (err) {
          res.writeHead(404, {'Content-Type': 'text/html'});
          res.end('404 Not Found');
        } else {
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.end(data);
        }
      });
    }
  });
  
  server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
  });
  