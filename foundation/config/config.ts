import { defineConfig } from 'umi'

export default defineConfig({
  define: {
    'process.env.UMI_ENV': process.env.UMI_ENV,
  },
  favicon: '/favicon.ico',
  copy: ['assets'],
  headScripts: [
    { src: '/common.js' },
    { src: '/global.js' },
  ],
  scripts: [{ src: '/permission.js', defer: true }]
})
