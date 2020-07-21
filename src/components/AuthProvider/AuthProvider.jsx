import React, { useEffect, useState, Fragment } from 'react'
import Loading from '../Loading'

function AuthProvider (props) {
  const { autoLoginAsync, user, isFetching } = props
  const token = props.token || localStorage.getItem('token') || sessionStorage.getItem('token')
  const [startFetching, setStartFetching] = useState(true)
  useEffect(() => {
    console.log('AuthProvider() user:', user)
    if (token && !user) {
      autoLoginAsync(token).then(resp => {
        setStartFetching(false)
      }).catch(err => {
        setStartFetching(false)
      })
    }
  }, [token, autoLoginAsync, user])
  return (
    (!!startFetching && (token || isFetching))
    ?
    <Loading isLoading={startFetching && (!!token || isFetching)} tip='正在登录中，请稍后...'/>
    :
    <Fragment>{props.children}</Fragment>
  )
}

export default AuthProvider