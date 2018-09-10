<template>
  <section class="container">
    <div class="level m-b-sm">
      <div class="level-left">
        <div class="level-item" >
          <!-- Cards container -->
          <div id="cardsContainer" class="list-cardsContainer">
            <div v-for="deck in decks.results" v-bind:key="deck.code">
              <nuxt-link :to="{path: '/' + deck.code + '?locale=' + currentLocale}">
                <div id="cardHeader" class="list-card-header">
                  <span class="list-hero-class-icon"><img :src="`https://hs.static.sena.kr/icon/class/${deck.hero.className}.png`"></span>
                  <span class="list-hero-class-name">{{ $t(deck.hero.classID) }}</span>
                  <span class="list-game-format">{{ $t(deck.format) }}</span>
                  <span class="list-deck-price"><img src="https://hs.static.sena.kr/icon/dust.png"> {{deck.dust | formatThousand}}</span>
                </div>
              </nuxt-link>
            </div>
          </div>
          <!-- End Cards Container -->
        </div>
      </div>
      <div class="level-item">
        <div class="box m-t-sm list-box">
          <div class="buttons">
            <nuxt-link class="button is-info is-outlined" :to="{path: '/', query: {locale: currentLocale}}">{{$t('Frontpage')}}</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  name: 'plural',
  watchQuery: ['locale'],
  asyncData ({ route, router, params, error }) {
    let locale = route.query.locale || route.$i18n.locale || 'ko' // eslint-disable-line no-unused-vars
    let codes = route.query.q
    if (!codes || codes.length < 5) return error({ message: 'Unexpected querystring' })

    return axios.get('/api/plural/?q=' + encodeURIComponent(codes))
      .then((res) => {
        return { decks: res.data }
      })
      .catch((e) => {
        error({ errorName: e.response.data.name, message: e.response.data.message })
      })
  },
  filters: {
    formatThousand (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  computed: {
    currentLocale: function () {
      return this.$i18n.locale
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/listview.scss';
</style>
