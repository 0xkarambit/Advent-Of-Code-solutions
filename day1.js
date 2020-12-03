const { promises } = require("fs");

const log = console.log;

(async () =>
{
	const input = (await promises.readFile("./1_input.txt", "utf8"));

	let numbers = input.split('\n').map(n => Number(n));
	// log(numbers)

	// for (let i in numbers) {
	// 	const no = numbers[i];
	// 	for (let j in numbers) {
	// 		const no2 = numbers[j];
	// 		for (let k in numbers){
	// 			const no3 = numbers[k];

	// 			if (i == j || j == k || k == i) {
	// 				continue;
	// 			}
				
	// 			if ((no + no2 + no3) == 2020) {
	// 				console.log(no * no2 * no3);
	// 				log(i, j, k)
	// 			}

	// 		}
	// 	}
	// }
	solve(numbers)

})()

function solve(list) {
	return list.map((no1, i)=>{
				list.map((no2, j) => {
					list.map((no3, k)=>{
						if (i == k ||k == j || j == i) {
							return ;
						}
						if (no1 + no2 + no3 == 2020) {
							log(no1 * no2 * no3);
						}
					})
				})
			})
}