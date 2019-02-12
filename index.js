const http = require('http').createServer();
http.listen(4000, 'localhost');
const io = require('socket.io').listen(http);

