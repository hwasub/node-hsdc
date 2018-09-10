import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({ app }) => {
  app.i18n = new VueI18n({
    fallbackLocale: 'ko',
    messages: {
      'ko': require('~/locales/ko.json'),
      'en': require('~/locales/en.json'),
      'ja': require('~/locales/ja.json')
    },
    detectBrowserLanguage: true
  })

  app.router.beforeEach((to, from, next) => {
    app.i18n.locale = to.query.locale || app.i18n.fallbackLocale

    if (from.query.locale && !to.query.locale) {
      if (to.path === from.path) {
        return
      }
      next({
        path: to.path,
        query: {locale: from.query.locale},
        replace: true
      })
    } else {
      next()
    }
  })
}
