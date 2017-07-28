var builder = require('botbuilder');
var restify = require('restify');
var request = require('request');

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

// Configurar mensaje de bienvenida al BOT//
server.get('/welcomemsg', restify.plugins.queryParser(), function (req, res, next) {
    var data = {
        setting_type: "greeting",
        greeting:{
            text: "Hola {{user_full_name}}! Soy un representante de MP y estoy a la orden para resolver tus necesidades, por favor presiona el boton empezar para explicarte como te puedo ayudar."
        }
    };

    // Start the request
    request({
        url: 'https://graph.facebook.com/v2.6/me/thread_settings',
        qs: { access_token: process.env.FACEBOOK_PAGE_TOKEN },
        method: 'POST',
        json: data
    },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            res.send(body);

        } else {
            // TODO: Handle errors
            res.send(body);
        }
    });
});
// ------------------------------------ //

// Configurar mensaje de bienvenida al BOT//
server.get('/empezarbut', restify.plugins.queryParser(), function (req, res, next) {
    var data = {
        setting_type: "call_to_actions",
        thread_state: "new_thread",
        call_to_actions: [
            {
                payload: "empezar"
            }
        ]
    };

    // Start the request
    request({
        url: 'https://graph.facebook.com/v2.6/me/thread_settings',
        qs: { access_token: process.env.FACEBOOK_PAGE_TOKEN },
        method: 'POST',
        json: data
    },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            res.send(body);

        } else {
            // TODO: Handle errors
            res.send(body);
        }
    });
});
// ------------------------------------ //

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

//Inicio de la converzacion//
bot.dialog('Empezar', require('./actions/empezar')).triggerAction({
    matches: 'Empezar'
});
//------------------------//

//Pedir datos: nombre, cedula, fecha de nacimiento, direccion y telefono//
bot.dialog('SolicitarDatos', require('./actions/pedirDatos')).triggerAction({
    matches: 'SolicitarDatos'
}).endConversationAction("endSolicitarDatos", "Vale. Cancelado",{
    matches: /^cancelar$|^adios$/i,
    confirmPrompt: "Si escribes esto los datos que has ingresado de perderan. Deseas continuar?"
});

bot.dialog('SolicitarNombre', require('./actions/datos/pedirNombre')).triggerAction({
    matches: 'SolicitarDatos'
});

bot.dialog('SolicitarCedula', require('./actions/datos/pedirCedula')).triggerAction({
    matches: 'SolicitarDatos'
});

bot.dialog('SolicitarFecha', require('./actions/datos/pedirFecha')).triggerAction({
    matches: 'SolicitarDatos'
});

bot.dialog('SolicitarDireccion', require('./actions/datos/pedirDireccion')).triggerAction({
    matches: 'SolicitarDatos'
});

bot.dialog('SolicitarTelefono', require('./actions/datos/pedirTelefono')).triggerAction({
    matches: 'SolicitarDatos'
});
//---------------------------------------------------------------------//

//Preguntas frecuentes//
bot.dialog('Pregunta1', require('./actions/preguntas/pregunta1')).triggerAction({
    matches: 'Pregunta1'
});
bot.dialog('Pregunta2', require('./actions/preguntas/pregunta2')).triggerAction({
    matches: 'Pregunta2'
});
bot.dialog('Pregunta3', require('./actions/preguntas/pregunta3')).triggerAction({
    matches: 'Pregunta3'
});
bot.dialog('Pregunta4', require('./actions/preguntas/pregunta4')).triggerAction({
    matches: 'Pregunta4'
});
bot.dialog('Pregunta5', require('./actions/preguntas/pregunta5')).triggerAction({
    matches: 'Pregunta5'
});
bot.dialog('Pregunta6', require('./actions/preguntas/pregunta6')).triggerAction({
    matches: 'Pregunta6'
});
bot.dialog('Pregunta7', require('./actions/preguntas/pregunta7')).triggerAction({
    matches: 'Pregunta7'
});
bot.dialog('Pregunta8', require('./actions/preguntas/pregunta8')).triggerAction({
    matches: 'Pregunta8'
});
bot.dialog('Pregunta9', require('./actions/preguntas/pregunta9')).triggerAction({
    matches: 'Pregunta9'
});
bot.dialog('Pregunta10', require('./actions/preguntas/pregunta10')).triggerAction({
    matches: 'Pregunta10'
});
//-------------------//