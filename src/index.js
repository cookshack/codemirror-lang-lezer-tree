import * as Grammar from './syntax.grammar'
import { LRLanguage, LanguageSupport, /*indentNodeProp,*/ foldNodeProp, foldInside } from '@codemirror/language'

let props, data, parser

props = [ //indentNodeProp.add({ Rule: context => context.column(context.node.from) + context.unit }),
          foldNodeProp.add({ Node: foldInside }),
        ]

data = {}

parser = Grammar.parser.configure({ props: props })

/// A language provider, including highlighting and indentation
/// information.
export
const lr = LRLanguage.define({ name: 'lezer-tree',
                               parser: parser,
                               languageData: data })

/// Language support.
export
function language
() {
  return new LanguageSupport(lr)
}

export
function pretty
(node, offset = 0, indent = 0) {
  if (node) {
    let ret, child, prefix

    ret = ''
    prefix = ''
    if (indent)
      prefix = ' '.repeat(offset)
    offset += (node.name.length + 1)
    child = node.firstChild
    while (child) {
      let str

      str = pretty(child, offset, ret.length)
      if (str) {
        if (ret.length)
          ret += ',\n'
        ret += str
      }
      child = child.nextSibling
    }

    return prefix + node.name + (ret.length ? '(' + ret + ')' : '')
  }
  return ''
}
