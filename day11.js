const { readFileSync } = require("fs");
const { get } = require("http");
const log = console.log;

let input = readFileSync("11_input.txt", "utf-8").split('\n').map( (row, i) => row.split(''));

/*  The seat layout fits neatly on a grid. Each position is either floor (.), an empty seat (L),
	or an occupied seat (#).

	Fortunately, people are entirely predictable and always follow a simple set of
	rules. All decisions are based on the number of occupied seats adjacent to a
	given seat (one of the eight positions immediately up, down, left, right, or
	diagonal from the seat)
*/

floor = ".";
empty = "L";
occ = "#";

// log(input);

class grid{
	constructor(input) {
		this.data = input;
		this.rows, this.cols = this.processData(input);
	}

	processData(data) {
		let rows = data;
		let cols = [];
		// log(rows.length)
		
		// log(data[0]);
		return [rows, cols]
	}

	update() {
		for (let y in this.data) {
			const row = this.data[y];
			for( let x in row) {
				const seat = this.data[y][x];
				// If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
				// log(seat, empty)
				if (seat == empty) {
					// if there are no empty seats
					if (this.getNeighbours(y, x).filter( (val) => val == occ).length == 0) {
						log("swappped", y, x, seat, this.getNeighbours(y, x).filter( (val) => val == occ).length)
						// debugger;
						this.data[y][x] = occ;
					}
				}
				// If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
				else if (seat == occ) {
					// log("swappped")
					debugger
					log(this.getNeighbours(y, x).filter( (val) => val == occ).length);
					if (this.getNeighbours(y, x).filter( (val) => val == occ).length >= 4) {
						log("swappped", y, x, this.getNeighbours(y, x).filter( (val) =``> val == occ).length)
						debugger;
						this.data[y][x] = empty;
					}
				}
			}
		}
		debugger;
		return this.data;
	}

	getNeighbours(row, col) { // y, x
		return [
			// left
			this.getVal(row, col - 1),
			// right
			this.getVal(row, col + 1),
			// top,
			this.getVal(row - 1, col),
			// bottom
			this.getVal(row + 1, col),
			// right - bottom
			this.getVal(row + 1, col + 1),
			// left bottom
			this.getVal(row + 1, col - 1),
			// right - top
			this.getVal(row - 1, col + 1),
			// left bottom
			this.getVal(row - 1, col - 1),
		]
	}

	getVal (row, col) {
		return (this.data[row] && this.data[row][col]) ? this.data[row][col] : null;
	}

	seatCount(symbol) {
		let count = 0;
		this.data.map( row => {
			count += row.filter( seatType => {
				return seatType == symbol;
			} ).length;
		})
		return count;
	}
}
// good works 
function row2col(rows) {
	return rows.map( (r, i) => getCol(rows, i));

	function getCol(rows, index) {
		return rows.map( (row , i) => row[index]);
	}
}


// log(seatingArea.seatCount(occ));
// log(seatingArea.getNeighbours(0, 1).filter( (type) => type == occ).length)
(main = async () => {
	// let val = await sleep(15000);
	// debugger;
	let seatingArea = new grid(input);
	let c = 1;
	let prev_grid = [];
	while(true) {
		log(c++)
		let new_grid = [ ...seatingArea.update()];
		log(new_grid.join(''))
		if (arraysEqual(prev_grid, new_grid)) {
			log(seatingArea.seatCount(occ));
			break;
		}
		prev_grid = [...new_grid];
	}
})(); 


function arraysEqual(a1,a2) {
    /* WARNING: arrays must not contain {objects} or behavior may be undefined */
    return JSON.stringify(a1)==JSON.stringify(a2);
}


function sleep(time = 0) {
	// await.it	attempt 2 :nice !!!!
	// return new Promise( () => {
	// 	setTimeout(_ => Promise.resolve(null) , time);
	// 	// todo why does it exit if i keep this code ? maybe unhandled promise ?
	// })

	// return new Promise( (resolve) => {
	// 	// ya this works
	// 	setTimeout(_ => resolve(null) , time);
	// })

	// doesnt work
	// return setTimeout(_ => Promise.resolve(null), time)
	// doesnt work either
	// return Promise.resolve( setTimeout(_ => null, time))

	// WORKING SOL CURRENT
	return new Promise( (resolve) => {
		setTimeout(_ => resolve(null) , time);
	})
}

// #.#L.L#.##
// #LLL#LL.L#
// L.#.L..#..
// #L##.##.L#
// #.#L.LL.LL
// #.#L#L#.##
// ..L.L.....
// #L#L##L#L#
// #.LLLLLL.L
// #.#L#L#.##


// even round 2 not equal dont mutate the current grid push onto a new grid and evaluate
// conditions only on the basis of previous grid...
// damn it i should have known