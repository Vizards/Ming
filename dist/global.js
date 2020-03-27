/*
 * 所有的权限数据
 * 使用最简单的中文 id 数据，可扩展为复杂的菜单层级数组
 */
let profile = localStorage.getItem('profile')
profile = profile ? JSON.parse(profile) : null

if (profile && profile.privileges) {
  // TODO：考虑沙箱隔离的情况
  window.__bannedPrivileges = getArrDifference(profile.privileges, allPrivileges)
}
