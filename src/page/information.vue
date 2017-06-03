<template>
  <div class="model">
    <div class="menu">
      <el-row class="tac">
        <el-col :span="24">
          <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="selectItems" router>
            <el-menu-item index="/information/newsList"><i class="el-icon-document"></i>公告列表</el-menu-item>
            <el-menu-item index="/information/releaseNews" v-if="root == 10002||root == 10004||root == 10005"><i class="el-icon-menu"></i>发布公告</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div class="outer-content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
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
        activeIndex: '/information/newsList',
        root: localStorage.root
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      getNavType(){
        this.activeIndex=this.$store.state.adminleftnavnum;
      },
      selectItems(index){
        this.$store.state.adminleftnavnum=index;
      }
    },
    watch: {
      // 监测store.state
      '$store.state.adminleftnavnum': 'getNavType'
    }
  }
</script>

<style lang="less">

</style>
