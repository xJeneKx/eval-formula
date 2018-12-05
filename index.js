const nearley = require("nearley");
const grammar = require("./grammar.js");

module.exports = function (formula) {
	const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
	parser.feed(formula);
	if(parser.results.length === 1){
		return parser.results[0];
	}else{
		if(typeof parser.results[0] === 'boolean') {
			for (let i = 0; i < parser.results.length; i++) {
				if (parser.results[i] === false) return false;
			}
			return true;
		}else{
			return parser.results[0];
		}
	}
	return parser.results;
};