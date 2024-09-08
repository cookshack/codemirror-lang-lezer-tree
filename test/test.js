import { lr, pretty } from "../dist/index.js"
import { fileTests } from "@lezer/generator/dist/test"
import * as LZGen from "@lezer/generator"

import * as fs from "fs"
import * as path from "path"
import { fileURLToPath } from 'url'
import assert from 'node:assert/strict'

let caseDir = path.dirname(fileURLToPath(import.meta.url))

function test1(file) {
  let name = /^[^\.]*/.exec(file)[0]
  describe(name, () => {
    let content
    content = fs.readFileSync(path.join(caseDir, file), "utf8")
    //console.log(content)
    for (let {name, run} of fileTests(content, file))
      it(name, () => run(lr.parser))
  })
}

function testPrettyParser
(testName, parser, ext) {
  let prettyDir

  function isInput
  (file) {
    return file.endsWith('.' + ext) && ((file.match(/\./g) || []).length == 1)
  }

  prettyDir = path.join(caseDir, "pretty")
  describe(testName, () => {
    for (let file of fs.readdirSync(prettyDir)) {
      let content, name

      content = fs.readFileSync(path.join(prettyDir, file), "utf8")
      if (isInput(file)) {
        name = /^[^\.]*/.exec(file)[0]
        it(name, () => {
          let tree, expected

          expected = fs.readFileSync(path.join(prettyDir, name + '.' + ext + '.leztree'), "utf8")?.trim()
          tree = parser.parse(content)
          //console.log(pretty(tree.topNode))
          assert.equal(pretty(tree.topNode), expected)
        })
      }
    }
  })
}

// test escaping, need to build grammar by hand to get chars that need escaping
function testPrettyEscape
() {
  let parser

  parser = LZGen.buildParser(`
@top Top { (open | close | comma | backslash | x)* }
open { "(" }
close { ")" }
comma { "," }
backslash { "\\\\" } // a single backslash
x { "x\\\\x" }
@skip { whitespace }
@tokens {
  whitespace { ($[ \t\r\n] | "\r"? "\n")+ }
  // literal tokens
  ")"
  "("
  ","
  "\\\\"
  "x\\\\x"
}
`)
  testPrettyParser('escape', parser, 'esc')
}

function testPretty
() {
  // parse .leztree files, print them with pretty, check they're ok
  testPrettyParser('pretty', lr.parser, 'leztree')
  // test escaping
  testPrettyEscape()
}

function testAll() {
  for (let file of fs.readdirSync(caseDir)) {
    if (!/\.txt$/.test(file)) continue
    test1(file)
  }
  testPretty()
}

//console.log(process.argv)
//console.log('single: ' + process.env.npm_config_singletest)

if (process.env.npm_config_singletest)
  test1(process.env.npm_config_singletest + '.txt')
else
  testAll()
