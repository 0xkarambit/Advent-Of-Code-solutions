// bags must be color-coded and must contain specific quantities of other color-coded bags.

// THIS IS THE KIND OF PROBLEM IN WHICH DYNAMIC PROGRAMMING WOULD BE HELPFUL OR MEMOISATION I MEANT

const { readFileSync } = require("fs");
const log = console.log;

const input = readFileSync('7_input.txt').toString();
let dummyinput =
`light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

const dummyInput2 = 
`shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`;

const myBag = "shiny gold"

// {
// 	bag:"color",
// 	"children": [
// 		...bagObjects or ...names ?
// 	]
// }

class Bag{
	constructor(name, children, childrenNos = []) {
		this.name = name;
		this.children = children;
		this.childrenNos = childrenNos; // no of bags of each kind
	}
}

// process input
const bags = [];
input.split('\n').forEach(process);

function process(str) {
	// i dont know if every bag name is 2 chars long;
	let name = str.slice(0, str.indexOf('bags')).trim();
	let rest = str.slice(str.indexOf('contain') + 'contain'.length).split(',');
	let childrenBags = [];
	let childrenNos = [];
	for(let n of rest) {
		if (n.includes("no")) {
			// childrenBags.push(false);
			continue;
		}
		let childName = n.slice(0, n.search(/bags?/)).trim().slice(2); // to remove count .slice(2)
		childrenBags.push(childName);
		childrenNos.push(Number(n.slice(1, 2)));
	}
	
	bags.push(new Bag(name, childrenBags, childrenNos));
	// log(name); //nice
	// // log(rest);
	// log(childrenBagNames)
}


// log(bags)

function placeBag() {
	let count = 0;
	for (cb of bags) {
		count += (check_bag_availability(cb)) ? 1 : 0;
	}
	return count;
}

function check_bag_availability(bagObj) {
	const {children} = bagObj;
	for (let childName of children) {
		// log(childName) /// ohhh must be because of recursion
		if (childName.includes(myBag)) {
			return true;
		}
		else {
			if (findBag(childName) !== -1) {
				let result = check_bag_availability(findBag(childName));
				if (result !== undefined) {
					return result
				}
			}
		}
	}
	if (children.length == 0) {
		// hmm chk -> wavy bronze
	}
	// return bagObj.children.forEach(check_bag_availability);
}

function findBag(name) {
	return bags.filter( (bag) => bag.name == name)[0] || -1;
}

let chk = "plaid blue"
// log(findBag(chk))
// log(findBag(chk))
// log(check_bag_availability(findBag(chk))); // hmmm undefinedd why

// log(placeBag()); // solution 126
// no 10 cant be correct
// yes 126 nice !!!

// part 2 

// const dummyInput2 = 
// `shiny gold bags contain 2 dark red bags.
// dark red bags contain 2 dark orange bags.
// dark orange bags contain 2 dark yellow bags.
// dark yellow bags contain 2 dark green bags.
// dark green bags contain 2 dark blue bags.
// dark blue bags contain 2 dark violet bags.
// dark violet bags contain no other bags.`;

gold_bag = findBag("shiny gold");

function findNoofBagsRequired(bag) {
	let counter = 0;
	for (let i in bag.children) {
		counter += bag.childrenNos[i];

		child = findBag(bag.children[i]);
		if (child == -1) {
			continue;
		}
		counter += bag.childrenNos[i] * findNoofBagsRequired(child);
	}
	return counter;
}

log(findNoofBagsRequired(gold_bag))
log(findNoofBagsRequired(gold_bag) == 126)

/*
pseudo code

find the bag :::

findBag(children)
	true:
		recurse ? untill we find myBag in children ?
	false:
		dont add || use children name array instead then if it still doesnt match end it . FALSE


	todo check array in argv mutation in nested functions

*/