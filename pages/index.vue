<template>
  <section class="container">
    <form>
      <div class="m-b-sm">
        <textarea id="deckcode" class="textarea" :placeholder="$t('index.placeholder')" rows="12"></textarea>
      </div>
      <div class="level">
        <div class="level-left">
          <div class="level-item">
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
        <div class="level-right">
          <div class="level-item">
          <a id="btnSubmit" class="button is-primary is-outlined" v-on:click="analyzeUserInput">{{$t('index.buttonShowDeck')}}</a>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  watchQuery: ['locale'],
  methods: {
    analyzeUserInput: function () {
      let re = /(AAEC|AAEB){1}([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)/g
      let obj = document.getElementById('deckcode')
      let match, str

      str = obj.value
      if (str < 10) return alert('Too short query')

      try {
        match = str.match(re)
        match = match.reduce(function (a, b) {
          if (a.indexOf(b) < 0) a.push(b)
          return a
        }, [])
      } catch (e) {
        return alert('No deckcode found')
      }

      if (match.length < 1) return alert('No deckcode found')
      if (match.length === 1) {
        // there is only one match
        this.$router.push({path: '/' + match[0] + '?locale=' + this.$i18n.locale})
      } else {
        // there are more than one matches
        this.$router.push({
          path: '/plural',
          query: {
            locale: this.$i18n.locale,
            q: JSON.stringify(match)
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
