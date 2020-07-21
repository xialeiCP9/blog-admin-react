import {
  ArticlePreview,
  ArticleEdit,
} from '../pages'

const routesList = [
  {
    path: '/article/edit',
    title: '增加文章',
    component: ArticleEdit
  },
  {
    path: '/article/:id/edit',
    title: '编辑文章',
    component: ArticleEdit
  },
  {
    path: '/article/:id/preview',
    title: '预览文章',
    component: ArticlePreview
  }
]

export default routesList