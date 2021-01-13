import crypto from "crypto";

import { WA_SERVER, SIG_SALT, APPID } from "./config";

/**
 * Return the MD5 hash of the given string.
 *
 * @export
 * @param {string} str
 * @return {string}
 */
export function md5(str: string): string {
	return crypto.createHash("md5").update(str).digest("hex").toUpperCase();
}

/**
 * Encode the Data so it can be passed in the URL
 *
 * @export
 * @param {string} s
 * @return {string}
 */
export function encodeData(s: string): string {
	return encodeURIComponent(s)
		.replace(/-/g, "%2D")
		.replace(/_/g, "%5F")
		.replace(/\./g, "%2E")
		.replace(/!/g, "%21")
		.replace(/~/g, "%7E")
		.replace(/\*/g, "%2A")
		.replace(/\'/g, "%27")
		.replace(/\(/g, "%28")
		.replace(/\)/g, "%29");
}

/**
 * Decode the Data from URL Encoded to normal text.
 *
 * @export
 * @param {string} s
 * @return {string}
 */
export function decodeData(s: string): string {
	try {
		return decodeURIComponent(
			s
				.replace(/%2D/g, "-")
				.replace(/%5F/g, "_")
				.replace(/%2E/g, ".")
				.replace(/%21/g, "!")
				.replace(/%7E/g, "~")
				.replace(/%2A/g, "*")
				.replace(/%27/g, "'")
				.replace(/%28/g, "(")
				.replace(/%29/g, ")")
		);
	} catch (e) {}
	return "";
}

/**
 * Calculate the signature for the query with the formula sig value(md5(salt + concatenated_query)) with pre-known salt
 *
 * @export
 * @param {string} query
 * @return {string}
 */
export function calcSig(query: string): string {
	let params = query
		.split("&")
		.map((x) => x.split("="))
		.filter((x) => x.length > 1);
	params = params.sort((x) => +x[0]);
	let s = SIG_SALT;
	params.forEach((obj) => (s += obj[0] + obj[1]));
	return md5(s);
}

/**
 * Craft the URL when given the Query.
 *
 * @export
 * @param {string} query
 * @return {string}
 */
export function craftURL(query: string): string {
	let _query = new Map([["appid", APPID]]);
	query
		.split("&")
		.map((x) => x.split("="))
		.map((x) => x.map((y) => decodeData(y)))
		.filter((x) => x.length > 1)
		.map((x) => _query.set(x[0], x[1]));

	let qarr = [];
	for (var [key, value] of _query.entries())
		qarr.push(`${encodeData(key)}=${encodeData(value)}`);
	qarr.sort();
	query = qarr.join("&");
	query = query + `&sig=${calcSig(query)}`;

	return `https://${WA_SERVER}/v2/query.jsp?${query}`;
}
