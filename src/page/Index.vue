<template>
  <div id="index-model">
    <div class="index-content">
      <div class="index-contain">
        <h2 class="index-contain-title">用户信息</h2>
        <div class="index-contain-content">

        </div>
        <router-link :to="{ path: 'processTrackingAdd'}" class="index-contain-link">修改资料</router-link>
      </div>
      <div class="index-contain">
        <h2 class="index-contain-title">实习信息</h2>
        <div class="index-contain-content">

        </div>
        <router-link :to="{ path: 'processTrackingAdd'}" class="index-contain-link">查看详情</router-link>
      </div>
      <div class="index-contain">
        <h2 class="index-contain-title">实习状态</h2>
        <div class="index-contain-content">

        </div>
        <router-link :to="{ path: 'processTrackingAdd'}" class="index-contain-link">填写总结</router-link>
      </div>
      <div class="index-contain">
        <h2 class="index-contain-title">留言信息</h2>
        <div class="index-contain-content">

        </div>
        <router-link :to="{ path: '/internshipProcess/studentMessage'}" class="index-contain-link">回复留言</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
    },
    created: function () {
      activeIndex: '/index'
    },
    data () {
      return {

      }
    },
    methods: {

    }
  }
</script>

<style lang="less">
  #index-model{
    background-color: #fff;
    width: 90%;
    margin: auto;
    margin-top: 20px;
    min-height: 400px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.2);
    border-radius: 4px;
    .index-content{
      padding: 30px;
      .index-contain{
        position: relative;
        background-color: rgb(248,248,248);
        min-height: 100px;
        border-radius: 4px;
        border: 1px solid rgb(235,235,235);
        margin-bottom: 20px;
        .index-contain-title{
          color: #20a0ff;
          padding: 10px;
        }
        .index-contain-link{
          color: #20a0ff;
          position: absolute;
          right: 15px;
          bottom: 15px;
        }
      }
    }
  }
</style>
