import { defineConfig } from 'umi';

export default defineConfig({
  qiankun: {
    master: {
      jsSandbox: false, // 是否启用 js 沙箱，默认为 false
      prefetch: true, // 是否启用 prefetch 特性，默认为 true
      defer: false, // 是否异步渲染，默认为 false
    }
  },
  antd: {
    dark: false,
  }
})
