<template>
  <div class="model">
    <div class="menu">
      <el-row class="tac">
        <el-col :span="24">
          <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="selectItems" router>
            <el-menu-item index="/internshipProcess/guidanceRecord"><i class="el-icon-document"></i>指导记录</el-menu-item>
            <el-menu-item index="/internshipProcess/processTracking"><i class="el-icon-menu"></i>过程跟踪</el-menu-item>
            <el-menu-item index="/internshipProcess/aidedTracking"><i class="el-icon-edit"></i>辅助跟踪</el-menu-item>
            <el-menu-item index="/internshipProcess/studentMessage"><i class="el-icon-setting"></i>学生留言</el-menu-item>
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
        activeIndex: '/internshipProcess/guidanceRecord',
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
