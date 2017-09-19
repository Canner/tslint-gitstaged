# tslint-gitstaged

**Please use v5.4.3 or higher version of tslint**

Using **current git status** to find out modfied and added files passing tslint, to prevent lint the whole repository again and again.  This is a nice package to use along with `git precommit`.

## Install

```
npm install tslint-gitstaged
```

## Command line usage

Install global

```
npm i -g tslint-gitstaged
```

Usage

```
  Usage: tslintgs [options] [command]

  Commands:

    help  Display help

  Options:

    -e, --ext [value]     extension names, can use multiple extensions seperate with comma (defaults to "ts,tsx")
    -g, --git [value]     your git directory, where your .git exist (defaults to "./")
    -h, --help            Output usage information
    -t, --tslint [value]  tslint.json file path (defaults to "./tslint.json")
    -v, --version         Output the version number
```

## API

### TslintGitStaged(tslintrcPath, gitPath, extension)

- tslintrcPath: path to your tslintrc file
- gitPath: path to your `.git`
- extension `string | string[]`: which kind of extensions do you want to lint with tslint.

## Usage

```js
// TslintGitStaged(<tslint.json path>, <git repository path>, <extension default 'ts'>)
new TslintGitStaged(resolve(__dirname, "./tslint.json"), resolve(__dirname, "../"), ".ts").start()
      .then((result) => {
        // success no lint error, done lint
      })
      .catch((err) => {
        // err, when lint failed
      });
```

## Eslint users

- https://github.com/Canner/eslint-gitstaged

## License

MIT
