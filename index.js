var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const controller = require('./controller')
var clientes = new Map();


io.on('connection', (socket) => {
		console.log('Un cliente se ha conectado');
		
		
		socket.emit('handshake','');
		
		socket.on('handshake', (data) => {
			clientes.set(socket.id, data.puesto)
			console.log('se conecto el puesto ' + data.puesto);
		})
		
		
		socket.on('disconnect', function () {
      console.log('A user disconnected');});
})


			
//router			
app.get('/gfs120/modo/dd/:id', controller.setModoDD)
app.get('/gfs120/modo/mixto/:id', controller.setModoMixto)
app.get('*',(request, response) => { response.sendStatus(404)})

//172.21.32.60
http.listen(4000,'localhost', () => {
			console.log('Server running on port 4000')
			})