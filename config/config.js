import os from 'os'
import slash from 'slash2'
import defaultSettings from './defaultSettings' // https://umijs.org/config/
import webpackPlugin from './plugin.config'

const { pwa, primaryColor } = defaultSettings // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { isProduct, TEST, NODE_ENV } = process.env
const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false,
      ...(!TEST && os.platform() === 'darwin'
        ? {
            dll: {
              include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
              exclude: ['@babel/runtime', 'netlify-lambda'],
            },
            hardSource: false,
          }
        : {}),
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
] // 针对 preview.pro.ant.design 的 GA 统计代码
// preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

if (isProduct === 'site') {
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ])
}

const uglifyJSOptions =
  NODE_ENV === 'production'
    ? {
        uglifyOptions: {
          // remove console.* except console.error
          compress: {
            drop_console: true,
            pure_funcs: ['console.error'],
          },
        },
      }
    : {}
export default {
  // add for transfer to umi
  plugins,
  define: {
    isProduct: isProduct || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  block: {
    defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
  },
  treeShaking: true,
  targets: {
    ie: 11,
  },
  devtool: isProduct ? 'source-map' : false,
  // 路由配置
  routes: [
    {
      path: '/',
      component: '../layouts/BasicLayout',
      Routes: ['src/pages/Authorized'],
      authority: ['admin', 'user'],
      routes: [
        {
          path: '/',
          name: 'welcome',
          icon: 'smile',
          component: './Index',
        },
        {
          path: '/compress',
          name: 'upload',
          icon: 'upload',
          component: './Compress',
        },
        {
          path: '/jsonview',
          name: 'jsonview',
          icon: 'container',
          component: './Jsonview',
        },
        {
          path: '/hooks',
          name: 'hooks',
          icon: 'hook',
          component: './UseHooks',
        },
        {
          path: '/form',
          icon: 'form',
          name: 'form',
          routes: [
            {
              name: 'basic-form',
              icon: 'smile',
              path: '/form/basic-form',
              component: './form/basic-form',
            },
            {
              name: 'step-form',
              icon: 'smile',
              path: '/form/step-form',
              component: './form/step-form',
            },
            {
              name: 'advanced-form',
              icon: 'smile',
              path: '/form/advanced-form',
              component: './form/advanced-form',
            },
          ],
        },
        {
          path: '/list',
          icon: 'table',
          name: 'list',
          routes: [
            {
              path: '/list/search',
              name: 'search-list',
              component: './list/search',
              routes: [
                {
                  path: '/list/search',
                  redirect: '/list/search/articles',
                },
                {
                  name: 'articles',
                  icon: 'smile',
                  path: '/list/search/articles',
                  component: './list/search/articles',
                },
                {
                  name: 'projects',
                  icon: 'smile',
                  path: '/list/search/projects',
                  component: './list/search/projects',
                },
                {
                  name: 'applications',
                  icon: 'smile',
                  path: '/list/search/applications',
                  component: './list/search/applications',
                },
              ],
            },
            {
              name: 'table-list',
              icon: 'smile',
              path: '/list/table-list',
              component: './list/table-list',
            },
            {
              name: 'basic-list',
              icon: 'smile',
              path: '/list/basic-list',
              component: './list/basic-list',
            },
            {
              name: 'card-list',
              icon: 'smile',
              path: '/list/card-list',
              component: './list/card-list',
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd
  // https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  // proxy: {
  //   '/server/api/': {
  //     target: 'https://preview.pro.ant.design/',
  //     changeOrigin: true,
  //     pathRewrite: { '^/server': '' },
  //   },
  // },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, localIdentName, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName
      }

      const match = context.resourcePath.match(/src(.*)/)

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '')
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase())
        return `tax-${arr.join('-')}-${localName}`.replace(/--/g, '-')
      }

      return localName
    },
  },
  manifest: {
    basePath: '/',
  },
  uglifyJSOptions,
  chainWebpack: webpackPlugin,
}
