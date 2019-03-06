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


const sendCommand = (response, json, puesto, comando) => {
	if(Array.from(clientes.values()).indexOf(puesto) < 0){
			response.send("Dispositivo desconectado");
		} else {
			io.sockets.emit(comando, json);
			response.send("Comando enviado")
		}
  
}
			
//router			
app.get('/gfs120/:id/modo/dd', (req, res) => {
		const puestoSolicitado = parseInt(req.params.id)
		var json= {puesto: puestoSolicitado, modo: "DD"}
		sendCommand(res, json, puestoSolicitado, 'setModo')	
	})


app.get('/gfs120/:id/modo/mixto', (req, res) => {
		const puestoSolicitado = parseInt(req.params.id)
		var json= {puesto: puestoSolicitado, modo: "Mixto"};
		sendCommand(res, json, puestoSolicitado, 'setModo');	
	})
	
app.get('/gfs120/:id/moneda', (req, res) => {
		const puestoSolicitado = parseInt(req.params.id)
		const monedaSolicitada = req.query["moneda"]
		var json= {puesto: puestoSolicitado, moneda: monedaSolicitada};
		sendCommand(res, json, puestoSolicitado, 'setMoneda')
	})
	
	
	
app.get('*',(request, response) => { response.sendStatus(404)})


//172.21.32.60
http.listen(4000,'172.21.32.60', () => {
			console.log('Server running on port 4000')
			})

			
			
			
			