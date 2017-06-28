#!/usr/bin/env node

const args = require('args');
const {resolve} = require('path');
const chalk = require('chalk');
const TslintGitStatus = require('../lib/index').default;

args
  .option('tslint', 'tslint.json file path', resolve(process.cwd(), './tslint.json'))
  .option('git', 'your git directory, where your .git exist', resolve(process.cwd()))
  .option('ext', 'extension names, can use multiple extensions seperate with comma', 'ts,tsx');

const flags = args.parse(process.argv);

new TslintGitStatus(flags.tslint, flags.git, flags.ext.split(',').map(val => `.${val.trim()}`)).start()
  .then(() => {
    console.log(chalk.underline.green("tsLint all pass!"));
  })
  .catch(err => {
    // err, when lint failed
    process.exit(1);
    throw new Error(err);
  });