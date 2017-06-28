import * as chalk from "chalk";
import {ChildProcess, spawn} from "child_process";
import {statSync} from "fs";
import GitStatusFilterFile, {IFileStatus} from "git-status-filter-file-extension";
import {isAbsolute, resolve} from "path";

const log = console.log;

export default class TslintGitStatus {
  constructor(readonly tsLintPath: string, readonly gitDirPath: string, readonly ext: (string | string[]) = "ts") {
  }

  public start(): Promise<string> {
    const gitStatusFiles = new GitStatusFilterFile(this.gitDirPath, this.ext);
    return gitStatusFiles.start()
      .then((files) => {
        const fileArr: string[] = [];
        const tsLintConfig = resolve(__dirname, this.tsLintPath);
        const tsLint = resolve(__dirname, this.gitDirPath, "./node_modules/.bin/tslint");
        files.forEach((file) => {
          if (file.isNew || file.isModified) {
            fileArr.push(resolve(__dirname, this.gitDirPath, file.path()));
          }
        });

        if (fileArr.length === 0) {
          return Promise.resolve("Nothing to lint");
        }

        let lintCmd: ChildProcess;
        try {
          // try local
          lintCmd = spawn(tsLint, ["-c", tsLintConfig].concat(fileArr));
        } catch (e) {
          // try global
          try {
            lintCmd = spawn("tslint", ["-c", tsLintConfig].concat(fileArr));
          } catch (e) {
            return Promise.reject("Can't find tslint");
          }
        }

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

        return new Promise((resolve, reject) => {
          lintCmd.on("close", (code) => {
            if (countError > 0) {
              return reject("Lint fail");
            }
            return resolve(code);
          });
        });
      });
  }
}
