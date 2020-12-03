const {promises} = require("fs");
const log = console.log;


(async () => {
	// input
	const input = (await promises.readFile("2_input.txt", "utf8"));
	// const input = ``````
	// log(input);
	const passwords = input.trim().split('\n');

	let totalCorrectPasswords = 0;
	for (const password of passwords) {
		let [pos, letterCode, pass] = password.split(" ");
		// log([rest, letterCode, pass])
		pos = pos.split('-');
		letterCode = letterCode.slice(0,1)
		
		let correct = true;

		// uncomment this code and comment below chunk to see part 1 solution
		// const occ = count(pass, letterCode)
		// if (occ > pos[1] || occ < pos[0]) {
		// 	correct = false;
		// }

		if (pass[pos[0] - 1] !== letterCode && pass[pos[1] - 1] !== letterCode) {
			correct = false;
		}
		if (pass[pos[0] - 1] == letterCode && pass[pos[1] - 1] == letterCode) {
			correct = false;
		}
		log(correct, letterCode, pass[pos[0]], pass[pos[1]])
		if (correct) {
			totalCorrectPasswords++;
		}
	}
	log(totalCorrectPasswords) // 542
})()

function count(str, letter) {
	let c = 0
	for (const i of str) {
		if (i == letter) {
			c++;
		}
	}
	return c;
}
