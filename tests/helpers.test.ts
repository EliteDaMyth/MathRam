import { expect } from "chai";
import * as helpers from "../src/helper";

describe("Helpers Tests", () => {
	it("Check MD5 Hashing", () => {
		let hash = helpers.md5("TESTING");
		expect(hash).to.be.a("string");
		expect(hash).to.equal("907953DCBD01AD68DB1F19BE286936F4");
	});
	it("Check Encoding", () => {
		let encoded = helpers.encodeData("12345567890!@#$%^&*(),./;'[]<>?:");
		expect(encoded).to.be.a("string");
		expect(encoded).to.equal(
			"12345567890%21%40%23%24%25%5E%26%2A%28%29%2C%2E%2F%3B%27%5B%5D%3C%3E%3F%3A"
		);
	});
	it("Check Decoding", () => {
		let decoded = helpers.decodeData(
			"12345567890%21%40%23%24%25%5E%26%2A%28%29%2C%2E%2F%3B%27%5B%5D%3C%3E%3F%3A"
		);
		expect(decoded).to.be.a("string");
		expect(decoded).to.equal("12345567890!@#$%^&*(),./;'[]<>?:");
	});
	it("Check URL Crafting", () => {
		let url = helpers.craftURL(
			"input=1+1&podstate=Step-by-step%20solution&output=json"
		);
		expect(url).to.be.a("string");
		expect(url).to.equal(
			"https://api.wolframalpha.com/v2/query.jsp?appid=3H4296%2D5YPAGQUJK7&input=1%2B1&output=json&podstate=Step%2Dby%2Dstep%20solution&sig=05CB0200C84292313409D85A6591DC19"
		);
	});
});
