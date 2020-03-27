const isArray = (arg) => Object.prototype.toString.call(arg) === '[object Array]'
const allPrivileges = [
  "重置用户密码",
  "查看角色",
  "删除角色",
  "添加角色",
  "更新角色",
  "查看权限",
  "查看系统日志",
  "添加检测设备",
  "删除检测设备",
  "更新检测设备",
  "查看检测设备",
  "查看检测数据",
  "查看检测数据详情",
]

const additionalBannedPrivilegeId = (bannedPrivileges) => {
  if (
    bannedPrivileges.includes('查看用户')
    && bannedPrivileges.includes('查看角色')
    && bannedPrivileges.includes('查看检测限值数据')
  ) {
    bannedPrivileges.push('查看设置')
  }
  window.__bannedPrivileges = bannedPrivileges
  return bannedPrivileges
}

const storage = () => localStorage.getItem('rememberMe') === 'true' ? localStorage : sessionStorage
const Storage = {
  storage: storage(),
  get: (key) => {
    const value = storage().getItem(key)
    return value ? JSON.parse(value) : null
  },
}

const getArrDifference = (arr1, arr2) => {
  return arr1.concat(arr2).filter(function(v, i, arr) {
    return arr.indexOf(v) === arr.lastIndexOf(v);
  })
}

const generateBannedPrivileges = (roles) => {
  const privileges = []
  roles.forEach((role) => {
    role.privileges.forEach((privilege) => {
      if (!privileges.includes(privilege.action)) {
        privileges.push(privilege.action)
      }
    })
  })
  return getArrDifference(privileges, allPrivileges)
}

const hideElements = () => {
  const profile = Storage.get('profile')
  const savedNodes = []
  if (profile && profile.roles) {
    const bannedPrivileges = generateBannedPrivileges(profile.roles)
    additionalBannedPrivilegeId(bannedPrivileges).forEach(bannedPrivilege => {
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

const restoreElements = () => {
  const savedNodes = window.__savedNodes__
  if (isArray(savedNodes)) {
    savedNodes.forEach(savedNode => {
      savedNode.parentNode.appendChild(savedNode.node)
    })
  }
}

hideElements()
// 主要是用来监听从登录界面跳转到主界面的
window.addEventListener('popstate', () => {
  if (location.pathname === '/home') { restoreElements() }
  hideElements()
})

const callback = () => {
  setTimeout(hideElements, 10)
}
const observer = new MutationObserver(callback)
const masterNode = document.querySelector(`#root-master`)
if (masterNode) {
  observer.observe(masterNode, {
    childList: true,
    subtree: true,
  })
}

