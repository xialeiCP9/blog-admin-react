/**
* 用于实现加粗、斜体等markdown格式
**/
import repeat from './repeat'
const SIMPLE_DECORATOR = {
  bold: ['**', '**'],
  itatic: ['*', '*'],
  underline: ['++', '++'],
  strikethrough: ['~~', '~~'],
  quote: ['\n>', '\n'],
  inlinecode: ['`', '`'],
  code: ['\n```\n', '\n```\n']
}
/* h1-h6 */
for (let i = 1 ; i <= 6 ; i ++) {
  SIMPLE_DECORATOR[`h${i}`] = [`\n${repeat('#', i)} `, '\n']
}
/* 有序列表、无序列表 */
function decorateList (target, type) {
  let text = target
  console.log('text', text, text.indexOf('\n'))
  if (text.indexOf('\n') !== 0) {
    text = '\n' + text
  }
  if (type === 'unordered') {
    return text.replace(/\n/g, '\n* ') + '\n'
  } else {
    let count = 1
    return text.replace(/\n/g, () => {
      return `\n${count++}. `
    }) + '\n'
  }
}
/* 表格 */
function decorateTableText (options) {
  const { row = 2, col = 2 } = options
  const rowHeader = ['|']
  const rowData = ['|']
  const rowDivision = ['|']
  let dataStr = ''
  for (let i = 0 ; i < col ; i ++ ) {
    rowHeader.push(' head |')
    rowDivision.push(' --- |')
    rowData.push(' Data |')
  }
  for (let j = 0 ; j < row ; j ++ ) {
    dataStr += `\n${rowData.join('')}`
  }
  return `\n${rowHeader.join('')}\n${rowDivision.join('')}${dataStr}\n`
}
function getDecorated (target, type, options) {
  
  if (typeof SIMPLE_DECORATOR[type] !== 'undefined') {
    return {
      text: `${SIMPLE_DECORATOR[type][0]}${target}${SIMPLE_DECORATOR[type][1]}`,
      selection: {
        start: SIMPLE_DECORATOR[type][0].length,
        end: SIMPLE_DECORATOR[type][0].length + target.length
      }
    }
  }
  switch(type) {
    case 'unordered':
      return {text: decorateList(target, 'unordered')}
    case 'ordered': 
      return {text: decorateList(target, 'ordered')}
    case 'hr':
      return {text: '\n---\n'}
    case 'table':
      return {text: decorateTableText(options)}
    case 'link':
      return {
        text: `[${target}](${options.linkUrl || ''})`,
        selection: {
          start: 1,
          end: target.length + 1
        }
      }
    case 'image':
      return {
        text: `![${target || options.target}](${options.imageUrl || ''})`,
        selection: {
          start: 2,
          end: target.length + 2
        }
      }
    default:
      return {
        text: target,
        selection: {
          start: 0,
          end: target.length
        }
      }
  }
}

export default getDecorated
