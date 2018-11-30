const i18nExtensions = require('vue-i18n-extensions')

module.exports = {
  head: {
    title: 'Hearthstone Deckcode Tools',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Simple tools to decode Hearthstone deckcode' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: {
    color: '#59A0E7',
    height: '4px'
  },
  plugins: [
    {src: '~/plugins/keen-ui', ssr: false},
    {src: '~/plugins/i18n', ssr: true}
  ],
  css: [
    '~/assets/css/main.scss'
  ],
  modules: [
    ['@nuxtjs/google-analytics', {
      id: 'UA-123983580-1'
    }]
  ],
  build: {
    vendor: ['axios', 'vue-i18n', 'clipboard', 'file-saver', 'html2canvas'],
    extractCSS: {
      allChunks: true
    },
    postcss: {
      plugins: {
        'postcss-cssnext': {
          features: {
            customProperties: false
          }
        }
      }
    },
    extend (config, ctx) {
      if (ctx.isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  router: {
    linkExactActiveClass: 'is-link',
    scrollBehavior: function (to, from, savedPosition) {
      let position = { }
      if (savedPosition) {
        position = savedPosition
      } else {
        position = { x: 0, y: 0 }
        if (to.hash) {
          position = { selector: to.hash }
        }
      }

      return position
    },
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'route-pushed-error',
        path: '/error/:code',
        component: resolve(__dirname, 'pages/pushed-error.vue')
      },
      {
        name: 'route-parse-list',
        path: '/:deckcode(AAE[B|C].+)',
        component: resolve(__dirname, 'pages/parse-list.vue')
      })
    }
  },
  render: {
    bundleRenderer: {
      directives: {
        t: i18nExtensions.directive
      }
    }
  },
  serverMiddleware: [
    // API middleware
    '~/api/index.js'
  ]
}
