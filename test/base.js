import clock from "../index";
import assert from "assert";

describe("clock", () => {
    it("base", (done) => {
        let counter = 0;
        clock((name, sTime) => {
            counter++;
        });
        setTimeout(() => {
            assert.equal(counter, 2);
            done();
        }, 1500);
    });
});