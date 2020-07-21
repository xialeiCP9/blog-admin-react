import React, { Component } from 'react'
import PropTypes from 'prop-types'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Emitter from 'eventemitter3'
import Styles from './style.module.less'
import './markdown.less'
import NavigationBar from '../components/NavigationBar'
import getDecorated from '../utils/decorate'
import getUploadPlaceholder from '../utils/getUploadPlaceholder'
import onImageUpload from '../utils/onImageUpload'

const propTypes = {
  onChange: PropTypes.func.isRequired, // 文章内容改变时，将文章内容传回
  text: PropTypes.string, // 默认文章内容
  onImageUpload: PropTypes.func // 图片上传函数，默认是按照base64编码预览，不直接上传到后台
}

class Editor extends Component {
  static plugins = []
  /* 注册插件 */
  static use (comp) {
    Editor.plugins.push(comp)
  } 
  constructor (props) {
    super(props)
    /* 配置markdownit */
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      pedantic: false,
      sanitize: false,
      tables: true,
      breaks: false,
      smartLists: true,
      smartypants: false,
      highlight: function (code) {
        return hljs.highlightAuto(code).value
      }
    })
    /* markdown节点 */
    this.nodeMd = React.createRef()
    this.nodeHtml = React.createRef()
    this.mdWrap = React.createRef()
    this.htmlWrap = React.createRef()
    this.state = {
      fullScreen: false, //是否全屏
      plugins: this.getPlugins(), //获取组件
      text: (props.text || '').replace(/↵/g, '\n'), //markdown内容
      html: '',
      view: {
        md: true,
        html: true
      }
    }
    this.emitter = new Emitter()
    this.onImageUpload = props.onImageUpload || onImageUpload
  }
  componentDidMount () {
    this.renderHtml(this.props.text || '')
    /* 注册markdown更新事件 */
    this.emitter.on('change', this.setText)
  }
  componentWillUnmount () {
    this.emitter.off('change', this.setText)
  }
  componentDidUpdate (prevProps) {
    if (prevProps.text !== this.props.text) {
      this.setText(this.props.text)
    }
  }
  /* 更改Markdowntext内容 */
  handleChange = e => {
    this.setText(e.target.value)
  }

  /* 设置markdown text内容, 并同步更新html */
  setText = (text, newSelection) => {
    this.setState({
      text
    }, () => {
      this.renderHtml()
      /* 设置选中区域 */
      if (newSelection) {
        this.setSelection(newSelection)
      }
    })
  }
  renderHtml = () => {
    const { text } = this.state
    const html = marked(text || '')
    this.setHtml(html)
    this.htmlChanged = true
  }
  /* 获取text内容 */
  getText = () => {
    return this.state.text
  }
  /* 设置解析后的html内容 */
  setHtml = html => {
    this.setState({
      html
    }, () => {
      this.props.onChange({md: this.state.text, html})
    })
  }
  /* 设置view */
  setView (view) {
    this.setState({
      view
    }, () => this.emitter.emit('viewChange', view))
  }
  /* 获取光标选中内容 */
  getSelection = () => {
    const source = this.nodeMd.current
    const start = source.selectionStart
    const end = source.selectionEnd
    const text = this.state.text.slice(start,end)
    return {
      text,
      start,
      end
    }
  }
  /* 设置选中区域 */
  setSelection = ({start, end}) => {
    const source = this.nodeMd.current
    source.setSelectionRange(start, end, 'forward')
    source.focus()
  }
  /* 插入markdown内容 */
  insertMarkdown = (type, options) => {
    const selection = this.getSelection()
    const decorate = getDecorated(selection.text, type, options)
    this.insertText(decorate.text, decorate.selection, true)
  }
  /**
  * 插入文本方法
  * @param {value} 插入的文本内容
  * @param {newSelection} 新的选择区域
  * @param {isReplace} 是否替换掉选择区域的内容 
  **/
  insertText = (value, newSelection, isReplace) => {
    const {text} = this.state
    const selection = this.getSelection()
    const beforeContent = text.slice(0, selection.start)
    const afterContent = text.slice(isReplace ? selection.end : selection.start, text.length)
    /* 设置markdown text */
    this.emitter.emit('change', beforeContent + value + afterContent, newSelection ? {
      start: beforeContent.length + newSelection.start,
      end: beforeContent.length + newSelection.end
    } : {
      start: beforeContent.length,
      end: beforeContent.length
    })
  }

  getPlugins () { //获取插件
    return Editor.plugins.reduce((result, it) => {
      if (result[it.align] === undefined) {
        result[it.align] = []
      }
      result[it.align].push(React.createElement(it, {
        editor: this,
        key: it.pluginName
      }))
      return result
    }, {})
  }
  isFullScreen () {
    return this.state.fullScreen
  }
  /* 粘贴事件 */
  handlePaste = (event) => {
    const clipboardData = event.nativeEvent.clipboardData || window.clipboardData
    if (clipboardData.items) {
      event.preventDefault()
      this.uploadWithDataTransfer(clipboardData.items)
    }
  }
  uploadWithDataTransfer (items) {
    const queue = [] //粘贴队列
    Array.prototype.forEach.call(items, it => {
      if (it.kind === 'file' && it.type.includes('image')) {
        /* 处理图片 */
        const file = it.getAsFile()
        if (file) {
          /* 生成占位符，然后用图片路径替换占位符 */
          const placeholder = getUploadPlaceholder(file, this.onImageUpload)
          /* 粘贴的文本或者占位符，都放到队列里面，之后再统一插入到文档中 */
          queue.push(Promise.resolve(placeholder.placeholder))

          placeholder.uploaded.then(src => {
            console.log('执行uploaded')
            /* 获取文档的文本，并用src替换占位符 */
            const mdValue = this.getText()
            const start = mdValue.indexOf(placeholder.placeholder)
            const end = start + src.length
            const newMdValue = mdValue.replace(placeholder.placeholder, src)
            this.setText(newMdValue, {
              start,
              end
            })
          })
        }
      } else if (it.kind === 'string' && it.type.includes('text/plain')) {
        queue.push(new Promise(resolve => {
          // getAsString 必须要有一个callback作为参数
          return it.getAsString(res => resolve(res))
        }))
      }
    })
    Promise.all(queue).then(res => {
      console.log('执行queue', res)
      const str = res.join('')
      /* 将str插入到文档中 */
      const selection = this.getSelection()
      /* 替换原文本，再插入，默认选中新文本，否则不选中 */
      this.insertText(str, {
        start: selection.start === selection.end ? str.length : 0,
        end: str.length
      }, true)
    })
  }
  /* 使用input=file 上传图片时 */
  insertPlaceholder (placeholder) {
    const selection = this.getSelection()
    this.insertText(placeholder.placeholder, {
      start: selection.start === selection.end ? placeholder.length : 0,
      end: placeholder.length
    }, true)
    /* 获取到图片路径后，再替换占位符 */
    placeholder.uploaded.then(src => {
      const mdValue = this.getText()
      const newMdValue = mdValue.replace(placeholder.placeholder, src)
      const start = mdValue.indexOf(placeholder.placeholder)
      const end = start + src.length
      this.setText(newMdValue, {
        start,
        end
      })
    })
  }
  /* 跟随滚动 */
  
  handleScroll = (type) => {
    if (type !== this.syncScrollType) {
      // 如果鼠标滚动的区域和放置的区域不一致，就不执行下面的语句,防止死循环
      return;
    }
    const md = this.nodeMd.current
    const html = this.nodeHtml.current
    if (this.htmlChanged) {
      // html有改变时，重新计算两者比例
      
      this.scrollScale = md.scrollHeight / html.scrollHeight
      this.htmlChanged = false
    }
    
    const htmlWrap = this.htmlWrap.current
    
    window.requestAnimationFrame(() => {
      if (type === 'md') {
        htmlWrap.scrollTop = md.scrollTop / this.scrollScale
      } else {
        md.scrollTop = htmlWrap.scrollTop * this.scrollScale
      }
    })
  }

  render () {
    const getPluginsAt = (it) => this.state.plugins[it]
    const { fullScreen, view } = this.state
    return (
      <div
        className={[Styles['rc-md-container'], fullScreen ? Styles['full'] : ''].join(" ")}
        style={this.props.style}>
        <NavigationBar left={getPluginsAt('left')} right={getPluginsAt('right')} />
        <div className={Styles['md-container']}>
          <section
            className={[Styles['section'], Styles['sec-md'], view.md ? Styles['visible'] : Styles['in-visible']].join(" ")}
            onScroll={this.handleScroll.bind(this, "md")}
            onMouseOver={(e) => this.syncScrollType = "md"}
            ref={this.mdWrap}
          >
            <textarea
              id="textarea"
              name="textarea" 
              placeholder="尽情书写吧"
              ref={this.nodeMd}
              className={[Styles["section-container"], Styles["input"]].join(" ")}
              value={this.state.text}
              onChange={this.handleChange}
              onPaste={this.handlePaste}
              
            >
            </textarea>
          </section>
          <section
            className={[Styles['section'], Styles['sec-html'], view.html ? Styles['visible'] : Styles['in-visible']].join(" ")}  
            ref={this.htmlWrap}
            onScroll={this.handleScroll.bind(this, "html")}
            onMouseOver={(e) => this.syncScrollType = "html"}
          >
            <div
              className={[Styles["section-container"], Styles["html-wrap"], "markdown"].join(" ")}
              dangerouslySetInnerHTML={{__html: this.state.html}}
              ref={this.nodeHtml}
            >
            </div>
          </section>
        </div>
      </div>
    )
  }
}

Editor.propTypes = propTypes

export default Editor
