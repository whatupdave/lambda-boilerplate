# Lambda Boilerplate

Boilierplate for an AWS Lambda function.

## Includes

* babeljs for ES6/7 radness
* mocha/chai for testing
* gulp to compile/zip/deploy to Lambda
* eslint for eslinting
* bin wrapper for cli testing

## Usage

You can run your handler locally with
```
./bin/run world
```

Run the tests with
```
gulp       # run continuously watching for changes
gulp test  # run once
```

## Deployment

You want to make sure you have your `~/.aws/credentials` set. Make sure your `lambda-config.js` has the right deets. Then you can:
```
# ( •_•)>⌐■-■
# (⌐■_■)

gulp deploy
```
