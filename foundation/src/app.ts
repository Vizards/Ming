import { history } from 'umi';
import { generatePrivilegesTreeData } from './utils/helpers';
import { privileges } from './utils/permission';

export function useQiankunStateForSlave() {
  return {
    rootHistory: history,
    generatePrivilegesTreeData,
    privileges,
  }
}
