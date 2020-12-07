const { readFileSync }= require("fs");
const log = console.log;


const input = readFileSync("5_input.txt").toString().split('\n');


const rows = [ ...new Array(128).keys() ]
const cols = [ ...new Array(8).keys() ]
//The last three characters will be either L or R; these specify exactly one of the 8 columns of seats on the plane (numbered 0 through 7)
//Each letter tells you which half of a region the given seat is in
// front = 0 - 63
// back = 64 - 127;

function findRow(chars, rows, F, B) {
	if (rows.length == 1) {
		return rows[0];
	}
	const len = rows.length;
	const [front, back] = [rows.slice(0, len/2), rows.slice(len/2)];
	//log(back, front);
	if (chars[0] == B) {
		return findRow(chars.slice(1), back, F, B);
	} else {
		return findRow(chars.slice(1), front, F, B);
	}
}


function decode(board_pass) {
	const [r_info, c_info] = [board_pass.slice(0, 7), board_pass.slice(7)];
	const r = (findRow(r_info, rows, "F", "B"));
	const c = (findRow(c_info, cols, "L", "R"));
	return [r, c];
}
//Every seat also has a unique seat ID: multiply the row by 8, then add the column.
log(decode("FBFBBFFRLR"))


let ids = [];
let high_pass = 0;
for (let pass of input) {
	const [r, c] = decode(pass);
	const SeatID = r * 8 + c ;
	if (SeatID > high_pass) {
		high_pass = SeatID;
	}
	//Your seat wasn't at the very front or back,
	if (r == 127 || r == 0) { continue; }
	ids.push(SeatID);
}
ids.sort( (a, b) => a - b);
let missingIds = [];
for (let i in ids) {
	id = ids[i]
	if (ids.includes(id + 1)) {
		continue;
	}
	missingIds.push(id + 1)
}
// log(ids)
log(missingIds);
// 648 + 1 => 649 sol
function revID(id) {
	// id = row * 8 + col
	// row = (id - col) / 8;
	// col = id - 8row;
	// therefore row = (id - id - 8 * row) / 8
	// row * 8 = 2id - 8 * row
	// row * 16 = 2ids;
	const r = (id  * 2) / 16
	const c = id - (8 * rows);
	return [r, c]
}

// log(high_pass) // ans => 835 
