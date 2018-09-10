<template>
  <section class="container">
    <div class="level m-b-sm">
      <div class="level-left">
        <div class="level-item">
          <!-- Cards container -->
          <div id="cardsContainer" class="list-cardsContainer">
            <div id="cardHeader" class="list-card-header">
              <span class="list-hero-class-icon"><img id="img-hero-class" :src="`https://hs.static.sena.kr/icon/class/${deck.hero.className}.png`"></span>
              <span class="list-hero-class-name">{{ $t(deck.hero.classID) }}</span>
              <span class="list-game-format">{{ $t(deck.format) }}</span>
              <span class="list-deck-price"><img src="https://hs.static.sena.kr/icon/dust.png"> {{deck.dust | formatThousand}}</span>
            </div>
            <div class="list-cardEntry" v-for="entry in deck.cards" :key="entry.id">
              <span class="list-image"><img :src="`https://hs.static.sena.kr/tile-s/${entry.id}.png`"></span>
              <span class="list-fade"></span>            
              <span class="list-cost">{{ entry.cost }}</span>
              <span class="list-name" :class="entry.rarity">{{ entry.name }}</span>
              <span class="list-count" v-if="entry.count > 1">{{ entry.count }}</span>
              <span class="list-count" v-if="entry.rarity=='legendary'">★</span>
            </div>
          </div>
          <!-- End Cards Container -->
        </div>
      </div>
      <div class="level-item">
        <div class="box m-t-sm list-box">
          <div class="buttons">
            <nuxt-link class="button is-info is-outlined" :to="{path: '/', query: {locale: currentLocale}}">{{$t('Frontpage')}}</nuxt-link>
            <a class="button is-outlined" @click="$router.go(-1)">{{$t('Go Back')}}</a>
          </div>
          <div class="buttons">
            <div class="field has-addons">
              <p class="control">
                <button class="button is-outlined clipboard-button" @click="showCopiedMessage" :data-clipboard-text="deck.code">{{$t('Copy Code')}}</button>
              </p>
              <p class="control">
                <button class="button is-outlined" @click="saveTo" :disabled="isCraftingPNG" :class="{ 'is-loading' : isCraftingPNG }">{{$t('Save to PNG')}}</button>
              </p>
            </div>
          </div>
          <div class="buttons">
            <div class="field has-addons">
              <p class="control">
                <nuxt-link class="button" :to="{query: {locale: 'ko'}}" replace>한국어</nuxt-link>
              </p>
              <p class="control">
                <nuxt-link class="button" :to="{query: {locale: 'en'}}" replace>English</nuxt-link>
              </p>
              <p class="control">
                <nuxt-link class="button" :to="{query: {locale: 'ja'}}" replace>日本語</nuxt-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <no-ssr>
      <ui-snackbar-container ref="snackbarContainer" position="right"></ui-snackbar-container>
    </no-ssr>
  </section>
</template>

<script>
import axios from '~/plugins/axios'
import ClipboardJS from 'clipboard'
import html2canvas from 'html2canvas'
import { saveAs } from 'file-saver/FileSaver'

if (process.client) {
  require('~/assets/js/canvas-toBlob')
}

export default {
  name: 'parse-list',
  watchQuery: ['locale'],
  asyncData ({ route, router, params, error }) {
    let codeFromPath = route.path.substring(1)
    let locale = route.query.locale || 'ko'

    return axios.get('/api/decode/?locale=' + locale + '&code=' + encodeURIComponent(codeFromPath))
      .then((res) => {
        return { deck: res.data }
      })
      .catch((e) => {
        error({ errorName: e.response.data.name, message: e.response.data.message })
      })
  },
  data: function () {
    return {
      isCraftingPNG: false
    }
  },
  mounted () {
    if (process.client) {
      let clipboard = new ClipboardJS('.clipboard-button')
      clipboard.on('success', () => { })
    }
  },
  computed: {
    currentLocale: function () {
      return this.$i18n.locale
    }
  },
  methods: {
    showCopiedMessage () {
      this.$refs.snackbarContainer.createSnackbar({
        message: 'Copied!',
        duration: 2000
      })
    },
    saveTo () {
      this.isCraftingPNG = true
      var self = this
      html2canvas(document.querySelector('#cardsContainer'), {
        allowTaint: false,
        useCORS: true,
        scale: 2
      }).then(function (canvas) {
        canvas.toBlob(function (blob) { saveAs(blob, 'deck-' + (Math.floor(new Date().getTime() / 1000)) + '.png', 'image/png') }, false)
      }).then(function () {
        console.log('dd')
        self.isCraftingPNG = false
      })
    }
  },
  filters: {
    formatThousand (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/listview.scss';
</style>
