<template>
  <section class="container">
    <div id="cardsContainer" class="cardsContainer">
      <div id="cardHeader" class="card-header">
        <span class="hero-class-icon"><img :src="`https://hs.static.sena.kr/icon/class/${deck.hero.class}.png`"></span>
        <span class="hero-class-name">{{ deck.hero.name }}</span>
        <span class="game-format">{{ deck.format }}</span>
        <span class="deck-price"><img src="https://hs.static.sena.kr/icon/dust.png" style="width: 13px; height: 18px;"> {{deck.dust | formatThousand}}</span>
      </div>
      <div class="cardEntry" v-for="entry in deck.cards" :key="entry.id">
        <span class="image"><img :src="`https://hs.static.sena.kr/tile-s/${entry.id}.png`"></span>
        <span class="fade"></span>            
        <span class="cost">{{ entry.cost }}</span>
        <span class="name" :class="entry.rarity">{{ entry.name }}</span>
        <span class="count" v-if="entry.count > 1">{{ entry.count }}</span>
        <span class="count" v-if="entry.rarity=='legendary'">★</span>
      </div>
      <div class="level m-b-sm">
        <div class="level-left">
          <div class="level-item">
          </div>
        </div>
        <div class="level-right">
          <nuxt-link class="button level-item" to="/">FrontPage</nuxt-link>
          <nuxt-link class="button level-item" to="?locale=ko">한국어</nuxt-link>
          <nuxt-link class="button level-item" to="?locale=en">English </nuxt-link>
          <nuxt-link class="button level-item" to="?locale=ja">日本語</nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios'
import '~/assets/css/list.scss'

export default {
  name: 'codeparse',
  watchQuery: ['locale'],
  asyncData ({ route, router, params, error }) {
    let temp = route.path.substring(1)
    let locale = route.query.locale || 'ko'

    return axios.get('/api/decode/?locale=' + locale + '&code=' + encodeURIComponent(temp))
      .then((res) => {
        return { deck: res.data }
      })
      .catch((e) => {
        error({ errorName: e.response.data.name, message: e.response.data.message })
      })
  },
  head () {
    return {
      title: `User`
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
.cardsContainer {
    width: 310px;
    font-size: 14px;
    font-family: 'NanumGothic';
}

.cardEntry {
    background-color: rgb(55, 55, 55);
    width: 100%;
    height: 26px;
    margin-bottom: 2px;
    position: relative;
}    

.cost {
    width: 26px;
    height: 26px;
    
    position: absolute;
    left: 0px;

    font-weight: 800;
    font-size: 16px;

    line-height: 26px;
    text-align: center;
    vertical-align: center;

    background-color: #D7BA7D;
    color: #000;
}

.name {
    padding-left: 10px;
    height: 26px;

    overflow: visible;

    line-height: 26px;
    text-align: center;
    vertical-align: center;

    position: absolute;
    left: 26px;
    color: #EFEFEF;
}

.image {
    position: absolute;
    left: 180px;
    height: 26px;
    overflow: hidden;
}

.fade {
    position: absolute;
    width: 130px;
    left: 170px;
    height: 26px;
    background: linear-gradient(
        70deg,
        rgba(55, 55, 55, 1) 0%,
        rgba(55, 55, 55, 1) 35%,
        rgba(55, 55, 55, 0) 55%,
        rgba(55, 55, 55, 0) 100%
    );
}

.count {
    position: absolute;
    width: 26px;
    height: 26px;
    left: 284px;
    font-size: 16px;
    background-color: #1E1E1E;
    color: #D7BA7D;
    line-height: 26px;
    text-align: center;
    vertical-align: center;
    font-weight: 800;
}

.dust {
    text-align: right;
    font-weight: 800;
    height: 26px;
    overflow: hidden;
}

.free {
    color: #FFFFFF;
}

.common {
    color: #FFFFFF;
}

.rare {
    color: #3296FA;
}

.epic {
    color: #9632FA;
}

.legendary {
    color: #FA9632;
}

.card-header {
    height: 55px;
    margin-bottom: 6px;

    background-color: rgb(55, 55, 55);
    position: relative;
}

.hero-class-icon img {
    width: 55px;
    height: 55px;
}

.hero-class-icon {
    width: 55px;
    height: 55px;
    margin-right: 10px;
}

.hero-class-name {
    position: absolute;
    left: 65px;
    font-size: 20px;
    font-size: 1.4vm;
    top: 2px;
    font-weight: 800;
    color: #EFEFEF;
}

.game-format {
    position: absolute;
    left: 65px;
    top: 32px;
    font-weight: 800;
    color: #EFEFEF;
}

.deck-price {
    position: absolute;
    top: 30px;
    right: 4px;
    font-size: 16px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    vertical-align: center;

    font-weight: 800;
    color: #EFEFEF;
}

.buttonContainer {
    width: 350px;
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>
