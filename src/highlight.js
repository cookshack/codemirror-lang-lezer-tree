import { styleTags, tags as t } from '@lezer/highlight'

export const highlighting = styleTags({
  'Top/Name Special': t.keyword,
  'Name': t.tagName,
  '( )': t.paren,
  ',': t.separator
})
