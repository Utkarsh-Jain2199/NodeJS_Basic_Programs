const net = require('net');

// Server address and port
const host = 'localhost';
const port = 8000;

// Create a TCP server object
const server = net.createServer();

// Listen for incoming connections
server.listen(port, host, () => {
  console.log(`Server is listening on port ${port}`);
});

// Handle incoming connections
server.on('connection', (clientSocket) => {
  console.log(`Client ${clientSocket.remoteAddress}:${clientSocket.remotePort} connected`);

  // Receive client details
  clientSocket.on('data', (data) => {
    const [name, id, email] = data.toString().split(',');

    // Print client details on the server terminal
    console.log(`Received client details: name=${name}, id=${id}, email=${email}`);

    // Send a thank you message to the client
    const thankYouMessage = 'Thank you for connecting to the server!';
    clientSocket.write(thankYouMessage);

    // Close the client socket
    clientSocket.end();
  });

  // Handle socket errors
  clientSocket.on('error', (err) => {
    console.error('Socket error:', err);
  });
});
