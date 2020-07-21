import React, {useState, useEffect, useRef} from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card, Button, Space, Input, Modal, message } from 'antd'
import { ArrowLeftOutlined, SaveOutlined, UploadOutlined } from '@ant-design/icons'
import memoize from 'memoize-one'
import Editor from '../../components/MarkdownEditor'
import Styles from './ArticleEditor.module.less'
import { addArticleAsync, updateArticleAsync } from '../../redux/actions/articlesAction'
import { getCategoryTree, getCategories } from '../../redux/selectors/categorySelectors'
import { getArticle } from '../../redux/selectors/articleSelectors'
import { getAuth } from '../../redux/selectors/authSelectors'
import { reqUploadImg } from '../../api/api'
import CategoryCascader from '../../components/CategoryCascader/CategoryCascader'

const propTypes = {
  operate: PropTypes.oneOf(["add", "update"]),
  article: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string
  }),
  addArticleAsync: PropTypes.func,
  updateArticleAsync: PropTypes.func
}

const getParentCategoriesById = (categories, id) => {
  if (categories.length <=0 || !id) {
    return []
  }
  const parentCategory = categories.find(i => i._id === id)
  const parent = parentCategory ? parentCategory.parent : ''
  return categories.reduce((parents, item) => {
    if (parent === item._id) {
      parents.unshift(parent)
      if (item.parent) {
        return [...getParentCategoriesById(categories, parent), ...parents]
      }
    }

    return parents
  }, [])
}
const onImageUpload = file => {
  return new Promise((resolve, reject) => {
    if (file.type.includes('image')) {
      /* 图片才处理，否则报错 */
      const formData = new FormData()
      formData.append('file', file)
      reqUploadImg(formData).then(res => {
        resolve(res.file.url)
      }).catch(err => {
        // 上传不成功，就转为使用base64
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = e => {
          resolve(e.target.result)
        }
      })
    } else {
      reject('非图片')
    }
  })
}
const memoizeGetParentCategories = memoize(getParentCategoriesById)
function ArticleEditor (props) {
  const { categories, plainCategories, article, operate, id, auth, addArticleAsync, updateArticleAsync } = props
  const [title, setTitle] = useState(operate === 'update' ? article.title : '')
  const [category, setCategory] = useState(operate === 'update' ? article.category : '')
  const [md, setMd] = useState(operate === 'update' ? article.content : '')
  const history = useHistory()
  const [modify, setModify] = useState(false)
  const htmlRef = useRef('')
  const onChange = ({md, html}) => {
    setMd(md)
    htmlRef.current = html
  }
  const save = (isPublish) => {
    const time = new Date().getTime()
    const regExp = /<p>(.*?)<\/p>/i
    const desc = htmlRef.current.match(regExp)[1]
    let post = null
    switch (operate) {
      case 'add' :
        post = {
          title,
          category,
          desc,
          content: md,
          author: auth._id,
          createAt: time,
          updateAt: time,
          isPublish: !!isPublish
        }
        addArticleAsync(post).then(resp => {
          message.success("添加文章成功")
          history.replace('/articles')
        }).catch(err => {
          message.error("添加文章失败:" + err.msg)
        })
        break;
      case 'update':
        post = {
          ...article,
          title,
          desc,
          category,
          content: md,
          updateAt: time,
          isPublish: !!isPublish
        }
        updateArticleAsync(post).then(resp => {
          message.success("更新文章成功")
          history.replace('/articles/' + id)
        }).catch(err => {
          message.error("更新文章失败:" + err.msg)
        })
        break;
      default:
        break;
    }
    
  }
  const publish = () => {
    save(true)
  }
  const goBack = () => {
    if (modify) {
      Modal.confirm({
        title: '确认',
        content: '内容存在修改，是否确认离开编辑界面?',
        okText: '是, 确认离开',
        cancelText: '否，我再想想',
        onOk: () => {
          if (operate === 'update') {
            history.replace('/articles/' + id)
          } else {
            history.replace('/articles')
          } 
        }
      })
    } else {
      if (operate === 'update') {
        history.replace('/articles/' + id)
      } else {
        history.replace('/articles')
      }
    }
  }
  useEffect(() => {
    if (operate === 'add') {
      setModify(md !== '' || title !== '' || category !== '')
    } else {
      article && setModify(md !== article.content || category !== article.category || title !== article.title)
    }
  }, [md, category, title, article, operate])
  
  useEffect(() => {
    if (operate === 'update' && !article._id) {
      history.replace('/articles/' + id)
    }
  }, [operate, article, history, id])
  return (
    <Card
      title={
        <div className={Styles["article-title"]}>
          <Button type="link" onClick={goBack}>
            <Space><ArrowLeftOutlined /><span className={Styles["back"]}>返回文章列表</span></Space>
          </Button>
          <div className={Styles["article-title-input"]}>
            <Input placeholder="文章标题" onChange={e => setTitle(e.target.value)} value={title} />
            <CategoryCascader
              className={Styles["cascader"]}
              categories={categories}
              plaincategories={plainCategories}
              onSelect={setCategory}
              defaultValue={[...memoizeGetParentCategories(plainCategories, category), category]}
               />
          </div>
        </div>
      }
      extra={
        <div className={Styles["article-operate"]}>
          <Space>
            <Button type="primary" onClick={publish} disabled={!modify}><UploadOutlined />发布</Button>
            <Button onClick={save} disabled={!modify}><SaveOutlined />保存</Button>
          </Space>
        </div>
      }
      className={Styles["article-container"]}
      bodyStyle={{"width": "100%", height: "calc(100% - 80px)"}}
    >
      <Editor onChange={onChange} value={md} style={{width: "100%", height: "100%"}} onImageUpload={onImageUpload} />
    </Card>
  )
}

ArticleEditor.propTypes = propTypes

export default connect(
  state => ({
    categories: getCategoryTree(state) || [],
    plainCategories: getCategories(state) || [],
    article: getArticle(state) || {},
    auth: getAuth(state)
  }),
  {addArticleAsync, updateArticleAsync}
)(ArticleEditor)