var builder = require('botbuilder');

module.exports = [
	function (session) {
        builder.Prompts.number(session, "Por favor dime tu número de cédula");
    },
    function (session, results) {
        session.endDialogWithResult(results);
    }
];