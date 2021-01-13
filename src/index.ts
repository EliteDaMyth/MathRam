import fetch from "node-fetch";
import { encodeData, craftURL } from "./helper";
import type { Answer } from "./answerType";

async function query(q: string): Promise<Answer> {
	let url = craftURL(
		`input=${encodeData(q)}&podstate=Step-by-step%20solution&output=json`
	);
	console.log(url);
	const e = await fetch(url);
	return await e.json();
}

(async () => {
	let answer: Answer = await query("derivative x^2 + x");

	answer.queryresult.pods.map((a) => {
		if (a.primary) {
			console.log(a);
		}
	});
})();
