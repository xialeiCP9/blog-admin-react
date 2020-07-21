import React, {Fragment, useState} from 'react'
import { Steps, Input, Button, Modal, Form } from 'antd'
import { MailOutlined, ExclamationCircleOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons'
import Styles from './ChangePassword.module.less'
import { reqValidateEmail, reqActiveEmail, reqChangePwd } from '../../api/api'

const { Step } = Steps

function ChangePassword (props) {
  const { email, username, _id } = props
  const [current, setCurrent] = useState(0)
  const [status, setStatus] = useState('process')
  const sendMail = () => {
    setCurrent(1)
    setStatus('wait')
    reqValidateEmail({email, username, _id}).then(resp => {
      Modal.confirm({
        title: "是否邮件确认",
        okText: '确认',
        cancelText: '取消',
        icon: <ExclamationCircleOutlined />,
        content: '邮件已发送，是否已经在邮件中确认？',
        onOk () {
          reqActiveEmail(_id).then(resp => {
            setStatus('process')
          }).catch(err => {
            setStatus('error')
          })
        },
        onCancel() {

        }
      })
    }).catch(err => {
      setStatus('error')
    })
  }
  const changePwd = values => {
    const {password, newPassword} = values
    setCurrent(2)
    setStatus('process')
    reqChangePwd({password, newPassword, username}).then(resp => {   
      setStatus('finish')
    }).catch(err => {
      setStatus('error')
    })
  }
  const steps = [
    {
      title: '邮箱验证',
      content: (
        <Fragment>
          邮箱：<Input type="email" placeholder="注册邮箱" prefix={<MailOutlined />} disabled value={email} />
          <Button type="primary" onClick={sendMail} style={{margin: "20px 0", width: "100%"}}>下一步</Button>
        </Fragment>
      )
    },
    {
      title: '修改密码',
      content: status === 'wait' && current === 1 ?
      (
        <div style={{width: "100%", height: "100%", textAlign: "center"}}><LoadingOutlined size="large" /></div>
      ) 
      :
      status === 'process' && current === 1 ?
      (
        <Form
          onFinish={changePwd}
        >
          <Form.Item label="原密码" name="password" rules={[{required: true, message: "请输入原密码"}]}>
            <Input.Password placeholder="原密码" prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item label="新密码" name="newPassword" rules={[{required: true, message: "新密码不能为空"}]}>
            <Input.Password placeholder="新密码" prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" style={{width: "100%"}} htmlType="submit">确定</Button>
          </Form.Item>
        </Form>
      )
      :
      (<div style={{width: "100%", height: "100%", textAlign: "center"}}>未进行邮箱验证，请刷新后再试</div>)
    },
    {
      title: '修改成功',
      content: status === 'process' && current === 2 ?
      (
        <div style={{width: "100%", height: "100%", textAlign: "center"}}><LoadingOutlined size="large" /></div>
      )
      :
      (<div style={{width: "100%", height: "100%", textAlign: "center"}}>密码修改成功</div>)      
    }
  ]

  return (
    <div className={Styles["change-password-view"]}>
      <Steps current={current} status={status}>
        {
          steps.map(step => (
            <Step title={step.title} key={step.title} />
          ))
        }
      </Steps>
      <div className={Styles["content"]}>
      {
        steps[current].content
      }
      </div>
    </div>
  )
}

export default ChangePassword
