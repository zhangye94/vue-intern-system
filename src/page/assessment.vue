<template>
  <div id="internship-program-model">
    <div class="internship-program-menu">
      <el-row class="tac">
        <el-col :span="24">
          <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
            <el-menu-item index="/assessment/internalTeacherAssessment"><i class="el-icon-document"></i>校内教师考核</el-menu-item>
            <el-menu-item index="/assessment/externalTeacherAssessment"><i class="el-icon-menu"></i>校外教师考核</el-menu-item>
            <el-menu-item index="/assessment/studentAssessment"><i class="el-icon-edit"></i>学生考核</el-menu-item>
            <el-menu-item index="/assessment/indexSetting"><i class="el-icon-setting"></i>指标设置</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div class="internship-program-content">
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
        activeIndex: 'index',
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style lang="less">
  #internship-program-model{
    width: 84%;
    margin: auto;
    margin-top: 20px;
    overflow: hidden;
    .internship-program-menu{
      width: 160px;
      float: left;
      .el-menu{
        background-color: #fff;
        box-shadow: 0 3px 3px rgba(0,0,0,0.15);
      }
    }
    .internship-program-content{
      background-color: #fff;
      width: e("calc(100% - 180px)");
      min-height: 500px;
      float: right;
      box-shadow: 0 3px 3px rgba(0,0,0,0.15);
    }
  }
</style>
