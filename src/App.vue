<template>
  <div id="app">
    <div class="app-head">
      <img class="app-head-logo" src="./assets/logo.png" alt="logo">
      <el-menu theme="dark" :default-active="activeIndex" class="el-menu-header" mode="horizontal" router>
        <el-menu-item index="/index">主页</el-menu-item>
        <el-submenu index="onlineTest">
          <template slot="title">在线考试</template>
          <el-menu-item index="/onlineTest/testCase">考试情况</el-menu-item>
          <el-menu-item index="/onlineTest/paperManagement">试卷管理</el-menu-item>
          <el-menu-item index="/onlineTest/testStandard">考试标准</el-menu-item>
        </el-submenu>
        <el-submenu index="internshipProgram">
          <template slot="title">实习安排</template>
          <el-menu-item index="/internshipProgram/internshipTyping">实习录入</el-menu-item>
          <el-menu-item index="/internshipProgram/teacherArrangement">教师安排</el-menu-item>
          <!--<el-menu-item index="/internshipProgram/informationAcquisition">信息采集</el-menu-item>-->
          <el-menu-item index="/internshipProgram/studentList">学生名单</el-menu-item>
        </el-submenu>
        <el-submenu index="internshipProcess">
          <template slot="title">实习过程</template>
          <el-menu-item index="/internshipProcess/guidanceRecord">指导记录</el-menu-item>
          <el-menu-item index="/internshipProcess/processTracking">过程跟踪</el-menu-item>
          <el-menu-item index="/internshipProcess/aidedTracking">辅助跟踪</el-menu-item>
          <el-menu-item index="/internshipProcess/studentMessage">学生留言</el-menu-item>
        </el-submenu>
        <el-submenu index="assessment">
          <template slot="title">考核评价</template>
          <el-menu-item index="/assessment/internalTeacherAssessment">校内教师考核</el-menu-item>
          <el-menu-item index="/assessment/externalTeacherAssessment">校外教师考核</el-menu-item>
          <el-menu-item index="/assessment/studentAssessment">学生考核</el-menu-item>
          <el-menu-item index="/assessment/indexSetting">指标设置</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="container">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="app-foot">
      <p>Copyright © 2017-2020 北京理工大学计算机软件实验室提供技术支持</p>
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

  }
}
</script>

<style lang="less">
  /* http://meyerweb.com/eric/tools/css/reset/
     v2.0 | 20110126
     License: none (public domain)
  */

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}
html,body {
  height: 100%;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a {
  color: inherit;
  text-decoration: none;
}
/*默认滚动条样式*/
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  border: 1px #d3d3d3 solid;
  box-shadow: 0px 0px 3px #dfdfdf inset;
  border-radius: 10px;
  background: #eee;
}
::-webkit-scrollbar-thumb {
  border: 1px #808080 solid;
  border-radius: 10px;
  background: #999;
}
::-webkit-scrollbar-thumb:hover {
  background: #7d7d7d;
}
body,html {
  min-width: 1200px;
}
body {
  background: rgb(234,237,241);
  font-family: "Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei UI","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
  font-size: 14px;
  color: #444;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .app-head {
    background: #363636;
    color: #b2b2b2;
    width: 100%;
    position: fixed;
    z-index: 9;
    .el-menu--dark{
      background-color: rgb(55,61,65);
    }
    .app-head-logo{
      float: left;
      width: 80px;
      position: absolute;
      padding: 10px;
      z-index: 9;
    }
    .el-menu-header{
      padding-left: 100px;
    }
  }
  .app-foot {
    text-align: center;
    height: 50px;
    width: 100%;
    line-height: 50px;
    background: #e3e4e8;
    clear: both;
    margin-top: 30px;
    border-top: 1px solid #ddd;
  }
  .container {
    width: 100%;
    padding-top: 60px;
  }
}


</style>
