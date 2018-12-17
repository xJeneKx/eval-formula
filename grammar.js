// Generated automatically by nearley, version 2.15.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

	var BigNumber = require('bignumber.js');
	var moo = require("moo");

    var lexer = moo.compile({
      number: /[-0-9\.]+/,
      string: /"[\w\s]+"/,
      WS: /[ ]+/,
      op: ["+", "-", "/", "*", '&&', '||', '^'],
      name: ['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'min', 'max', 'pi', 'e', 'sqrt', 'ln', 'ceil', 'floor', 'round'],
      l: '(',
      r: ')',
      comma: ',',
      conditionals: ["==", ">=", "<=", "!=", ">", "<"],
      quote: '"',
      ternary: ['?', ':']
    });
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "main", "symbols": ["_", "condition", "_"], "postprocess": function(d) {return d[1]; }},
    {"name": "ternary", "symbols": ["_", "condition", "_", {"literal":"?"}, "_", "AS", "_", {"literal":":"}, "_", "AS"], "postprocess": function(d) {return ['ternary', d[1], d[5], d[9]];}},
    {"name": "OR", "symbols": ["condition2", "_", {"literal":"||"}, "_", "condition"], "postprocess": function(d) {return ['or', d[0], d[4]];}},
    {"name": "AND", "symbols": ["condition2", "_", {"literal":"&&"}, "_", "condition"], "postprocess": function(d) {return ['and', d[0], d[4]];}},
    {"name": "condition", "symbols": ["AS", "conditional", "AS"], "postprocess": function(d) {return ['condition', d[1], d[0], d[2]];}},
    {"name": "condition", "symbols": ["string", "_", {"literal":"=="}, "_", "string"], "postprocess": function(d) {return ['stringCondition', '==', d[0], d[4]];}},
    {"name": "condition", "symbols": ["string", "_", {"literal":"!="}, "_", "string"], "postprocess": function(d) {return ['stringCondition', '!=', d[0], d[4]];}},
    {"name": "condition", "symbols": ["AND"], "postprocess": id},
    {"name": "condition", "symbols": ["OR"], "postprocess": id},
    {"name": "condition", "symbols": ["AS"], "postprocess": id},
    {"name": "condition", "symbols": ["ternary"], "postprocess": id},
    {"name": "condition2", "symbols": ["AS", "conditional", "AS"], "postprocess": function(d) {return ['condition', d[1], d[0], d[2]];}},
    {"name": "condition2", "symbols": ["AS"], "postprocess": id},
    {"name": "conditional", "symbols": ["_", (lexer.has("conditionals") ? {type: "conditionals"} : conditionals), "_"], "postprocess": function(d) { return d[1].value }},
    {"name": "P", "symbols": [{"literal":"("}, "_", "condition", "_", {"literal":")"}], "postprocess": function(d) {return d[2]; }},
    {"name": "P", "symbols": ["N"], "postprocess": id},
    {"name": "E", "symbols": ["P", "_", {"literal":"^"}, "_", "E"], "postprocess": function(d) {return ['^', d[0], d[4]]; }},
    {"name": "E", "symbols": ["P"], "postprocess": id},
    {"name": "MD", "symbols": ["MD", "_", {"literal":"*"}, "_", "E"], "postprocess": function(d) {return ['*', d[0], d[4]]; }},
    {"name": "MD", "symbols": ["MD", "_", {"literal":"/"}, "_", "E"], "postprocess": function(d) {return ['/', d[0], d[4]]; }},
    {"name": "MD", "symbols": ["E"], "postprocess": id},
    {"name": "AS", "symbols": ["AS", "_", {"literal":"+"}, "_", "MD"], "postprocess": function(d) {return ['+', d[0], d[4]]; }},
    {"name": "AS", "symbols": ["AS", "_", {"literal":"-"}, "_", "MD"], "postprocess": function(d) {return ['-', d[0], d[4]]; }},
    {"name": "AS", "symbols": ["MD"], "postprocess": id},
    {"name": "N", "symbols": ["float"], "postprocess": id},
    {"name": "N", "symbols": [{"literal":"sin"}, "_", "P"], "postprocess": function(d) {return ['sin', d[2]]; }},
    {"name": "N", "symbols": [{"literal":"cos"}, "_", "P"], "postprocess": function(d) {return ['cos', d[2]]; }},
    {"name": "N", "symbols": [{"literal":"tan"}, "_", "P"], "postprocess": function(d) {return ['tan', d[2]]; }},
    {"name": "N", "symbols": [{"literal":"asin"}, "_", "P"], "postprocess": function(d) {return ['asin', d[2]]; }},
    {"name": "N", "symbols": [{"literal":"acos"}, "_", "P"], "postprocess": function(d) {return ['acos', d[2]]; }},
    {"name": "N", "symbols": [{"literal":"atan"}, "_", "P"], "postprocess": function(d) {return ['atan', d[2]]; }},
    {"name": "N", "symbols": [{"literal":"pi"}], "postprocess": function(d) {return ['pi']; }},
    {"name": "N", "symbols": [{"literal":"e"}], "postprocess": function(d) {return ['e']; }},
    {"name": "N", "symbols": [{"literal":"sqrt"}, "_", "P"], "postprocess": function(d) {return ['sqrt', d[2]]; }},
    {"name": "N", "symbols": [{"literal":"ln"}, "_", "P"], "postprocess": function(d) {return ['log', d[2]]; }},
    {"name": "N$ebnf$1", "symbols": [/[0-9\, ]/]},
    {"name": "N$ebnf$1", "symbols": ["N$ebnf$1", /[0-9\, ]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "N", "symbols": [{"literal":"min"}, {"literal":"("}, "N$ebnf$1", {"literal":")"}], "postprocess": function(d) {var params = d[2].filter(function(v){return v.type === 'number'}).map(function(v){return v.value}); return ['min', params]; }},
    {"name": "N$ebnf$2", "symbols": [/[0-9\, ]/]},
    {"name": "N$ebnf$2", "symbols": ["N$ebnf$2", /[0-9\, ]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "N", "symbols": [{"literal":"max"}, {"literal":"("}, "N$ebnf$2", {"literal":")"}], "postprocess": function(d) {var params = d[2].filter(function(v){return v.type === 'number'}).map(function(v){return v.value}); return ['max', params]; }},
    {"name": "N", "symbols": [{"literal":"ceil"}, "_", "P"], "postprocess": function(d) {return ['ceil', d[2]]; }},
    {"name": "N", "symbols": [{"literal":"floor"}, "_", "P"], "postprocess": function(d) {return ['floor', d[2]]; }},
    {"name": "N", "symbols": [{"literal":"round"}, "_", "P"], "postprocess": function(d) {return ['round', d[2]]; }},
    {"name": "float", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": function(d) {return new BigNumber(d[0])}},
    {"name": "value", "symbols": ["AS"], "postprocess": id},
    {"name": "string", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": function(d) {return d[0].value; }},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null; }}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
