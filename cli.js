#!/usr/bin/env node
const yargs = require('yargs')
const ora = require('ora')
const { dirmages } = require('.')

const spinner = ora()
const argv = yargs
  .usage('Usage: -d <directory>')
  .option('d', {
    alias: 'dir',
    describe: 'Input directory',
    type: 'string',
  })
  .option('w', {
    alias: 'width',
    describe: 'New width',
    type: 'number',
  })
  .option('h', {
    alias: 'height',
    describe: 'New height',
    type: 'number',
  })
  .option('s', {
    alias: 'suffix',
    describe: 'File suffix',
    type: 'string',
  })
  .option('q', {
    alias: 'quiet',
    describe: 'Quiet output',
    type: 'boolean',
  })
  .option('a', {
    alias: 'avoid',
    describe: 'Avoid specific suffix',
    type: 'string',
  }).argv

if (argv.dir) {
  if (!argv.quiet) {
    spinner.start(`Transforming images`)
  }
  dirmages(argv.dir, {
    width: argv.w,
    heigth: argv.h,
    suffix: argv.s,
    avoidRepeat: argv.a ? (argv.a.trim() === '' ? true : argv.a.trim()) : false,
  }).then((total) => {
    if (!argv.quiet) {
      spinner.succeed(`Transformed ${total} images successfully`)
    }
  })
}
