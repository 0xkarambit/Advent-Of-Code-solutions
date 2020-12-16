const { debug } = require("console");
const {readFileSync} = require("fs");
const log = console.log

const bootCode = readFileSync("8_input.txt", "utf8");
const lines = bootCode.split('\n');

// current op = acc, jmp, nop

let acc = 0;
const alreadyRun = {};
let instruct_count = 0;
for (let i = 0; i < lines.length; i++) {
	instruct_count += 1;
	const instruction = lines[i];
	const [op, arg] = instruction.split(' '); //[operation, argument]

	if (alreadyRun[i] == true) {
		log('acc', acc);
		break;
	}
	alreadyRun[i] = true;

	if (op == "acc") {
		// increase or decrease accumulator by the argument
		acc += +arg;
	}
	if (op == "jmp") {
		// increase or decrease accumulator by the argument
		i += +arg;
		--i;
	}

	//log(instruct_count, i + 1, instruction, 'acc = ', acc, 'i=', i)
}

// part 1 done solution 1501

console.log(acc);

// part 2 
// first attempt 1474 too high -- tried to change the jmp to nop manually by changing in input file.

// const seen = lines.map(_ => false);
// const seen = (new Array(lines.length)).fill(false)

// log(seen);

function run(lines) {
	let acc = 0;
	const alreadyRun = {};
	let instruct_count = 0;
	for (let i = 0; i < lines.length; i++) {
		instruct_count += 1;
		const instruction = lines[i];
		//TODO error on next line due to newLines;
		const [op, arg] = instruction.split(' '); //[operation, argument]

		if (alreadyRun[i] == true) {
			return "failed";
		}
		alreadyRun[i] = true;

		if (op == "acc") {
			// increase or decrease accumulator by the argument
			acc += +arg;
		}
		if (op == "jmp") {
			// increase or decrease accumulator by the argument
			i += +arg;
			--i;
		}

		//log(instruct_count, i + 1, instruction, 'acc = ', acc, 'i=', i)
	}
	return acc;
}

function find() {
	let i = 0;
	let newLines = "";
	// we can no longer rely on i's value from changeLines.
	for (i; i < lines.length; i++) {
		[_, newLines, done] = changeLines(lines,"jmp", "nop", i);
		log(`\x1b[91m${done}\x1b[0m`);
		if (done) break;
		let res = run(newLines);
		if (!res == "failed") {
			log(res);
			return "done";
		}
		log(i);
	}

	i = 0;
	for (i; i < lines.length; i++) {
		[_, newLines,done] = changeLines(lines,"nop", "jmp", i);
		if (done) break;
		let res = run(newLines);
		if (!res == "failed") {
			log(res);
			return "done";
		}
	}

	log("operation failed we will get them next time");

	//swap("jmp", "nop");
//	return acc;
}

function changeLines(lines, from, to, index) {
	log(from, "to", to);
	let newLines = [];
	let pure = true;
	let i = index;
	for (i; i < lines.length; i++) {
		const [code, arg] = lines[i].split(' ');
		if (pure && code == from)
		{
			pure = false;
			log("hehe", i);
			log(lines);
			newLines.push(to + " " + arg);
			log(newLines);
			
		}
		newLines.push(lines[i]);
	}
	log("jhasdkjashdkjashdkj\n", newLines);
	return (pure) ? [lines.length, [], true] : [i, newLines, false];
}
//log(lines);
lines.splice(lines.length - 1, 1);
// find()

//log(run(lines))
//log(lines);
//log(changeLines(lines, "nop", "jmp", 0));

// new code 

function solve() {
	// log(newList(lines, 2, "jmp" + " " + "+4"))
	debugger;
	// log(lines)
	for (let i in lines) {
		log("i =", i)
		const [code, arg] = lines[i].split(' ');
		if (code == "jmp") {
			let newLines = newList(lines, Number(i), "nop" + " " + arg);
			// ok in test case i = 7 should work but it doesnt ?
			log(newLines);
			// return 0;
			let res = run(newLines);
			// log(res); // ok it always worked
			if (res !== "failed") {
				log(res);
				return 0;
			}
		}
	}
	for (let i in lines) {
		log("i =", i)
		const [code, arg] = lines[i].split(' ');
		if (code == "nop") {
			let newLines = newList(lines, Number(i), "jmp" + " " + arg);
			// log(newLines);
			// return 0;
			let res = run(newLines);
			if (!res == "failed") {
				log(res);
				return 0;
			}
		}
	}
	log("MISSION FAILED WE WILL GET THEM NEXT TIME");
}


function newList(list, index, item) {
	return [ ...list.slice(0, index), item, ...list.slice(index + 1)];
}

// setTimeout(() => {
// 	debugger;
// }, 50000);
solve()
// log(newList([2,2,3,4,5,67,9], 3, "hello")) -> good
// my own attempt working try after Number for in buuuuuugggg 509 