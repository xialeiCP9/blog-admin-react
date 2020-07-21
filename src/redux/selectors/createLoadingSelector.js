// 查看是不是所有actions的loading都是true
export default (actions = []) => state => {
  return actions.some(action => state.loading[action])
}