import * as chalk from "chalk";
import {ChildProcess, spawn} from "child_process";
import {existsSync, statSync} from "fs";
import GitStagedFilterFile, {IFileStatus} from "git-staged-filter-file-extension";
import {isAbsolute, resolve} from "path";

const log = console.log;

export default class TslintGitStaged {
  constructor(readonly tsLintPath: string, readonly gitDirPath: string, readonly ext: (string | string[]) = "ts") {
  }

  public start(): Promise<any> {
    const gitStagedFiles = new GitStagedFilterFile(this.gitDirPath, {ext: this.ext});
    return gitStagedFiles.start()
      .then((files) => {
        const fileArr: string[] = [];
        const tsLintConfig = resolve(__dirname, this.tsLintPath);
        const tsLint = resolve(__dirname, this.gitDirPath, "./node_modules/.bin/tslint");
        files.forEach((file) => {
          if (file.status === "A" || file.status === "M" || file.status === "C") {
            fileArr.push(resolve(__dirname, this.gitDirPath, file.path));
          }
        });

        if (fileArr.length === 0) {
          return Promise.resolve("Nothing to lint");
        }

        let lintCmd: ChildProcess;
        if (existsSync(tsLint)) { // tslint:disable-line
          lintCmd = spawn(tsLint, ["-c", tsLintConfig].concat(fileArr));
        } else {
          lintCmd = spawn("tslint", ["-c", tsLintConfig].concat(fileArr));
        }

        lintCmd.on("error", (err) => {
          return Promise.reject(`Execute tslint failed: ${err}`);
        });

        let countError = 0;
        lintCmd.stdout.on("data", (data) => {
          // print pretty log
          const result = data.toString().split("\n").filter((val) => val);
          result.forEach((line, i) => {
            if (line.match(/^ERROR:/g)) {
              countError++;
              log(chalk.underline(line));
            } else {
              log(line);
            }
          });

          if (countError > 0) {
            log(chalk.bgRed(`Total errors: ${countError}`));
          }
        });

        lintCmd.stderr.on("data", (data) => {
          console.log(`stderr: ${data.toString()}`);
        });

        return new Promise((resolved, reject) => {
          lintCmd.on("close", (code) => {
            if (countError > 0) {
              return reject("Lint fail");
            }
            return resolved(code);
          });
        });
      });
  }
}
