var evalFormula = require('./index');
var test = require('ava');

test('1 + 1', t => {
	t.deepEqual(evalFormula("1 + 1").eq(2), true);
});

test('1 - 1', t => {
	t.deepEqual(evalFormula("1 - 1").eq(0), true);
});

test('2 * 2', t => {
	t.deepEqual(evalFormula("2 * 2").eq(4), true);
});

test('2 / 2', t => {
	t.deepEqual(evalFormula("2 / 2").eq(1), true);
});

test('2 ^ 4', t => {
	t.deepEqual(evalFormula("2 ^ 4").eq(16), true);
});

test('(2 + 2) * 2', t => {
	t.deepEqual(evalFormula("(2 + 2) * 2").eq(8), true);
});

test('2 + 2 * 2', t => {
	t.deepEqual(evalFormula("2 + 2 * 2").eq(6), true);
});

test('pi + 2', t => {
	t.deepEqual(evalFormula("pi + 2").eq(Math.PI + 2), true);
});

test('e + 2', t => {
	t.deepEqual(evalFormula("e + 2").eq(Math.E + 2), true);
});

test('sin(2)', t => {
	t.deepEqual(evalFormula("sin(2)").eq(0.9092974268256817), true);
});

test('cos(2)', t => {
	t.deepEqual(evalFormula("cos(2)").eq(-0.4161468365471424), true);
});

test('tan(2)', t => {
	t.deepEqual(evalFormula("tan(2)").eq(-2.185039863261519), true);
});

test('asin(1)', t => {
	t.deepEqual(evalFormula("asin(1)").eq(1.5707963267948966), true);
});

test('acos(1)', t => {
	t.deepEqual(evalFormula("acos(1)").eq(0), true);
});

test('atan(2)', t => {
	t.deepEqual(evalFormula("atan(2)").eq(1.1071487177940904), true);
});

test('sqrt(2)', t => {
	t.deepEqual(evalFormula("sqrt(2)").eq('1.4142135623730950488'), true);
});

test('ln(2)', t => {
	t.deepEqual(evalFormula("ln(2)").eq(0.6931471805599453), true);
});

test('1 == 1', t => {
	t.deepEqual(evalFormula("1 == 1"), true);
});

test('1 != 1', t => {
	t.deepEqual(evalFormula("1 != 1"), false);
});

test('1 != 2', t => {
	t.deepEqual(evalFormula("1 != 2"), true);
});

test('1 < 2', t => {
	t.deepEqual(evalFormula("1 < 2"), true);
});

test('1 > 2', t => {
	t.deepEqual(evalFormula("1 > 2"), false);
});

test('1 >= 2', t => {
	t.deepEqual(evalFormula("2 >= 2"), true);
});

test('1 <= 2', t => {
	t.deepEqual(evalFormula("1 <= 2"), true);
});

test('0 >= 2', t => {
	t.deepEqual(evalFormula("0 >= 2"), false);
});

test('3 <= 2', t => {
	t.deepEqual(evalFormula("3 <= 1"), false);
});

test('test == test', t => {
	t.deepEqual(evalFormula("test == test"), true);
});

test('test != test', t => {
	t.deepEqual(evalFormula("test != test"), false);
});

test('test 1 != test 2', t => {
	t.deepEqual(evalFormula("test 1 != test 2"), true);
});

test('test 2 != test 2', t => {
	t.deepEqual(evalFormula("test 2 != test 2"), false);
});

test('test 3 == test 3', t => {
	t.deepEqual(evalFormula("test 3 == test 3"), true);
});

test('1 && 1', t => {
	t.deepEqual(evalFormula("1 && 1"), true);
});

test('0 && 0', t => {
	t.deepEqual(evalFormula("0 && 0"), false);
});

test('0 && 1', t => {
	t.deepEqual(evalFormula("0 && 1"), false);
});

test('0 || 1', t => {
	t.deepEqual(evalFormula("0 || 1"), true);
});

test('1 == 1 && 1 == 1', t => {
	t.deepEqual(evalFormula("1 == 1 && 1 == 1"), true);
});
test('1 == 1 && 1 == 2', t => {
	t.deepEqual(evalFormula("1 == 1 && 1 == 2"), false);
});

test('1 == 1 || 1 == 2', t => {
	t.deepEqual(evalFormula("1 == 1 || 1 == 2"), true);
});

test('1 == 2 || 1 == 2', t => {
	t.deepEqual(evalFormula("1 == 2 || 1 == 2"), false);
});

test('10 == 10 ? 1 : 2', t => {
	t.deepEqual(evalFormula("10 == 10 ? 1 : 2").eq(1), true);
});

test('10 != 10 ? 1 : 2', t => {
	t.deepEqual(evalFormula("10 != 10 ? 1 : 2").eq(2), true);
});

test('10 == 10 ? 1 + 1 : 2 + 2', t => {
	t.deepEqual(evalFormula("10 == 10 ? 1 + 1 : 2 + 2").eq(2), true);
});

test('10 != 10 ? 1 + 1 : 2 + 2', t => {
	t.deepEqual(evalFormula("10 != 10 ? 1 + 1 : 2 + 2").eq(4), true);
});

test('1000000000000000000000000000000 == 1000000000000000000000000000000', t => {
	t.deepEqual(evalFormula("1000000000000000000000000000000 == 1000000000000000000000000000000"), true);
});

test('1000000000000000000000000000000 == 1000000000000000000000000000001', t => {
	t.deepEqual(evalFormula("1000000000000000000000000000000 == 1000000000000000000000000000001"), false);
});
