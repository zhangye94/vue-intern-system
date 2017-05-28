<template>
  <div id="app">
    <div class="container">
      <transition name="fade">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
  @import './less/reset.less';
  @import './less/common.less';
  @import './less/style.less';
</style>
