<template>
  <v-app>
    <Header/>
    <nuxt />
  </v-app>
</template>

<script>
import Header from '~/components/Header.vue'

export default {
  name: 'informationLayout',
  components: {
    Header
  }
}
</script>
