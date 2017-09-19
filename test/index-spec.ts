
import * as chai from "chai";
import {execSync} from "child_process";
import {mkdirSync, writeFileSync} from "fs";
import {resolve} from "path";
import {sync as rmSync} from "rimraf";
import TslintGitStatus from "../src/index";
const expect = chai.expect;

describe("index", () => {
  before(() => {
    rmSync(resolve(__dirname, "file"));
  });

  beforeEach(() => {
    mkdirSync(resolve(__dirname, "file"));
  });

  afterEach(() => {
    rmSync(resolve(__dirname, "file"));
  });

  after(() => {
    execSync("git add .");
  });

  it("should provide Greeter", (done) => {
    writeFileSync(resolve(__dirname, "file/test.ts"), "function test() { console.log('test'); }");
    writeFileSync(resolve(__dirname, "file/test2.ts"), "function test() { console.log('test'); }");
    execSync("git add .");

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
