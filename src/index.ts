import fetch from "node-fetch";
import { encodeData, craftURL } from "./helper";
import type { Answer } from "./answerType";

export async function query(q: string): Promise<Answer> {
	let url = craftURL(
		`input=${encodeData(q)}&podstate=Step-by-step%20solution&output=json`
	);
	return await (await fetch(url)).json();
}
