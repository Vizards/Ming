import { defineConfig } from 'umi';
import { MingRoute } from "@/typings/interface";

export const generateApps = (subApps: MingRoute[]) =>
  subApps
    .filter(subApp => subApp.microApp)
    .map(subApp => ({ name: subApp.name, entry: subApp.entry }))

export const generateRoutes = (subApps: MingRoute[]) =>
  subApps
    .concat([{ component: '@/pages/404' }])
    .map(subApp => ({
      ...subApp,
      routes: undefined,
      microAppProps: {
        autoSetLoading: true,
        wrapperClassName: 'spinner-wrapper',
      }
    }))

export default defineConfig({
  define: {
    'process.env.UMI_ENV': process.env.UMI_ENV,
  },
  favicon: '/favicon.ico',
  copy: ['assets'],
});
