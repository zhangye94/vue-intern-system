<template>
  <div id="app">
    <div class="app-head">
      <div class="app-head-left">
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
      <div class="app-head-right">
        <el-popover ref="popoverUser" placement="bottom" width="350" trigger="click">
          <div class="popover-contain">
            <h2>超级管理员：</h2>
            <ul>
              <li><div>姓名：</div><div>{{user.name}}</div></li>
              <li><div>学号：</div><div>{{user.code}}</div></li>
              <li><div>专业：</div><div>{{user.major}}</div></li>
              <li><div>班级：</div><div>{{user.class}}</div></li>
              <li><div>手机号：</div><div>{{user.telephone}}</div></li>
              <li><div>实习年级：</div><div>{{user.gradeValue}}</div></li>
              <li><div>实习岗位：</div><div>{{user.position}}</div></li>
            </ul>
          </div>
          <div class="popover-button-group">
            <el-button><router-link :to="{ path: '/internshipProgram/studentAdd', query: { code: user.code }}">修改资料</router-link></el-button>
            <el-button>修改密码</el-button>
            <el-button type="primary">注销</el-button>
          </div>
        </el-popover>
        <div class="fr popover-button">
          <el-button v-popover:popoverUser>{{user.name}}</el-button>
        </div>
      </div>
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
    this.getUserInfo();
  },
  data () {
    return {
      activeIndex: '/index',
      user:{
        name: "",
        code: "",
        major: "",
        class: "",
        gradeValue: "",
        telephone: "",
        position: "",
        content: ""
      }
    }
  },
  methods: {
    //读取用户信息
    getUserInfo(){
      this.$http.post('api/common/user',{})
        .then((res) => {
          this.user = res.data.user;
        }, (err) => {
          this.$message({
            message: '读取用户信息失败，请检查网络环境！',
            type: 'error',
            duration: 1500,
            showClose: true
          });
        });
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
/*公共类*/
.fl{
  float: left;
}
.fr{
  float: right;
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
//用户悬浮窗
.el-popover{
  top: 40px !important;
}
.popover-button{
  margin-right: 40px;
}
.el-popover{
  .popover-contain{
    padding: 10px;
    border-bottom: 1px solid #ccc;
    h2{
      font-size: 18px;
      color: #20a0ff;
    }
    ul{
      margin-top: 10px;
      li{
        div{
          line-height: 24px;
          display: inline-block;
        }
        div:nth-child(1){
          width: 70px;
          text-align: right;
        }
        div:nth-child(2){
          text-align: left;
          margin-left: 10px;
        }
      }
    }
  }
  .popover-button-group{
    margin-top: 10px;
    float: right;
    button{
      margin-left: 5px;
      font-size: 12px;
    }
  }
}


#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .add-form-head{
    padding: 10px 20px 10px 20px;
  }
  .app-head {
    background: #363636;
    color: #b2b2b2;
    width: 100%;
    position: fixed;
    z-index: 9;
    .app-head-left{
      width: 70%;
      float: left;
    }
    .app-head-right{
      width: 30%;
      float: right;
      background-color: #373d41;
      button{
        background-color: rgba(0,0,0,0);
        border: none;
        color: #fff;
        line-height: 40px;
      }
    }
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
//展示页样式
.header{
  padding: 20px;
  background-color: rgb(248,248,248);
  border-bottom: 1px solid #eee;
  .el-input{
    width: 250px;
  }
}
.content{
  padding: 10px 20px 10px 20px;
  .content-title{
    border-bottom: 2px solid rgb(32,160,255);
    overflow: hidden;
    .batchDelete{
      margin-bottom: 5px;
      margin-left: 20px;
      float: right;
    }
    .add{
      margin-left: 10px;
      line-height: 34px;
      color: rgb(32,160,255);
    }
    h2{
      padding-left: 10px;
      display: inline-block;
      font-weight: bold;
      float: left;
      line-height: 34px;
    }
    .el-button--text{
      float: right;
      i{
        padding-right: 10px;
      }
      span{
        display: inline-block;
        font-weight: bold;
      }
    }
  }
  .content-table{
    margin-top: 15px;
    .cell{
      font-size: 12px;
      padding: 0px 10px 0px 10px;
      >.el-button{
        margin-left: 5px;
      }
    }
  }
}
//添加编辑页样式
.add-header{
  padding: 10px 5px 10px 5px;
  border-bottom: 2px solid rgb(32,160,255);
  overflow: hidden;
  h2{
    font-weight: bold;
    float: left;
  }
  .back{
    float: right;
    color: rgb(32,160,255);
    i{
      margin-right: 5px;
    }
  }
}
.add-content{
  padding: 20px;
  .add-form{
    .line{
      div{
        text-align: right;
        padding-right: 12px;
      }
    }
    .add-form-textarea{
      textarea{
        height: 100px;
      }
    }
    .score-percent-form{
      border: 1px solid #ccc;
      border-radius: 5px;
      margin-bottom: 20px;
      h2{
        padding: 20px;
        font-weight: bold;
      }
    }
  }
}
</style>
