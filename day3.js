let temp = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`;

const fs = require("fs");
const log = console.log;

(async () => {
	let input = (await fs.promises.readFile("3_input.txt", "utf8")).split('\n');
	log(getTreesHit(3, 1, input))

	let answer = 1;
	for (const {0:x_inc, 1:y_inc} of [[1,1], [3,1], [5,1], [7,1], [1,2]])
	{
		log(getTreesHit(x_inc, y_inc, input));
		answer = answer * getTreesHit(x_inc, y_inc, input);
	}

	log(answer, "asjds")
})();


function getRindex(index, str) {
	return str[index % str.length]
}

function getTreesHit(x_inc, y_inc, map) {
	const rowCount = map.length;
	let trees = 0;
	let x = 0;
	let y = 0;
	for (let y = y_inc; y < rowCount; y += y_inc) {
		const row = map[y];
		x += x_inc;

		point = getRindex(x, row);
		if (point == '#') {
			trees += 1;
		}
	}
	return trees;
}