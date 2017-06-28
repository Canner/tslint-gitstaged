# tslint-gitstatus

Using **current git status** to find out modfied and added files passing tslint, to prevent lint the whole repository again and again.  This is a nice package to use along with `git precommit`.

## Install

```
npm install tslint-gitstatus
```

## Command line usage

Install global

```
npm i -g tslint-gitstatus
```

Usage

```
  Usage: tslintgs [options] [command]

  Commands:

    help  Display help

  Options:

    -e, --ext [value]     extension names, can use multiple extensions seperate with comma (defaults to ".ts")
    -g, --git [value]     your git directory, where your .git exist (defaults to "process.cwd()")
    -h, --help            Output usage information
    -t, --tslint [value]  tslint.json file path (defaults to "<process.cwd()>/tslint.json")
    -v, --version         Output the version number
```

## API

### TslintGitStatus(tslintrcPath, gitPath, extension)

- tslintrcPath: path to your tslintrc file
- gitPath: path to your `.git`
- extension `string | string[]`: which kind of extensions do you want to lint with tslint.

## Usage

```js
// TslintGitStatus(<tslint.json path>, <git repository path>, <extension default 'ts'>)
new TslintGitStatus(resolve(__dirname, "./tslint.json"), resolve(__dirname, "../"), ".ts").start()
      .then((result) => {
        // success no lint error, done lint
      })
      .catch((err) => {
        // err, when lint failed
      });
```

## Eslint users

- https://github.com/Canner/eslint-gitstatus

## Install troubleshooting

If you can't install `nodegit` see link below.

Mac:

```
sudo xcode-select --install
```

https://github.com/nodegit/nodegit/issues/1134

## License

MIT
