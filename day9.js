// 12/17/2020 11:30 pm
const log = console.log;
const { readFileSync } = require('fs')

const breakStr = (list, index) => [list.slice(0, index), list.slice(index)];

let input = readFileSync("9_input.txt", "utf8").split('\n').map(Number);
input = input.slice(0, input.length - 1);

// input =
// `35
// 20
// 15
// 25
// 47
// 40
// 62
// 55
// 65
// 95
// 102
// 117
// 150
// 182
// 127
// 219
// 299
// 277
// 309
// 576`.split('\n').map(Number);

const [buffer, rest] = breakStr(input, 25);

// const buffer = new Array(25);

function solve(list) {
	for (let i = 0; i < list.length; i++) {
		let n = list[i];
		if (!isValid(n, buffer)) {
			// log(n);
			return n;
		}
		// after verification;
		buffer.shift();
		buffer.push(n);
		// log(buffer)
	}
	return "all valid";
}

function isValid(n, buffer) {
	for (const i of buffer) {
		for (const j of buffer) {
			if (i == j) continue;
			if (i + j == n) {
				return true;
			}
		}
	}
	return false;
}

let sol1 = solve(rest);

// that was easy lol i got it in like my 1st attempt 
// 27 -> WHHHHHAAAAAT not the right answer hmm text case worked fine;
// ooo i had forgotten to change the preamble size;
// 50047984 -> nuce !!!


// part 2

let grpSum = 0;
let grp = [];
let maxSize = 2;

function findSet(l) {
	while(maxSize < l.length) {
		for (const i in l) {
			const n = l[i];
			// log(n)
			if (cumulativeSum(n) == sol1) {
				log(grp)
				return grp;
			}
		}
		// log("grpSum",grpSum);
		// log("maxSize",maxSize);
		// log("grp", grp);
		grpSum = 0;
		maxSize++;
		grp = [];
	}
}

function cumulativeSum(n) {
	if (grp.length < maxSize) {
		grp.push(n);
		grpSum += n;
	} else {
		grp.push(n);
		grpSum += n - grp.shift();;
	}
	return grpSum;
}

let set = findSet(input);
let [smallest, largest] = [Math.max(...set), Math.min(...set)];
log(smallest + largest);


// debugged turns out we were not adjusting the sum according to the group values being removed from group
// got 5407707 -> nicccce!!!



/*

enumerable properties

Object.prototype.trigger = function() {
    //  ...
    return this;
};
this adds trigger to enumerable properties;

object1.__proto__.add = () => 23;

this too .... apparently thats why object.hasOwnProperty(key) is in for..in code snippet

so... 

var obj = { 4: 15, 10 : 41, 11 : 46, 12 : 51, 20 : 74 }
for( item in obj ) {
    foo( obj[item] );
}
this loop will run 6 times including once for trigger;

for..in iterates over all enumerable properties (owned + inherited) anywhere on the prototype
chain. If you want to make trigger non-enumerable so it isn't iterated over
with for..in, use Object.defineProperty instead, which makes the defined
property non-enumerable by default:
<code>
	Object.defineProperty(Object.prototype, 'trigger', { value:  function() {
		
	}});
	var obj = { 4: 15, 10 : 41 }
	for( item in obj ) {
		console.log(item);
	}
</code>
inherited properties ( any in __proto__);


test with .hasOwnProperty();

object1.__proto__.add = () => 23;
console.log(object1.hasOwnProperty('add')); -> false


todo

iterators
symbols
generators
array.from
etc
*/
