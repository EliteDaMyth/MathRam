import crypto from "crypto";

import { WA_SERVER, SIG_SALT, APPID } from "./config";

export function md5(str: string) {
	return crypto.createHash("md5").update(str).digest("hex").toUpperCase();
}

export function encodeData(s: string) {
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

export function decodeData(s: string) {
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

export function calcSig(query: string) {
	let params = query
		.split("&")
		.map((x) => x.split("="))
		.filter((x) => x.length > 1);
	params = params.sort((x) => +x[0]);
	let s = SIG_SALT;
	params.forEach((obj) => (s += obj[0] + obj[1]));
	return md5(s);
}

export function craftURL(query: string) {
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
