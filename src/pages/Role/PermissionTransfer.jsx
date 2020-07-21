import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Transfer, message } from 'antd'

const propTypes = {
  role: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    permissions: PropTypes.arrayOf(PropTypes.string)
  }),
  permissions: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string
  })),
  updateRoleAsync: PropTypes.func.isRequired
}

const defaultProps = {
  permissions: [],
  role: []
}

function PermissionTransfer (props) {
  const { role, permissions, updateRoleAsync } = props
  const [mockData, setMockData] = useState([])
  const [targetKeys, setTargetKeys] = useState([])
  useEffect(() => {
    setMockData(permissions.map(item => {
      item.key = item._id
      return item
    }))

    setTargetKeys(role.permissions || [])
  }, [permissions, role])

  const handleChange = targetKeys => {
    const newRole = {
      ...role,
      permissions: targetKeys
    }
    updateRoleAsync(newRole).then(resp => {
      setTargetKeys(targetKeys)
      message.success(`更新角色${resp.data.name}成功`)
    }).catch(err => {
      message.error("更新角色失败，请刷新重试")
    })
  }

  const filterOption = (inputValue, option) => {
    return option.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
  }

  return (
    <Transfer
      titles={['未分配权限', '已分配权限']}
      dataSource={mockData}
      targetKeys={targetKeys}
      showSearch
      onChange={handleChange}
      filterOption={filterOption}
      render={item => item.name + "(" + item.code + ")"}
      listStyle={{
        width: '45%',
        height: '100%'
      }}
      locale={{ itemUnit: '项', itemsUnit: '项', searchPlaceholder: '请输入搜索内容' }}
      style={{width: "100%", height: "100%"}}
    />
  )
}

PermissionTransfer.propTypes = propTypes
PermissionTransfer.defaultProps = defaultProps

export default PermissionTransfer
