# @cookshack/codemirror-lang-lezer-tree

Language support for Lezer trees (.leztree files), for CodeMirror 6.

The format of these Lezer trees is like
```
Script(LineComment,
       VariableDeclaration(let,
                           VariableDefinition,
                           Equals,
                           Number),
       ExpressionStatement(AssignmentExpression(VariableName,
                                                UpdateOp,
                                                Number)),
       ExpressionStatement(CallExpression(MemberExpression(VariableName,
                                                           .,
                                                           PropertyName),
                                          ArgList(\(,
                                                  VariableName,
                                                  \)))))
```
as produced by the exported function `pretty`.

The idea is to have syntax highlighting of syntax trees within the editor, to help while developing Lezer grammars for other languages. See `A-x Syntax Tree` in [Bred](https://git.sr.ht/~mattmundell/bred).
