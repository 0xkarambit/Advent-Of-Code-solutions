const { strict, strictEqual } = require('assert');
const fs = require('fs');
const log = console.log;

(async () => {
	let input = (await fs.promises.readFile("4_input.txt", "utf8")).split('\n\n')
	// log(input.length);
	
	requiredFields = [
		"byr",
		"iyr",
		"eyr",
		"hgt",
		"hcl",
		"ecl",
		"pid",
		"cid"
	];

	validPassCounter = 0;
	for (const pass of input) {
		let fields = pass.split(' ').map( elm => elm.split('\n')).flat();
		// log(fields)
		let result = fields.map( elm => elm.split(':'));
		fields = result.map( elm => elm[0]);
		values = result.map( elm => elm[1]);
		
		for (i in result) {
			if (result[i][0] != fields[i] || result[i][1] != values[i]) {
				log("kjsafhkjashkashkjhasjkdhakjshdjsahjkd OH SHIT")
			}
		}

		let invalid = false;
		for (const rf of requiredFields) {
			let strictValid = true;
			let val = values[fields.indexOf(rf)];
			if (rf == "cid")  continue;
			if (val == undefined) {
				invalid = true;
				break;
			};

			if (rf == "byr") {
				if (!(Number(val) > 1920 && Number(val) < 2002)) {
					strictValid = false;
				}
			}
			if (rf == "iyr") {
				if (!(Number(val) > 2010 && Number(val) < 2020)) {
					strictValid = false;
				}
			}
			if (rf == "eyr") {
				if (!(Number(val) > 2020 && Number(val) < 2030)) {
					strictValid = false;
				}
			}
			/////////////////////////////////////////
			if (rf == "hgt") {
				let measure = val.slice(val.length - 2);
				val = val.slice(0, val.length - 2);
				// log(measure)
				if (measure == "cm") {
					if (!(Number(val) > 150 && Number(val) < 193)) {
						strictValid = false;
					}
				}
				else if (measure == "in"){
					if (!(Number(val) > 59 && Number(val) < 76)) {
						strictValid = false;
					}
				}
				else {
					log(measure)
					strictValid = false;
				}
			}
			if (rf == "hcl") {
				[hash, val] = [val[0], val.slice(1)];
				if (hash != '#' || val.length != 6) {
					strictValid = false;
				}
			}
			if (rf == "ecl") {
				valEqualsOne = false;
				for (e of ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]) {
					if (val == e) {
						valEqualsOne = true;
						break;
					}
				}
				strictValid = valEqualsOne;
			}
			if (rf == "pid") {
				// log("fields",  fields , "values", values, result);
				// log(fields.indexOf(rf))
				strictValid = (val.length == 9);
				try {Number(val)}
				catch {
					strictValid = false;
				}
				// if (!(Number(val) > 2020 && Number(val) < 2030)) {
				// 	strictValid = false;
				// }
			}

			if (!fields.includes(rf) && !strictValid) {
				invalid = true;
			}
			// log(rf, val, !invalid, validPassCounter, '\n')
		}
		if (!invalid) validPassCounter++;
		// console.log((invalid) ? "Not valid" : "Valid" );
	}
	log(validPassCounter)
	// log(253 - 18)
})();
