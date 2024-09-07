import { styleTags, tags as t } from '@lezer/highlight'

export const highlighting = styleTags({
  'TopNode/Name Special': t.keyword,
  'Name': t.tagName,
  '( )': t.paren,
  ',': t.separator
})
