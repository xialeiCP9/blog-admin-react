import React, { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Card, List, Space, Input, Button } from 'antd'
import { StarOutlined, LikeOutlined, MessageOutlined, PlusOutlined } from '@ant-design/icons'
import CategoryCascader from '../../components/CategoryCascader/CategoryCascader'

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function ArticleListPage (props) {
  const { loadArticlesAsync, setArticlesFilter, setCategoriesFilter, articles, categories, isFetching } = props
  const [height, setHeight] = useState(0)
  const [card, setCard] = useState(null) // cardDOM元素
  const handleSearch = value => {
    const regExp =  new RegExp(value.replace(/[[(){}^$|?*+.\\-]/g, '\\$&'), 'ig')
    setArticlesFilter({
      value: regExp
    })
  }
  const searchByCategory = v => {
    if (v) {
      setCategoriesFilter({_id: v})
      setArticlesFilter({category: v})
    } else {
      setCategoriesFilter(null)
      setArticlesFilter(null)
    }
    
  }
  /* resize事件时，同步修改表格高度 */
  const onResize = useCallback(() => {
    /* 修改尺寸，就再计算一次表格高度,确保不超出界面 */
    if (card.offsetHeight - 50 !== height)
      setHeight(card.offsetHeight - 50)
  }, [card, height])
  useEffect(() => {
    loadArticlesAsync()
  }, [loadArticlesAsync])
  /* 初始化 */
  useEffect(() => {
    /* 初始化列表高度 */
    const listRef = document.getElementById("article-list")
    setCard(listRef.parentNode)
    setHeight(listRef.parentNode.offsetHeight - 50)
  }, [])
  /* 添加resize事件监听 */
  useEffect(() => {
    /* 增加尺寸改变事件 */
    window.addEventListener('resize', onResize)
    return (() => window.removeEventListener('resize', onResize))
  }, [onResize])
  return (
    <Card 
      id="article-list" 
      title={
        <div style={{"minWidth": "400px"}}>
          <Space>
            <Input.Search placeholder="搜索文章" onSearch={handleSearch} enterButton style={{minWidth: 300}} />
            <CategoryCascader categories={categories} onSelect={searchByCategory} style={{minWidth: 300}} />
          </Space>
        </div>
      }
      extra={
        <Button type="dashed" style={{marginRight: "20px"}} 
          onClick={() => props.history.push('/articles/add')}><PlusOutlined />写文章</Button>
      }
      bodyStyle={{height: height, overflowY: "auto"}}
    >
      <List
        loading={isFetching} 
        itemLayout="vertical"
        size="large"
        locale={{emptyData: "暂无数据"}}
        dataSource={articles}
        renderItem={item => (
          <List.Item 
            key={item.title}
            actions={[
              <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
              <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />
            ]}
            extra={
              item.bgImg
              ?
              <div style={{
                width: 272,
                height: 100,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                borderRadius: "4px",
                backgroundImage: `url(${item.bgImg})`
              }} />
              :
              ''
            }
          >
            <List.Item.Meta
              title={<Link to={`/articles/${item._id}`}>{item.title}</Link>}
              description={<div dangerouslySetInnerHTML={{__html: item.desc}} />}
            />
          </List.Item>
        )}
      />
    </Card>
  )
}

export default ArticleListPage