<template>
  <section class="container">
    <h1 class="title">
      {{ error.errorName }}
    </h1>
    <h2 class="info">
      {{ error.message }}
    </h2>
    <nuxt-link class="button" to="/">
      Frontpage
    </nuxt-link>
  </section>
</template>
<script>
export default {
  props: ['error']
}
</script>

<style scoped>
.title
{
  margin-top: 15px;
  font-size: 5em;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
}
.button
{
  margin-top: 50px;
}
</style>
