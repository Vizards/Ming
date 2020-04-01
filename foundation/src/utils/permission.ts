/*
 * 核心逻辑
 * @file [permission.ts] DOM 级权限控制
 */

import { getArrDifference, generatePrivilegesListData } from '@/utils/helpers';

export const privileges = {
  _data: [] as string[], // 当前用户拥有的权限
  _all: () => generatePrivilegesListData(), // 所有权限
  _banned: () => getArrDifference(privileges._data, privileges._all()), // 当前用户没有的权限
  _nodes: [] as any[], // 被 remove 掉的 DOM 暂存在这里
  set: (data: string[]) => (privileges._data = data),
  get: () => privileges._data,
};

/*
 * 获取权限数据并设置
 * 实际项目中建议从服务端获取用户权限，而不是从 localStorage 获取，仅为前端项目演示
 */
const setPrivileges = () => {
  const profileStr = localStorage.getItem('profile');
  const profile = profileStr ? JSON.parse(profileStr) : null;
  if (profile && profile.privileges) {
    privileges.set(profile.privileges);
  }
};

// 根据用户没有的权限和 DOM 上标识的 id， remove 掉对应的 DOM Elements
const hideElements = () => {
  privileges._banned().forEach((bannedPrivilege) => {
    const nodes = document.querySelectorAll(`#${bannedPrivilege}`);
    nodes.forEach((node) => {
      const savedNode = {
        node,
        parentNode: node.parentNode,
      };
      if (!privileges._nodes.includes(savedNode)) {
        privileges._nodes.push(savedNode);
      }
      node.parentNode?.removeChild(node);
    });
  });
};

/*
 * remove 掉的 DOM Elements 暂存，以备在切换用户之后恢复
 * 如果从登陆页面跳转到主界面为 window 级跳转，则不需要此 restore 过程
 */
const restoreElements = () => {
  privileges._nodes.forEach((removedNode) => {
    removedNode.parentNode.appendChild(removedNode.node);
  });
};

// let's run it before react render!
export const run = () => {
  setPrivileges();
  restoreElements();
  const observer = new MutationObserver(hideElements);
  // 监听根 DOM，请保证 masterNode 不会在切换子应用时丢失
  const masterNode = document.querySelector(`#root-master`);
  if (masterNode) {
    observer.observe(masterNode, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['id'],
    });
  }
};
