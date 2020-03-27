/*
 * COMMON helpers
 */
const isArray = (arg) => Object.prototype.toString.call(arg) === '[object Array]'
const getArrDifference = (arr1, arr2) => {
  return arr1.concat(arr2).filter((v, i, arr) => {
    return arr.indexOf(v) === arr.lastIndexOf(v);
  })
}
/*
 * 所有的权限数据
 * 使用最简单的中文 id 数据，可扩展为复杂的菜单层级数组
 */
const allPrivileges = [
  '查看全部车辆',
  '查看超标车辆',
  '查看车辆详情'
]
