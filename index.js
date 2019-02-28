var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const controller = require('./controller')
var clientes = new Map();

io.on('connection', (socket) => {
		console.log('Un cliente se ha conectado');
		
		
		socket.on('handshake', (data) => {
			//clientes.set(data.puesto, socket)
		 	clientes.set(socket, data.puesto)
			console.log('se conecto el puesto ' + data.puesto);
		})
		
		
		socket.on('disconnect', () => {
			var puesto = clientes.get(socket)
			console.log('Se desconecto el puesto ' + puesto);
			clientes.delete(socket)
		});
})
			
//router			
app.get('/gfs120/:id/modo/dd', (req, res) => {
		const puestoSolicitado = parseInt(req.params.id)
		var json= {puesto: puestoSolicitado, modo: "DD"};
		io.sockets.emit('setModo', json);
		res.send("Comando enviado")
	})


app.get('/gfs120//:id/modo/mixto', (req, res) => {
		const puestoSolicitado = parseInt(req.params.id)
		var json= {puesto: puestoSolicitado, modo: "Mixto"};
		io.sockets.emit('setModo', json);
		res.send("Comando enviado")
	})
	
app.get('/gfs120/:id/moneda', (req, res) => {
		const puestoSolicitado = parseInt(req.params.id)
		const monedaSolicitada = req.query["moneda"]
		var json= {puesto: puestoSolicitado, moneda: monedaSolicitada};
		io.sockets.emit('setMoneda', json);
		res.send("Comando enviado")
	})
	
	
	
app.get('*',(request, response) => { response.sendStatus(404)})


//172.21.32.60
http.listen(4000,'172.21.32.60', () => {
			console.log('Server running on port 4000')
			})
