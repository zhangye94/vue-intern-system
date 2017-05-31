<template>
  <div class="model">
    <div class="menu">
      <el-row class="tac">
        <el-col :span="24">
          <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
            <el-menu-item index="/assessment/internalTeacherAssessment"><i class="el-icon-document"></i>校内教师考核</el-menu-item>
            <el-menu-item index="/assessment/externalTeacherAssessment"><i class="el-icon-menu"></i>校外教师考核</el-menu-item>
            <el-menu-item index="/assessment/studentAssessment"><i class="el-icon-edit"></i>学生考核</el-menu-item>
            <el-menu-item index="/assessment/indexSetting"><i class="el-icon-setting"></i>指标设置</el-menu-item>
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
        activeIndex: '/assessment/internalTeacherAssessment',
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
