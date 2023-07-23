const net = require('net');

// Client details
const name = "John Doe";
const id = "123456";
const email = "johndoe@example.com";

// Server address and port
const host = 'localhost';
const port = 8000;

// Create a TCP socket object
const clientSocket = new net.Socket();

// Connect to the server
clientSocket.connect(port, host, () => {
  console.log('Connected to server');
  
  // Send the client details to the server
  const data = `${name},${id},${email}`;
  clientSocket.write(data);
});

// Receive the thank you message from the server
clientSocket.on('data', (data) => {
  console.log('Received from server:', data.toString());
  
  // Close the socket
  clientSocket.destroy();
});

// Handle socket errors
clientSocket.on('error', (err) => {
  console.error('Socket error:', err);
});
// first run server then client