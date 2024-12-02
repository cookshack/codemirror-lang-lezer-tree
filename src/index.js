import * as Grammar from './syntax.grammar'
import { LRLanguage, LanguageSupport, indentNodeProp, delimitedIndent, foldNodeProp, foldInside } from '@codemirror/language'

let props, data, parser

props = [ indentNodeProp.add({ Ch: delimitedIndent({ closing: ')' }) }),
          foldNodeProp.add({ Ch: foldInside }) ]

data = { commentTokens: { line: '#' },
         closeBrackets: { brackets: '(' } }

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
