
import * as chai from "chai";
import {mkdirSync, writeFileSync} from "fs";
import {resolve} from "path";
import {sync as rmSync} from "rimraf";
import TslintGitStatus from "../src/index";
const expect = chai.expect;

describe("index", () => {
  it("should provide Greeter", (done) => {
    rmSync(resolve(__dirname, "file"));
    mkdirSync(resolve(__dirname, "file"));
    writeFileSync(resolve(__dirname, "file/test.ts"), "function test() { console.log('test'); }");
    writeFileSync(resolve(__dirname, "file/test2.ts"), "function test() { console.log('test'); }");
    new TslintGitStatus(resolve(__dirname, "../tslint.json"), resolve(__dirname, "../"), ".ts").start()
      .then((result) => {
        rmSync(resolve(__dirname, "file"));
        done("should lint fail");
      })
      .catch((err) => {
        rmSync(resolve(__dirname, "file"));
        done();
      });
  });
});
