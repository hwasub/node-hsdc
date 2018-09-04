<template>
  <section class="container">
    <form>
      <div class="m-b-sm">
        <textarea id="deckcode" class="textarea" placeholder="덱코드를 입력해주세요." rows="20"></textarea>
      </div>
      <div class="level">
        <div class="level-left">
          <div class="level-item">
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
          <a class="button is-medium is-primary" v-on:click="goprocess">분석</a>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  methods: {
    goprocess: function () {
      let obj = document.getElementById('deckcode')
      this.$router.push({path: '/' + obj.value})
    }
  }
}
</script>

<style scoped>
.title
{
  margin: 30px 0;
}
.users
{
  list-style: none;
  margin: 0;
  padding: 0;
}
.user
{
  margin: 10px 0;
}
</style>
