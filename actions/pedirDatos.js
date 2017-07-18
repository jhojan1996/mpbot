var builder = require('botbuilder');

module.exports = [
	function(session){
		console.log("Inicia accion para solicitar datos");
		session.dialogData.solicitarDatos = true;
		session.send("Hola! Soy MPBot y te ayudare con todos los necesites, pero antes dime los siguientes datos: ");
		session.beginDialog("SolicitarNombre");
	},
	function(session, result){
		session.dialogData.nombre = result.response;
		session.beginDialog("SolicitarCedula");
	},
	function(session, result){
		session.dialogData.cedula = result.response;
		session.beginDialog("SolicitarFecha");
	},
	function(session, result){
		session.dialogData.fecha = result.response;
		session.beginDialog("SolicitarDireccion");
	},
	function(session, result){
		session.dialogData.direccion = result.response;
		session.beginDialog("SolicitarTelefono");
	},
	function(session, result){
		session.dialogData.telefono = result.response;
		console.log("DATOS-------------->",session.dialogData);
		session.send("Gracias "+session.dialogData.nombre);
		session.send("Los datos que me ingresaste son los siguientes: ");
		session.send("Cedula: "+session.dialogData.cedula);
		session.send("Fecha de nacimiento: "+session.dialogData.fecha);
		session.send("Dirección: "+session.dialogData.direccion);
		session.send("Teléfono: "+session.dialogData.telefono);
		session.endDialog();
	}
];