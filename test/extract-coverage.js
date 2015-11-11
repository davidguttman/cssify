const fs = require('fs')
const path = require('path')
const concatStream = require('concat-stream')

const covPath = path.join(__dirname, '..', 'coverage', 'coverage-browser.json')

process.stdin.pipe(concatStream(input => {
  input = input.toString('utf-8')
  const sp = input.split('# coverage: ')
  const output = sp[0]
  const coverage = sp[1]
  console.log(output)

  fs.writeFile(covPath, coverage, err => {
    if (err) console.error(err)
  })
}))
