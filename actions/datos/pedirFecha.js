var builder = require('botbuilder');

module.exports = [
	function (session) {
        builder.Prompts.number(session, "Por favor dime tu fecha de nacimiento");
    },
    function (session, results) {
        session.endDialogWithResult(results);
    }
];