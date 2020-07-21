/* 统一加载管理 */

const loading = (state = {}, action) => {

  const { type } = action
  const matches = /(.*)_(SUCCESS|FAILURE|REQUEST)/.exec(type)
  // 如果不是 *_REQUEST / *_SUCCESS /  *_FAILURE actions, 我们就将它们忽略
  if (!matches) {
    return state
  }
  const [, requestName, requestType] = matches
  return {
    ...state,
    // 存储当前是否正在发生请求
    // 例如：当收到GET_TODOS_REQUEST的时候，isFetching为true
    // 当收到GET_TODOS_SUCCESS / GET_TODOS_FAILURE的时候，isFetching为false
    [requestName]: requestType === 'REQUEST'
  }

}

export default loading