const { readFileSync } = require("fs");
const log = console.log;

const a_z = [...new Array(26).keys()].map( code => String.fromCharCode(code + 65)).join("");
const input = readFileSync("6_input.txt").toString();

groups = input.split('\n\n');
answers = groups.map(p);

function p(ans) {
	// use for part 1
	anss = [];
	// log(ans)
	for (let i of ans.replace(/\n/g, '')) {
		if (!anss.includes(i)) {
			anss.push(i);
		}
	}
	return anss;
}

log(answers.reduce((pv, cv) => {return pv + cv.length }, 0)) // nice 6686
// if i dont specify the 0 as def value i see this i wonder why? str interpolation?
// p,s,y,j,x,u,l,r,d,t,f,e,z,o,a,b,n,h72451626916144881982419222474819852171421134102217112101022424716185243224124
// 1220101215152512212220171626111416232243161171911165111310491513332617202639177984810191421202019213112011241145
// 8161425158152291125131018171010242414221127252425721422251982118111769436112615622315247141615264252296151710231
// 9121721206141318862641154201326182622143242210611159266211871917316122221885191919181911618251626232619921921910
// 6221681810251415142310105722992610156172352524155152581019155142662313824171851420161322269141245720423322126112
// 0626111424524209111926139175141719181142351113252015222420141225202215201512211819325822266232223201481026201718
// 1318252124122421751214152120426131995551381513243185241724522521129169237232418118682576942182124921012192399208
// 49311191316132111519924262010416122616721525222511

// PART 2 
// log(groups)

function everyoneYesQues(grp_ques) {
	grp_ques = grp_ques.split('\n')
	common_Ques = new Set();
	// log(grp_ques)
	grp_ques.map( (per_ques) => per_ques.split('').map(
		(val) => {
			if (Ehas(val)) {
				common_Ques.add(val)
			}
		}
	));

	// grp_ques.filter((per_ques) => per_ques.split('').map(Ehas));

	function Ehas(str) {
		for (let q of grp_ques) {
			if (!q.includes(str)) {
				return false;
			}
		}
		return true;
	}

	// experimental
	alt_meth = grp_ques.map( (indv_quess) => indv_quess.split('').filter(Ehas));
	// return common_Ques
	// log(e(alt_meth[0], [...common_Ques]))
	if(e(alt_meth[0], [...common_Ques]) == false) {
		log("askjdjasdjksh");
		process.exit();
	}

	function e(arr1, arr2) {
		return (arr1.every( e => arr2.includes(e)) && arr2.every( e => arr1.includes(e)))
	}
	// log('e => ', e([1,2,2,3,4], [1,2,3,4]))
	// expirimental ends
	return common_Ques;
	// return alt_meth[0]
}

const agreedQuestions = groups.map(everyoneYesQues)
log(agreedQuestions.reduce( (acc, value) => { return acc + [...value].length}, 0))
// incorrect 16 // didnt remove the .slice(0,2)
// new answer 3476; correct !!!
// same result using return alt_method[0] !!! yaataa

// 12/7/2020
/* today i solved day 5 and day 6 both !! coz my bst exam got postponed
*/