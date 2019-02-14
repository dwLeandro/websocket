const io = require('socket.io-client');
const socket = io.connect('http://localhost:4000');

socket.on('connect', () => {
  console.log('Successfully connected!');
  socket.emit('handshake', {puesto: 1});
});

  


