class I18n {
  constructor () {
    this.tips = {
      'btnExitFullScreen': '退出全屏',
      'btnFullScreen': '全屏',
      'btnClear': '清空',
      'btnLink': '链接',
      'btnBold': '加粗',
      'btnItalic': '斜体',
      'btnUnderline': '下划线',
      'btnStrikethrough': '删除线',
      'btnUnordered': '无序列表',
      'btnOrdered': '有序列表',
      'btnQuote': '引用',
      'btnLineBreak': '换行',
      'btnInlineCode': '行内代码',
      'btnCode': '代码块',
      'btnTable': '表格',
      'btnHeader': '标题',
      'btnImage': '插入图片',
      'All': '显示编辑器和预览',
      'Preview': '仅显示预览',
      'Editor': '仅显示编辑器'
    }
  }
  
  get (key) {
    return this.tips[key]
  }
}
export default new I18n()