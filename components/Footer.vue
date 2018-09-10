<template>
  <footer class="container is-fullhd m-t-xl">
    <div class="container">
      <div class="level is-mobile footcredit">
        <div class="level-left">
          <p class="p-l-xs level-item"><a href="https://sena.kr" class="has-text-black">sena</a></p>
        </div>
        <div class="level-right">
          <p class="p-r-sm level-item"><a href="https://github.com/hwasub/node-hsdc" target="_blank" class="has-text-black">Fork me on GitHub</a></p>
          <p class="p-r-xs level-item"><a href="/LICENSE.txt" class="has-text-black">{{$t('footer.osl')}}</a></p>
        </div>
      </div>
    </div>
    <div class="container m-t-lg">
      <p class="p-l-sm level-item footcredit">Hearthstone is a trademark or registered trademark of Blizzard Entertainment, Inc., in the U.S. and/or other countries.
This website is not affiliated with Blizzard Entertainment.</p>
    </div>
  </footer>
</template>

<style scoped>
.footcredit {
  font-size: 11px;
  font-family: 'Tahoma';
}
</style>
