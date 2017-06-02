<template>
  <div class="app-layout">
    <div class="app-head">
      <div class="app-head-left">
        <img class="app-head-logo" src="../assets/logo.png" alt="logo">
        <el-menu theme="dark" :default-active="activeIndex" class="el-menu-header" mode="horizontal" router>
          <el-menu-item index="/">主页</el-menu-item>
          <el-submenu index="onlineTest">
            <template slot="title">在线考试</template>
            <el-menu-item index="/onlineTest/testCase">考试情况</el-menu-item>
            <el-menu-item index="/onlineTest/paperManagement" v-if="root != 10001">试卷管理</el-menu-item>
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
          <el-submenu index="accountManagement">
            <template slot="title">账户管理</template>
            <el-menu-item index="/accountManagement/modifiedData">修改资料</el-menu-item>
            <el-menu-item index="/accountManagement/modifiedPassword">修改密码</el-menu-item>
          </el-submenu>
          <el-submenu index="information">
            <template slot="title">信息公告</template>
            <el-menu-item index="/information/newsList">公告列表</el-menu-item>
            <el-menu-item index="/information/releaseNews" v-if="root == 10002||root == 10004||root == 10005">发布公告</el-menu-item>
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
            <el-button><router-link :to="{ path: '/accountManagement/modifiedData', query: { code: user.code }}">修改资料</router-link></el-button>
            <el-button><router-link :to="{ path: '/accountManagement/modifiedPassword'}">修改密码</router-link></el-button>
            <el-button type="primary" @click="logout">注销</el-button>
          </div>
        </el-popover>
        <div class="fr popover-button">
          <el-button v-popover:popoverUser>{{user.name}}</el-button>
        </div>
      </div>
    </div>
    <div class="app-contain">
      <router-view></router-view>
    </div>
    <div class="app-foot">
      <p>Copyright © 2017-2020 北京理工大学计算机软件实验室提供技术支持</p>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'app',
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
        },
        isLogin: false,
        userInfo: {
          nick: null,
          ulevel: null,
          uid: null,
          portrait: null
        },
        isLogouting: false,
        showHeadAndFooter: false,
        root: localStorage.root
      }
    },
    mounted(){
      this.getUserInfo();
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
      //请求用户的一些信息
//    getUserInfo(){
//
//      //发送http请求获取，这里写死作演示
//      this.userInfo = {
//        nick: 'Doterlin',
//        ulevel: 20,
//        uid: '10000',
//        portrait: 'images/profile.png'
//      }
//
//      //实例开发中这里会向服务端请求数据
//      //如下(用了vue-resource):
//      /*ts.$http.get(url, {
//       //参数
//       "params":{}
//       }).then((response) => {
//       //Success
//       }, (response) => {
//       //Error
//       });*/
//
//      //提交mutation到Store
//      this.$store.commit('updateUserInfo', this.userInfo);
//    },
      getNavType(){
        this.activeIndex=this.$store.state.adminleftnavnum;
      },
      selectItems(index){
        this.$store.state.adminleftnavnum=index;
      },
      //注销
      logout(){
        //删除cookie并跳到登录页
        this.isLogouting = true;
        this.delCookie('session');
        this.$router.push('/login/');
        this.isLogouting = false;
        localStorage.removeItem("root");
      }
    },
    watch: {
      // 监测store.state
      '$store.state.adminleftnavnum': 'getNavType'
    }
  }
</script>
<style lang="less" scoped>

</style>
