<template>
  <footer class="container is-fullhd m-t-xl">
    <div class="container">
      <div class="level is-mobile footcredit">
        <div class="level-left">
          <p class="p-l-xs level-item"><a href="https://sena.kr" class="has-text-black"><img src="~/assets/svg/kiss-wink.svg" width="16" height="16">&nbsp;sena</a></p>
        </div>
        <div class="level-right">
          <p class="p-r-xs level-item"><a href="/LICENSE.txt" class="has-text-black">{{$t('footer.osl')}}</a></p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footcredit {
  font-size: 9pt;
  font-family: 'Tahoma';
}
</style>
