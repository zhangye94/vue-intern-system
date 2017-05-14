<template>
  <div id="not-found-page">
    <div class="not-found-contain">
      <h1>404 Not Found&nbsp;&nbsp;访问的页面不存在</h1>
      <router-link to="/index">返回主页</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
    },
    created: function () {
    },
    data () {
      return {

      }
    },
    methods: {
    }
  }
</script>

<style lang="less" scoped>
  #app{
    .app-contain{
      height: 100%;
    }
  }
  #not-found-page{
    position: relative;
    height: 100%;
    min-height: 450px;
    .not-found-contain{
      text-align: center;
      width: 620px;
      height: 120px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -60px;
      margin-left: -310px;
      h1{
        text-align: center;
        font-size: 40px;
        line-height: 60px;
      }
      a{
        color: #20a0ff;
        font-size: 20px;
        line-height: 60px;
      }
    }

  }
</style>
