import {lr} from "../dist/index.js"
import {fileTests} from "@lezer/generator/dist/test"

import * as fs from "fs"
import * as path from "path"
import { fileURLToPath } from 'url'
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

function testAll() {
  for (let file of fs.readdirSync(caseDir)) {
    if (!/\.txt$/.test(file)) continue
    test1(file)
  }
}

//console.log(process.argv)
//console.log('single: ' + process.env.npm_config_singletest)

if (process.env.npm_config_singletest)
  test1(process.env.npm_config_singletest + '.txt')
else
  testAll()
