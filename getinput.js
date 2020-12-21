#!/usr/bin/env node
const {exec} = require("child_process");
const {promises, readFileSync} = require("fs");
const {stderr, stdout} = process;
const log = console.log;

const year = process.argv[3] || 2020;
const day = process.argv[2];

if (!day) {
	stderr.write("no day provided")
	process.exit();
}

const cookie = readFileSync('session_cookie', "utf8");
// wait i logged in again and did my cookie change ? no some change in backend ? idk..lets check
const url = `https://adventofcode.com/${year}/day/${day}/input`;
const command = `curl ${url} --cookie "session=${cookie}"`;

exec(command, (err, out, stderr)=>{
	if (err) return err;
	// stdout.write(out);
	// write (will rewrite) vs append (only append) !!!
	promises.writeFile(`${day}_input.txt`, out)
		.then(()=>{
			console.log("input written to", `${day}_input.txt`);
			// process.exit();
		})
	// reading code
	// const input = await (promises.readFile(filename, "utf8")).toString();
})

//TODO improve this script so that it also makes day${day}.js file with starting code.
