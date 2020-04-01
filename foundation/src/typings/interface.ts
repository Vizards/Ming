import { IRoute } from 'umi';

export interface MingRoute extends IRoute {
  privilegeId: string | null;
  routes?: MingRoute[];
}

export interface TreeData extends MingRoute {
  checkable?: boolean;
  disableCheckbox?: boolean;
  disabled?: boolean;
  key?: string | null;
  title?: string;
  selectable?: boolean;
  children?: TreeData[];
}
