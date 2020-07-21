import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Space, Skeleton } from 'antd'
import { ArrowLeftOutlined, EditOutlined, DeleteOutlined, CameraOutlined, CommentOutlined, HeartOutlined } from '@ant-design/icons'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import './markdown.less'
import { getArticleWithTitleDatas } from '../../redux/selectors/articleSelectors'
import { loadArticleAsync } from '../../redux/actions/articleAction'
import { LOAD_ARTICLE } from '../../redux/action-types'
import createLoadingSelector from '../../redux/selectors/createLoadingSelector'
import Styles from './Article.module.less'

/* 配置markdown */
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

function ShowArticle (props) {
  console.log("显示文章界面")
  const { article, loadArticleAsync, isFetching } = props
  const id = props.match.params.id
  const [html, setHtml] = useState('')
  useEffect(() => {
    loadArticleAsync(id)
  }, [id, loadArticleAsync])
  useEffect(() => {
    /* 解析markdown */
    const content = marked(article ? article.content : '')
    setHtml(content)
  }, [article])
  return (
    <Card
      className={Styles["card-wrapper"]}
      bodyStyle={{paddingRight: 0, height: 'calc(100% - 50px)'}}
      title={<Link to="/articles"><Space><ArrowLeftOutlined />返回文章列表</Space></Link>}
      extra={
        <ul className={Styles["article-operation"]}>
          <li key="EditOutlined" title="编辑" onClick={() => props.history.push(`/articles/${id}/edit`)}>
            <EditOutlined /><span className={Styles["operation-desc"]}>编辑</span>
          </li>
          <li key="DeleteOutlined" title="删除" onClick={() => props.history.push(`/articles/${id}/del`)}>
            <DeleteOutlined /><span className={Styles["operation-desc"]}>删除</span>
          </li>
          <li key="CameraOutlined" title="配图" onClick={() => props.history.push(`/articles/${id}/uploadimg`)}>
            <CameraOutlined /><span className={Styles["operation-desc"]}>配图</span>
          </li>
          <li key="CommentOutlined" title="评论">
            <CommentOutlined /><span className={Styles["operation-desc"]}>评论({article && article.comments.length})</span>
          </li>
          <li key="HeartOutlined" title="点赞">
            <HeartOutlined /><span className={Styles["operation-desc"]}>点赞({article && article.comments.length})</span>
          </li>
        </ul>
      }
    >
      <Skeleton loading={isFetching} paragraph={{ rows: 20 }} style={{width: '100%', height: '100%'}}>
        <section style={{width: '100%', height: '100%'}}>
          <h1 className={Styles["h1-title"]}>{article ? article.title : ''}</h1>
          <ol className={Styles["category-list"]}>
            {
              article && article.titleDatas.map(t => (
                <li key={t._id}>{t.name}</li>
              ))
            }
          </ol>
          <div className={Styles["article-content"]}>
            <div className="markdown" dangerouslySetInnerHTML={{__html: html}}/>
          </div>
        </section>
      </Skeleton>
    </Card>
  )
}

const loadingSelector = createLoadingSelector([LOAD_ARTICLE])

export default connect(
  state => ({
    article: getArticleWithTitleDatas(state),
    isFetching: loadingSelector(state)
  }),
  { loadArticleAsync }
)(ShowArticle)