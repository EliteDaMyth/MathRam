import { expect } from "chai";
import { query } from "../src/index";

describe("Query Tests", () => {
	it("Check Simple Addition", async () => {
		const answer = await query("1+1");
		expect(answer.queryresult.error).to.be.false;
		expect(answer.queryresult.pods).to.be.an("array");
		expect(answer.queryresult.pods[1].subpods[0].plaintext).to.equal("2");
	});
});
