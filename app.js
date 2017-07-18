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
    var accountLinking = session.message.sourceEvent.account_linking;
    if (accountLinking) {
        // This is the handling for the `Account Linking webhook event` where we could
        // verify the authorization_code and that the linking was successful.
        // The authorization_code is the value we passed above and
        // status has value `linked` in case the linking succeeded.
        var id_usuario = accountLinking.authorization_code;
        console.log("id_usuario ---------------->",id_usuario);
        console.log("accountLinking-------------->",accountLinking);
        var authorizationStatus = accountLinking.status;
        if (authorizationStatus === 'linked') {
            // Persist username under the userData
            session.userData.idUsuario = id_usuario;
            session.endDialog('Ingreso exitoso! dime que mas deseas hacer');
        } else if (authorizationStatus === 'unlinked') {
            // Remove username from the userData
            delete session.userData.idUsuario;
            session.endDialog('Tu cuenta fue desvinculada exitosamente');
        } else {
            session.endDialog('Unknown account linking event received');
        }
    } else {
        var storedUsername = session.userData.idUsuario;
        if (storedUsername) {
            session.endDialog('You are known as ' + storedUsername + ' - type "unlink account" to try out unlinking');
        } else {
            session.endDialog('I hear you - type "link account" to try out account linking');
        }
    }
});

bot.set('localizerSettings', {
    botLocalePath: "./customLocale", 
    defaultLocale: "es" 
});

//Pedir datos: nombre, cedula, fecha de nacimiento, direccion y telefono//
bot.dialog('SolicitarDatos', require('./actions/pedirDatos')).triggerAction({
    matches: 'CrearRut'
}).endConversationAction("endSolicitarDatos", "Vale. Cancelado",{
    matches: /^cancelar$|^adios$/i,
    confirmPrompt: "Si escribes esto los datos que has ingresado de perderan. Deseas continuar?"
});

bot.dialog('SolicitarNombre', require('./actions/datos/pedirNombre')).triggerAction({
    matches: 'CrearRut'
});

bot.dialog('SolicitarCedula', require('./actions/datos/pedirCedula')).triggerAction({
    matches: 'CrearRut'
});

bot.dialog('SolicitarFecha', require('./actions/datos/pedirFecha')).triggerAction({
    matches: 'CrearRut'
});

bot.dialog('SolicitarDireccion', require('./actions/datos/pedirDireccion')).triggerAction({
    matches: 'CrearRut'
});

bot.dialog('SolicitarTelefono', require('./actions/datos/pedirTelefono')).triggerAction({
    matches: 'CrearRut'
});
//---------------------------------------------------------------------//