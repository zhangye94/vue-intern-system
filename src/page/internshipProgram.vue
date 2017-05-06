<template>
  <div class="model">
    <div class="menu">
      <el-row class="tac">
        <el-col :span="24">
          <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="selectItems" router>
            <el-menu-item index="/internshipProgram/internshipTyping"><i class="el-icon-document"></i>实习录入</el-menu-item>
            <el-menu-item index="/internshipProgram/teacherArrangement"><i class="el-icon-menu"></i>教师安排</el-menu-item>
            <el-menu-item index="/internshipProgram/studentList"><i class="el-icon-setting"></i>学生名单</el-menu-item>
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
        activeIndex: '/internshipProgram/internshipTyping',
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
.model{
  width: 90%;
  margin: auto;
  margin-top: 20px;
  overflow: hidden;
  .menu{
    width: 160px;
    float: left;
    .el-menu{
      background-color: #fff;
      box-shadow: 0 3px 3px rgba(0,0,0,0.15);
    }
  }
  .outer-content{
    background-color: #fff;
    width: e("calc(100% - 180px)");
    min-height: 500px;
    float: right;
    box-shadow: 0 3px 3px rgba(0,0,0,0.15);
  }
}
</style>
