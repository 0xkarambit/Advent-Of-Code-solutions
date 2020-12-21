// 12/18/2020 1:12 am
// today i solved day8 part2, day9 , day10

const { count } = require("console");
// const { diffieHellman } = require("crypto");
const { readFileSync } = require("fs");
const log = console.log;

let input = readFileSync("10_input.txt", "utf8").split('\n').map(Number).sort((a,b)=> a-b);
// input = `28
// 33
// 18
// 42
// 31
// 14
// 46
// 20
// 48
// 47
// 24
// 23
// 49
// 45
// 19
// 38
// 39
// 11
// 1
// 32
// 25
// 35
// 8
// 17
// 7
// 9
// 4
// 2
// 34
// 10
// 3`.split('\n').map(Number).sort((a,b)=> a-b);

const device_joltage = Math.max(...input) + 3;
const outlet_joltage = 0;


const diff = {
	"1":0,
	"2":0,
	"3":0
}

function plugsIn(adapter_joltage, base_jolt = outlet_joltage) {
	return Object.keys(diff).map(Number).filter( (diff) => {
		if (diff + base_jolt == adapter_joltage) {
			return diff.toString();
		}
	});
}
// wait why am i complicating stuff; stay simple

input.push(device_joltage)
current_joltage = 0;

function countDiff(val) {
	diff[plugsIn(val, current_joltage)] += 1;
	current_joltage = val;
}

for (const adp of input) {
	countDiff(adp);
}
log(diff)
log(diff['1'] * diff['3']);

// easy 2691 -> woah not the right answer
// oh we forgot about device joltage itself -> input.push(device_joltage)
// 2760 -> yeah


// part2 arrangements

// so basically i have to ..... ok ...... apply some permutations and combinations stuff that i dont remember.
// must be an easy way to get the no of combinations/permutations like a formula with the $diff object
// permutation i did some research in permutation order matters;
// formula for permutations is = n! / (n − r)!
//	where n is the number of things to choose from,
//	and we choose r of them,
//	no repetitions,
//	order matters.
// 
// wait is this a combinations case .. ?

let arrangements = [];
