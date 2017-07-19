var builder = require('botbuilder');
var restify = require('restify');

//Setup restify server//
var server = restify.createServer();
server.use(restify.plugins.queryParser());
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});
//-------------------//

// Create connector and listen for messages//
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
server.post('/api/messages', connector.listen());
//----------------------------------------//

var bot = new builder.UniversalBot(connector);

// You can provide your own model by specifing the 'LUIS_MODEL_URL' environment variable
// This Url can be obtained by uploading or creating your model from the LUIS portal: https://www.luis.ai/
var recognizer = new builder.LuisRecognizer(process.env.LUIS_MODEL_URL);
bot.recognizer(recognizer);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });
bot.dialog('/', dialog);

dialog.onDefault(function(session){
    session.endDialog('No entendi lo que dijiste, intenta de nuevo');
});

bot.set('localizerSettings', {
    botLocalePath: "./customLocale", 
    defaultLocale: "es" 
});

//Pedir datos: nombre, cedula, fecha de nacimiento, direccion y telefono//
bot.dialog('SolicitarDatos', require('./actions/pedirDatos')).triggerAction({
    matches: 'SolicitarDatos'
}).endConversationAction("endSolicitarDatos", "Vale. Cancelado",{
    matches: /^cancelar$|^adios$/i,
    confirmPrompt: "Si escribes esto los datos que has ingresado de perderan. Deseas continuar?"
});

bot.dialog('SolicitarNombre', require('./actions/datos/pedirNombre')).triggerAction({
    matches: 'SolicitarNombre'
});

bot.dialog('SolicitarCedula', require('./actions/datos/pedirCedula')).triggerAction({
    matches: 'SolicitarCedula'
});

bot.dialog('SolicitarFecha', require('./actions/datos/pedirFecha')).triggerAction({
    matches: 'SolicitarFecha'
});

bot.dialog('SolicitarDireccion', require('./actions/datos/pedirDireccion')).triggerAction({
    matches: 'SolicitarDireccion'
});

bot.dialog('SolicitarTelefono', require('./actions/datos/pedirTelefono')).triggerAction({
    matches: 'SolicitarTelefono'
});
//---------------------------------------------------------------------//