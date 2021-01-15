import fetch from "node-fetch";
import { encodeData, craftURL } from "./helper";
import type { Answer } from "./answerType";

type format = "mathml" | "plaintext" | "image" | "imagemap" | "sound" | "wav";

/**
 * Query the Wolfram alpha API by emulating the mobile App to get all the premium features for free.
 *
 * @export
 * @param {string} q
 * @param {format[]}
 * @return {*}  {Promise<Answer>}
 */
export async function query(q: string, formats: format[] = ["image", "plaintext"]): Promise<Answer> {
	let url = craftURL(
		`input=${encodeData(q)}&podstate=Step-by-step%20solution&output=json&format=${formats.join(",")}`
	);
	console.log(url)
	return await (await fetch(url)).json();
}
