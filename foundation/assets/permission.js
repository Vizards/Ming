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
  '查看车辆数据',
  '查看全部车辆',
  '查看超标车辆',
  '查看处理历史记录',
  '查看车辆详情'
]

/*
 * 处理简单的父子菜单逻辑
 * 结构化菜单数据可自行书写逻辑支持
 */
const additionalBannedPrivilegeId = (bannedPrivileges) => {
  if (
    bannedPrivileges.includes('查看处理历史记录')
    && bannedPrivileges.includes('查看超标车辆')
    && bannedPrivileges.includes('查看全部车辆')
  ) {
    bannedPrivileges.push('查看车辆数据')
  }
  window.__bannedPrivileges = bannedPrivileges
  return bannedPrivileges
}

/*
 * 比对当前用户的权限和所有权限之间的差异
 * 生成当前用户所没有的权限
 */
const generateBannedPrivileges = (user_privileges) => {
  const bannedPrivileges = getArrDifference(user_privileges, allPrivileges)
  return additionalBannedPrivilegeId(bannedPrivileges)
}

// 根据用户没有的权限和 DOM 上标识的 id， remove 掉对应的 DOM Elements
const hideElements = () => {
  let profile = localStorage.getItem('profile')
  profile = profile ? JSON.parse(profile) : null

  const savedNodes = []
  if (profile && profile.privileges) {
    const bannedPrivileges = generateBannedPrivileges(profile.privileges)
    bannedPrivileges.forEach(bannedPrivilege => {
      const nodes = document.querySelectorAll(`#${bannedPrivilege}`)
      nodes.forEach(node => {
        const savedNode = {
          node,
          parentNode: node.parentNode
        }
        if (!savedNodes.includes(savedNode)) {
          savedNodes.push(savedNode)
        }
        node.parentNode.removeChild(node)
      })
    })
  }
  window.__savedNodes__ = savedNodes
}

/*
 * remove 掉的 DOM Elements 暂存，以备在切换用户之后恢复
 * 如果从登陆页面跳转到主界面为 window 级跳转，则不需要此 restore 过程
 */
const restoreElements = () => {
  const savedNodes = window.__savedNodes__
  if (isArray(savedNodes)) {
    savedNodes.forEach(savedNode => {
      savedNode.parentNode.appendChild(savedNode.node)
    })
  }
}

// DOM load，隐藏对应 DOM
hideElements()

// 监听从登录界面跳转到主界面的问题
window.addEventListener('popstate', () => {
  if (location.pathname === '/home') { restoreElements() }
  hideElements()
})

// 监听 DOM 变化，运行 hideElements
const callback = () => setTimeout(hideElements, 10)
const observer = new MutationObserver(callback)
const masterNode = document.querySelector(`#root-master`)
if (masterNode) {
  observer.observe(masterNode, {
    childList: true,
    subtree: true,
  })
}
