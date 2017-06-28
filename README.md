# tslint-gitstatus

Using **current git status** to find out modfied and added files passing tslint, to prevent lint the whole repository again and again.  This is a nice package to use along with `git precommit`.

## Install

```
npm install tslint-gitstatus
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

## License

MIT
