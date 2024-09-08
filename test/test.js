import { lr, pretty } from "../dist/index.js"
import { fileTests } from "@lezer/generator/dist/test"

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

function testPretty
() {
  let prettyDir

  function isInput
  (file) {
    if (file.endsWith('.leztree')) {
      if (file.endsWith('.leztree.leztree'))
        return 0
      return 1
    }
    return 0
  }

  prettyDir = path.join(caseDir, "pretty")
  describe('pretty', () => {
    for (let file of fs.readdirSync(prettyDir)) {
      let content, name

      content = fs.readFileSync(path.join(prettyDir, file), "utf8")
      if (isInput(file)) {
        name = /^[^\.]*/.exec(file)[0]
        it(name, () => {
          let tree, expected

          expected = fs.readFileSync(path.join(prettyDir, name + '.leztree.leztree'), "utf8")?.trim()
          tree = lr.parser.parse(content)
          assert.equal(pretty(tree.topNode), expected)
        })
      }
    }
  })
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
