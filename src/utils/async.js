/* 异步加载数据 */

function async ({dispatch, type, method, data, success, failed}) {
  // 设置加载状态
  dispatch({type: type + '_REQUEST'})
  // 执行异步方法
  method(data).then(resp => {
    dispatch({type: type + '_SUCCESS'})
    console.log('进入success', resp)
    success(resp)
  }).catch(err => {
    dispatch({type: type + '_FAILURE'})
    //failed(err.response.data)
    console.log('async', type, err)
    failed(err)
  })
}

export default async