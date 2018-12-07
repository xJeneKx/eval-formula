@{%
	var BigNumber = require('bignumber.js');
	BigNumber.config({EXPONENTIAL_AT: [-1e+9, 1e9], POW_PRECISION: 100, RANGE: 100});
%}

main -> _ condition _ {% function(d) {return d[1]; } %}

IFELSE -> _ condition _ "?" _ AS _ ":" _ AS {% d => {
 if (d[1]) {
	return d[5];
 } else {
 	return d[9];
 }
}%}

AND -> condition _ "&&" _ condition {%d => {return (d[0] === true || d[0] > 0) && (d[4] === true || d[4] > 0)}%}
OR -> condition _ "||" _ condition {%d => {return d[0] === true || d[0] > 0 || d[4] === true || d[4] > 0}%}

condition -> AS _ conditional _ AS {% function(d) {
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
 %}
 			| string _ "==" _ string {% d => {return d[0] === d[4]} %}
 			| string _ "!=" _ string {% d => {return d[0] !== d[4]} %}
			| AND {% id %}
			| OR {% id %}
			| AS {% id %}
			| IFELSE {% id %}

conditionals -> "==" | ">=" | "<=" | "!=" | ">" | "<"
conditional -> conditionals {% function(d) { return d[0][0] } %}

P -> "(" _ condition _ ")" {% function(d) {return d[2]; } %}
    | N      {% id %}

E -> P _ "^" _ E    {% function(d) {return new BigNumber(d[0]).pow(d[4]); } %}
    | P             {% id %}

MD -> MD _ "*" _ E  {% function(d) {return d[0].times(d[4]); } %}
    | MD _ "/" _ E  {% function(d) {return d[0].div(d[4]); } %}
    | E             {% id %}

AS -> AS _ "+" _ MD {% function(d) {return d[0].plus(d[4]); } %}
    | AS _ "-" _ MD {% function(d) {return d[0].minus(d[4]); } %}
    | MD            {% id %}

N -> float          {% id %}
    | "sin" _ P     {% function(d) {return new BigNumber(Math.sin(d[2].toNumber())); } %}
    | "cos" _ P     {% function(d) {return new BigNumber(Math.cos(d[2].toNumber())); } %}
    | "tan" _ P     {% function(d) {return new BigNumber(Math.tan(d[2].toNumber())); } %}

    | "asin" _ P    {% function(d) {return new BigNumber(Math.asin(d[2].toNumber())); } %}
    | "acos" _ P    {% function(d) {return new BigNumber(Math.acos(d[2].toNumber())); } %}
    | "atan" _ P    {% function(d) {return new BigNumber(Math.atan(d[2].toNumber())); } %}

    | "pi"          {% function(d) {return new BigNumber(Math.PI); } %}
    | "e"           {% function(d) {return new BigNumber(Math.E); } %}
    | "sqrt" _ P    {% function(d) {return d[2].sqrt(); } %}
    | "ln" _ P      {% function(d) {return new BigNumber(Math.log(d[2].toNumber())); }  %}
    | "min(" _ ([0-9\,\s]:+) _ ")"  {% function(d) {var params = d[2][0].join('').split(','); return new BigNumber.min(...params); }  %}
    | "max(" _ ([0-9\,\s]:+) _ ")"  {% function(d) {var params = d[2][0].join('').split(','); return new BigNumber.max(...params); }  %}
    | "ceil" _ P    {% function(d) {return d[2].dp(0, 2); } %}
    | "floor" _ P    {% function(d) {return d[2].dp(0, 3); } %}
    | "round" _ P    {% function(d) {return d[2].dp(0, 6); } %}

float ->
      int "." int   {% function(d) {return new BigNumber(d[0] + d[1] + d[2])} %}
	| int           {% function(d) {return new BigNumber(d[0])} %}

value -> AS {% id %}
int -> [0-9]:+        {% function(d) {return d[0].join(""); } %}
string -> "\"" [\w\s]:+ "\""        {% function(d) {return d[1].join("").trim(); } %}
_ -> [\s]:*     {% function(d) {return null; } %}