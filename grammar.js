// Generated automatically by nearley, version 2.15.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

	var BigNumber = require('bignumber.js');
	BigNumber.config({EXPONENTIAL_AT: [-1e+9, 1e9], POW_PRECISION: 100, RANGE: 100});
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "main", "symbols": ["_", "condition", "_"], "postprocess": function(d) {return d[1]; }},
    {"name": "IFELSE", "symbols": ["_", "condition", "_", {"literal":"?"}, "_", "AS", "_", {"literal":":"}, "_", "AS"], "postprocess":  d => {
         if (d[1]) {
        	return d[5];
         } else {
         	return d[9];
         }
        }},
    {"name": "AND$string$1", "symbols": [{"literal":"&"}, {"literal":"&"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "AND", "symbols": ["condition", "_", "AND$string$1", "_", "condition"], "postprocess": d => {return (d[0] === true || d[0] > 0) && (d[4] === true || d[4] > 0)}},
    {"name": "OR$string$1", "symbols": [{"literal":"|"}, {"literal":"|"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "OR", "symbols": ["condition", "_", "OR$string$1", "_", "condition"], "postprocess": d => {return d[0] === true || d[0] > 0 || d[4] === true || d[4] > 0}},
    {"name": "condition", "symbols": ["AS", "_", "conditional", "_", "AS"], "postprocess":  function(d) {
        switch (d[2]){
        	case '==':
        		return d[0].eq(d[4]);
        	case '>=':
        		return d[0].gte(d[4]);
        	case '<=':
        		return d[0].lte(d[4]);
        	case '!=':
        		return !(d[0].eq(d[4]));
        	case '>':
        		return d[0].gt(d[4]);
        	case '<':
        		return d[0].lt(d[4]);
        }}
         },
    {"name": "condition$string$1", "symbols": [{"literal":"="}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "condition", "symbols": ["string", "_", "condition$string$1", "_", "string"], "postprocess": d => {return d[0] === d[4]}},
    {"name": "condition$string$2", "symbols": [{"literal":"!"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "condition", "symbols": ["string", "_", "condition$string$2", "_", "string"], "postprocess": d => {return d[0] !== d[4]}},
    {"name": "condition", "symbols": ["AND"], "postprocess": id},
    {"name": "condition", "symbols": ["OR"], "postprocess": id},
    {"name": "condition", "symbols": ["AS"], "postprocess": id},
    {"name": "condition", "symbols": ["IFELSE"], "postprocess": id},
    {"name": "conditionals$string$1", "symbols": [{"literal":"="}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "conditionals", "symbols": ["conditionals$string$1"]},
    {"name": "conditionals$string$2", "symbols": [{"literal":">"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "conditionals", "symbols": ["conditionals$string$2"]},
    {"name": "conditionals$string$3", "symbols": [{"literal":"<"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "conditionals", "symbols": ["conditionals$string$3"]},
    {"name": "conditionals$string$4", "symbols": [{"literal":"!"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "conditionals", "symbols": ["conditionals$string$4"]},
    {"name": "conditionals", "symbols": [{"literal":">"}]},
    {"name": "conditionals", "symbols": [{"literal":"<"}]},
    {"name": "conditional", "symbols": ["conditionals"], "postprocess": function(d) { return d[0][0] }},
    {"name": "P", "symbols": [{"literal":"("}, "_", "condition", "_", {"literal":")"}], "postprocess": function(d) {return d[2]; }},
    {"name": "P", "symbols": ["N"], "postprocess": id},
    {"name": "E", "symbols": ["P", "_", {"literal":"^"}, "_", "E"], "postprocess": function(d) {return new BigNumber(d[0]).pow(d[4]); }},
    {"name": "E", "symbols": ["P"], "postprocess": id},
    {"name": "MD", "symbols": ["MD", "_", {"literal":"*"}, "_", "E"], "postprocess": function(d) {return d[0].times(d[4]); }},
    {"name": "MD", "symbols": ["MD", "_", {"literal":"/"}, "_", "E"], "postprocess": function(d) {return d[0].div(d[4]); }},
    {"name": "MD", "symbols": ["E"], "postprocess": id},
    {"name": "AS", "symbols": ["AS", "_", {"literal":"+"}, "_", "MD"], "postprocess": function(d) {return d[0].plus(d[4]); }},
    {"name": "AS", "symbols": ["AS", "_", {"literal":"-"}, "_", "MD"], "postprocess": function(d) {return d[0].minus(d[4]); }},
    {"name": "AS", "symbols": ["MD"], "postprocess": id},
    {"name": "N", "symbols": ["float"], "postprocess": id},
    {"name": "N$string$1", "symbols": [{"literal":"s"}, {"literal":"i"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "N", "symbols": ["N$string$1", "_", "P"], "postprocess": function(d) {return new BigNumber(Math.sin(d[2].toNumber())); }},
    {"name": "N$string$2", "symbols": [{"literal":"c"}, {"literal":"o"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "N", "symbols": ["N$string$2", "_", "P"], "postprocess": function(d) {return new BigNumber(Math.cos(d[2].toNumber())); }},
    {"name": "N$string$3", "symbols": [{"literal":"t"}, {"literal":"a"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "N", "symbols": ["N$string$3", "_", "P"], "postprocess": function(d) {return new BigNumber(Math.tan(d[2].toNumber())); }},
    {"name": "N$string$4", "symbols": [{"literal":"a"}, {"literal":"s"}, {"literal":"i"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "N", "symbols": ["N$string$4", "_", "P"], "postprocess": function(d) {return new BigNumber(Math.asin(d[2].toNumber())); }},
    {"name": "N$string$5", "symbols": [{"literal":"a"}, {"literal":"c"}, {"literal":"o"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "N", "symbols": ["N$string$5", "_", "P"], "postprocess": function(d) {return new BigNumber(Math.acos(d[2].toNumber())); }},
    {"name": "N$string$6", "symbols": [{"literal":"a"}, {"literal":"t"}, {"literal":"a"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "N", "symbols": ["N$string$6", "_", "P"], "postprocess": function(d) {return new BigNumber(Math.atan(d[2].toNumber())); }},
    {"name": "N$string$7", "symbols": [{"literal":"p"}, {"literal":"i"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "N", "symbols": ["N$string$7"], "postprocess": function(d) {return new BigNumber(Math.PI); }},
    {"name": "N", "symbols": [{"literal":"e"}], "postprocess": function(d) {return new BigNumber(Math.E); }},
    {"name": "N$string$8", "symbols": [{"literal":"s"}, {"literal":"q"}, {"literal":"r"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "N", "symbols": ["N$string$8", "_", "P"], "postprocess": function(d) {return d[2].sqrt(); }},
    {"name": "N$string$9", "symbols": [{"literal":"l"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "N", "symbols": ["N$string$9", "_", "P"], "postprocess": function(d) {return new BigNumber(Math.log(d[2].toNumber())); }},
    {"name": "N$string$10", "symbols": [{"literal":"m"}, {"literal":"i"}, {"literal":"n"}, {"literal":"("}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "N$subexpression$1$ebnf$1", "symbols": [/[0-9\,\s]/]},
    {"name": "N$subexpression$1$ebnf$1", "symbols": ["N$subexpression$1$ebnf$1", /[0-9\,\s]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "N$subexpression$1", "symbols": ["N$subexpression$1$ebnf$1"]},
    {"name": "N", "symbols": ["N$string$10", "_", "N$subexpression$1", "_", {"literal":")"}], "postprocess": function(d) {var params = d[2][0].join('').split(','); return new BigNumber.min(...params); }},
    {"name": "N$string$11", "symbols": [{"literal":"m"}, {"literal":"a"}, {"literal":"x"}, {"literal":"("}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "N$subexpression$2$ebnf$1", "symbols": [/[0-9\,\s]/]},
    {"name": "N$subexpression$2$ebnf$1", "symbols": ["N$subexpression$2$ebnf$1", /[0-9\,\s]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "N$subexpression$2", "symbols": ["N$subexpression$2$ebnf$1"]},
    {"name": "N", "symbols": ["N$string$11", "_", "N$subexpression$2", "_", {"literal":")"}], "postprocess": function(d) {var params = d[2][0].join('').split(','); return new BigNumber.max(...params); }},
    {"name": "N$string$12", "symbols": [{"literal":"c"}, {"literal":"e"}, {"literal":"i"}, {"literal":"l"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "N", "symbols": ["N$string$12", "_", "P"], "postprocess": function(d) {return d[2].dp(0, 2); }},
    {"name": "N$string$13", "symbols": [{"literal":"f"}, {"literal":"l"}, {"literal":"o"}, {"literal":"o"}, {"literal":"r"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "N", "symbols": ["N$string$13", "_", "P"], "postprocess": function(d) {return d[2].dp(0, 3); }},
    {"name": "float", "symbols": ["int", {"literal":"."}, "int"], "postprocess": function(d) {return new BigNumber(d[0] + d[1] + d[2])}},
    {"name": "float", "symbols": ["int"], "postprocess": function(d) {return new BigNumber(d[0])}},
    {"name": "value", "symbols": ["AS"], "postprocess": id},
    {"name": "int$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "int$ebnf$1", "symbols": ["int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "int", "symbols": ["int$ebnf$1"], "postprocess": function(d) {return d[0].join(""); }},
    {"name": "string$ebnf$1", "symbols": [/[\w\s]/]},
    {"name": "string$ebnf$1", "symbols": ["string$ebnf$1", /[\w\s]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "string", "symbols": [{"literal":"\""}, "string$ebnf$1", {"literal":"\""}], "postprocess": function(d) {return d[1].join("").trim(); }},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", /[\s]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
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
