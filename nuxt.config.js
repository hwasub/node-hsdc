module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Hearthstone Deckcodes',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Simple tools to decode Hearthstone deckcode' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#3B8070' },
  plugins: [

  ],
  css: [
    '~/assets/css/main.scss'
  ],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios'],
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
      if (ctx.isDev && ctx.isClient) {
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
    scrollBehavior: function (to, from, savedPosition) {
      // if the returned position is falsy or an empty object,
      // will retain current scroll position.
      let position = false
    
      // if no children detected
      if (to.matched.length < 2) {
        // scroll to the top of the page
        position = { x: 0, y: 0 }
      } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
        // if one of the children has scrollToTop option set to true
        position = { x: 0, y: 0 }
      }
    
      // savedPosition is only available for popstate navigations (back button)
      if (savedPosition) {
        position = savedPosition
      }
    
      return new Promise(resolve => {
        // wait for the out transition to complete (if necessary)
        window.$nuxt.$once('triggerScroll', () => {
          // coords will be used if no selector is provided,
          // or if the selector didn't match any element.
          if (to.hash && document.querySelector(to.hash)) {
            // scroll to anchor by returning the selector
            position = { selector: to.hash }
          }
          resolve(position)
        })
      })
    },
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'codeview',
        path: '/:deckcode+',
        component: resolve(__dirname, 'pages/codeparse.vue')
      })
    }
  },
  serverMiddleware: [
    // API middleware
    '~/api/index.js'
  ]
}
