var builder = require('botbuilder');

module.exports = [
	function (session) {
        builder.Prompts.number(session, "Por favor dime tu número de telefono o celular");
    },
    function (session, results) {
        session.endDialogWithResult(results);
    }
];