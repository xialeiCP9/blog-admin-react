import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { Card, Table, Avatar, Button, message, Tooltip, Space, Input } from 'antd'
import { SyncOutlined, SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import Styles from './UserListPage.module.less'
import UserDetail from './UserDetail'

function UserListPage (props) {
  const { users, roles, permissions, updateUserAsync, loadUsersAsync, isFetching } = props
  const [height, setHeight] = useState(0) // 表格高度
  const [card, setCard] = useState(null) // cardDOM元素
  const [searchText, setSearchText] = useState('')
  const [searchColumn, setSearchColumn] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [visible, setVisible] = useState(false)
  const dataSource = useMemo(() => {
    return users.map(item => {
      item.key = item._id
      return item
    })
  }, [users])

  /* 使用username进行筛选 */
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
      <div style={{padding: 8}}>
        <Input
          placeholder={`搜索${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{width: 188, marginBottom: 8, display: 'block'}}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            搜索
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{width: 90}}
          >
            重置
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    render: text =>
      searchColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  })

  const columns = [
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 100,
      render: avatar => (
        <Avatar src={avatar} size={40} />
      )
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      ...getColumnSearchProps('username')
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      width: 120,
      render: id => {
        const role = roles.find(item => item._id === id)
        return <span>{role ? role.name : ""}</span>
      }
    },
    {
      title: '是否启用',
      dataIndex: 'isValid',
      key: 'isValid',
      width: 150,
      filters: [
        {text: '启用', value: true},
        {text: '禁用', value: false}
      ],
      onFilter: (value, record) => record.isValid === value,
      sorter: (a, b) => (a.isValid && b.isValid) ? 1 : -1,
      sortDirections: ['descend', 'ascend'],
      render: (isValid, record) => (
        <Tooltip placement="topLeft" title={`点击${isValid ? '禁用' : '启用'}用户`}>
          <Button type={isValid ? "primary" : "danger"} 
            onClick={e => setIsValid(e, record)}
          >
            {isValid ? "启用态" : "禁用态"}
          </Button>
        </Tooltip>
      )
    }
  ]
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0])
    setSearchColumn(dataIndex)
  }
  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  }
  /* 查看用户明细 */
  const showDetail = record => {
    setSelectedUser(record)
    setVisible(true)
  }
  /* 更新启用状态 */
  const setIsValid = (e, record) => {
    e.stopPropagation()
    const user = {
      ...record,
      isValid: !record.isValid
    }
    updateUserAsync(user).then(resp => {
      message.success(`${resp.msg}, 用户${resp.data.username}已${resp.data.isValid ? '启用' : '禁用'}`)
    }).catch(err => {
      message.error(`修改失败, ${err.msg}`)
    })
  }
  /* resize事件时，同步修改表格高度 */
  const onResize = useCallback(() => {
    /* 修改尺寸，就再计算一次表格高度,确保不超出界面 */
    if (card.offsetHeight - 180 !== height)
      setHeight(card.offsetHeight - 180)
  }, [card, height])

  /* 初始化 */
  useEffect(() => {
    /* 初始化列表高度 */
    const listRef = document.getElementById("userListCard")
    setCard(listRef)
    setHeight(listRef.offsetHeight - 180)
  }, [])
  /* 添加resize事件监听 */
  useEffect(() => {
    /* 增加尺寸改变事件 */
    window.addEventListener('resize', onResize)
    return (() => window.removeEventListener('resize', onResize))
  }, [onResize])

  return (
    <Card 
      title="用户管理" 
      className={Styles["user-list"]} 
      id="userListCard"
      extra={
        <Tooltip placement="topLeft" title="点击刷新">
          <Button
            type="primary"
            icon={<SyncOutlined spin={isFetching} />}
            onClick={() => loadUsersAsync().then(resp => {
              message.success('已获取最新用户数据')
            }).catch(err => {
              message.error('获取用户数据失败，请检查网络或通知管理员')
            })}
          />
        </Tooltip>
      }
      >
      <Table
        locale={{emptyText: '暂无数据', filterConfirm: '确定', filterReset: '重置'}}
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        scroll={{y: height}}
        onRow={record => {
          return {
            onClick: event => {showDetail(record)}
          }
        }}
      />
      <UserDetail 
        user={selectedUser} 
        visible={visible} 
        roles={roles} 
        permissions={permissions} 
        updateUserAsync={updateUserAsync}
        setSelectedUser={setSelectedUser}
        setVisible={setVisible}
      />
    </Card>
  )
}

export default UserListPage