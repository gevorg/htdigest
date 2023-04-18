# htdigest
[Node.js](http://nodejs.org/) package for HTTP Digest Authentication password file utility.

[![build](https://github.com/gevorg/htdigest/workflows/build/badge.svg)](https://github.com/gevorg/htdigest/actions/workflows/build.yml)

## Installation

Via git (or downloaded tarball):

```bash
$ git clone git@github.com:gevorg/htdigest.git
```
Via [npm](http://npmjs.org/):

```bash
$ npm install -g htdigest
```    
## Usage

```bash
$ htdigest [-c] passwordfile realm username
```    

## Options

 - `-c` - Create a new file.

## Running tests

It uses [mocha](https://mochajs.org/), so just run following command in package directory:

```bash
$ npm test
```

## License

The MIT License (MIT)
