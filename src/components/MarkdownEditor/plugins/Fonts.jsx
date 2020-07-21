import React, {Component, Fragment} from 'react'
import i18n from '../i18n'
import Icon from '../components/Icon'

class Fonts extends Component {
  static align = 'left';
  static pluginName = 'fonts'
  render () {
    const { editor } = this.props
    return (
      <Fragment>
        <span
          title={i18n.get("btnBold")}
          onClick={() => editor.insertMarkdown('bold')}
        >
          <Icon type="bold" />
        </span>
        <span
          title={i18n.get("btnItalic")}
          onClick={() => editor.insertMarkdown('itatic')}
        >
          <Icon type="italic" />
        </span>
        <span
          title={i18n.get("btnUnderline")}
          onClick={() => editor.insertMarkdown('underline')}
        >
          <Icon type="underline" />
        </span>
        <span
          title={i18n.get("btnStrikethrough")}
          onClick={() => editor.insertMarkdown('strikethrough')}
        >
          <Icon type="strikethrough" />
        </span>
        <span
          title={i18n.get("btnUnordered")}
          onClick={() => editor.insertMarkdown('unordered')}
        >
          <Icon type="list-unordered" />
        </span>
        <span
          title={i18n.get("btnOrdered")}
          onClick={() => editor.insertMarkdown('ordered')}
        >
          <Icon type="list-ordered" />
        </span>
        <span
          title={i18n.get("btnQuote")}
          onClick={() => editor.insertMarkdown('quote')}
        >
          <Icon type="quote" />
        </span>
        <span
          title={i18n.get("btnLineBreak")}
          onClick={() => editor.insertMarkdown('hr')}
        >
          <Icon type="wrap" />
        </span>
        <span
          title={i18n.get("btnInlineCode")}
          onClick={() => editor.insertMarkdown('inlinecode')}
        >
          <Icon type="code" />
        </span>
        <span
          title={i18n.get("btnCode")}
          onClick={() => editor.insertMarkdown('code')}
        >
          <Icon type="code-block" />
        </span>
      </Fragment>
    )
  }
}
export default Fonts
