import { IRoute } from 'umi';

export interface MingRoute extends IRoute {
  name?: string;
  microApp?: string;
  entry?: string;
  routes?: Omit<MingRoute, 'microApp' | 'entry'>[];
  sidebar?: boolean;
  privilegeId?: string;
}

export interface TreeData extends MingRoute {
  checkable?: boolean;
  disableCheckbox?: boolean;
  disabled?: boolean;
  key?: string | null;
  selectable?: boolean;
  children?: TreeData[];
}
