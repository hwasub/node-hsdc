<template>
  <div class="__nuxt-error-page">
    <div class="error">
      <img src="~/assets/svg/error.svg" width="96" height="96">
      <div class="title">{{ error.message }}</div>
      <p class="description m-t-xl">
        <nuxt-link class="button is-danger" to="/">Front Page</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
function camelize (str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
    return index === 0 ? letter.toLowerCase() : letter.toUpperCase()
  }).replace(/[\s+|-]/g, '')
}

export default {
  layout: 'inform',
  name: 'pushed-error',
  data: function () {
    return {
      error: {
        message: camelize(this.$route.params.code),
        code: 500
      }
    }
  }
}
</script>

<style>
.__nuxt-error-page {
  padding: 1rem;
  background: #F7F8FB;
  color: #47494E;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: sans-serif;
  font-weight: 100 !important;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased; 
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.__nuxt-error-page .error {
  max-width: 450px;
}
.__nuxt-error-page .title {
  font-size: 1.5rem;
  margin-top: 15px;
  color: #47494E;
  margin-bottom: 8px; 
}
.__nuxt-error-page .description {
  color: #7F828B;
  line-height: 21px;
  margin-bottom: 10px;
}
</style>
