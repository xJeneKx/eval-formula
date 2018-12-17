@{%
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
%}

@lexer lexer

main -> _ condition _ {% function(d) {return d[1]; } %}

ternary -> _ condition _ "?" _ AS _ ":" _ AS {% function(d) {return ['ternary', d[1], d[5], d[9]];}%}

OR -> condition2 _ "||" _ condition {% function(d) {return ['or', d[0], d[4]];}%}

AND -> condition2 _ "&&" _ condition {% function(d) {return ['and', d[0], d[4]];}%}

condition -> AS conditional AS {% function(d) {return ['condition', d[1], d[0], d[2]];}%}
 			| string _ "==" _ string {% function(d) {return ['stringCondition', '==', d[0], d[4]];} %}
 			| string _ "!=" _ string {% function(d) {return ['stringCondition', '!=', d[0], d[4]];} %}
			| AND {% id %}
			| OR {% id %}
			| AS {% id %}
			| ternary {% id %}

condition2 -> AS conditional AS {% function(d) {return ['condition', d[1], d[0], d[2]];}%}
	| AS {% id %}

conditional -> _ %conditionals _ {% function(d) { return d[1].value } %}

P -> "(" _ condition _ ")" {% function(d) {return d[2]; } %}
    | N      {% id %}

E -> P _ "^" _ E    {% function(d) {return ['^', d[0], d[4]]; } %}
    | P             {% id %}

MD -> MD _ "*" _ E  {% function(d) {return ['*', d[0], d[4]]; } %}
    | MD _ "/" _ E  {% function(d) {return ['/', d[0], d[4]]; } %}
    | E             {% id %}

AS -> AS _ "+" _ MD {% function(d) {return ['+', d[0], d[4]]; } %}
    | AS _ "-" _ MD {% function(d) {return ['-', d[0], d[4]]; } %}
    | MD            {% id %}

N -> float          {% id %}
    | "sin" _ P     {% function(d) {return ['sin', d[2]]; } %}
    | "cos" _ P     {% function(d) {return ['cos', d[2]]; } %}
    | "tan" _ P     {% function(d) {return ['tan', d[2]]; } %}

    | "asin" _ P    {% function(d) {return ['asin', d[2]]; } %}
    | "acos" _ P    {% function(d) {return ['acos', d[2]]; } %}
    | "atan" _ P    {% function(d) {return ['atan', d[2]]; } %}

    | "pi"          {% function(d) {return ['pi']; } %}
    | "e"           {% function(d) {return ['e']; } %}
    | "sqrt" _ P    {% function(d) {return ['sqrt', d[2]]; } %}
    | "ln" _ P      {% function(d) {return ['log', d[2]]; }  %}
    | "min" "(" [0-9\, ]:+ ")"  {% function(d) {var params = d[2].filter(function(v){return v.type === 'number'}).map(function(v){return v.value}); return ['min', params]; }  %}
    | "max" "(" [0-9\, ]:+ ")"  {% function(d) {var params = d[2].filter(function(v){return v.type === 'number'}).map(function(v){return v.value}); return ['max', params]; }  %}
    | "ceil" _ P    {% function(d) {return ['ceil', d[2]]; } %}
    | "floor" _ P    {% function(d) {return ['floor', d[2]]; } %}
    | "round" _ P    {% function(d) {return ['round', d[2]]; } %}

float -> %number           {% function(d) {return new BigNumber(d[0])} %}

value -> AS {% id %}
string -> %string        {% function(d) {return d[0].value; } %}
_ -> %WS:*     {% function(d) {return null; } %}