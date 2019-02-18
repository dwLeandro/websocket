const io = require('socket.io-client');
const socket = io.connect('http://localhost:4000');

socket.on('connect', () => {
  console.log('Successfully connected!');
});

socket.on('handshake', (data) => {
			console.log('Handshake!');
			socket.emit('handshake', {puesto: 1});
		})
