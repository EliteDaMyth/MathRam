import fetch from "node-fetch";
import { encodeData, craftURL } from "./helper";
import type { Answer } from "./answerType";

/**
 * Query the Wolfram alpha API by emulating the mobile App to get all the premium features for free.
 *
 * @export
 * @param {string} q Query
 * @return {*}  {Promise<Answer>}
 */
export async function query(q: string): Promise<Answer> {
	let url = craftURL(
		`input=${encodeData(q)}&podstate=Step-by-step%20solution&output=json`
	);
	return await (await fetch(url)).json();
}
