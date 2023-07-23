const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

let visitorCount = 0;


//wORKING
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'q7.html'));
});
// ANOTHER Method
// app.use(express.static(path.join(__dirname), { index: 'index.html' }));


io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);
  visitorCount++;
  if (visitorCount % 2 !== 0) {
    io.emit('oddVisitorCount', visitorCount);
  }
  
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
    visitorCount--;
    if (visitorCount % 2 !== 0) {
      io.emit('oddVisitorCount', visitorCount);
    }
  });
});

app.get('/student', (req, res) => {
  console.log('Received student details request from client');
  const student = {
    name: 'John Doe',
    rollNo: '12345',
    department: 'Computer Science',
    year: 'Final',
  };
  console.log(student);
  res.send(student);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
