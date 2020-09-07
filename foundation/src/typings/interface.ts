import { IRoute } from 'umi';

export interface MingRoute extends IRoute {
  title?: string;
  privilegeId?: string;
  routes?: MingRoute[];
}

export interface TreeData extends MingRoute {
  checkable?: boolean;
  disableCheckbox?: boolean;
  disabled?: boolean;
  key?: string | null;
  selectable?: boolean;
  children?: TreeData[];
}
