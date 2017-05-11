<template>
  <div class="login" id="login">
    <a href="javascript:;" class="log-close"><i class="icons close"></i></a>
    <div class="log-bg">
      <div class="log-cloud cloud1"></div>
      <div class="log-cloud cloud2"></div>
      <div class="log-cloud cloud3"></div>
      <div class="log-cloud cloud4"></div>
    </div>
    <div class="log-email">
      <input type="text" placeholder="Email" :class="'log-input' + (account==''?' log-input-empty':'')" v-model="account"><input type="password" placeholder="Password" :class="'log-input' + (password==''?' log-input-empty':'')"  v-model="password">
      <a href="javascript:;" class="log-btn" @click="login">Login</a>
    </div>
    <Loading v-if="isLoging" marginTop="-30%"></Loading>
  </div>
</template>

<script>
  import Loading from '../components/Loading.vue'
  export default {
    name: 'Login',
    data(){
      return {
        isLoging: false,
        account: '',
        password: ''
      }
    },
    components:{
      Loading
    },
    methods:{

      //登录逻辑
      login(){
        if(this.account!='' && this.password!=''){
          this.toLogin();
        }
      },

      //登录请求
      toLogin(){

        //一般要跟后端了解密码的加密规则
        //这里例子用的哈希算法来自./js/sha1.min.js
        let password_sha = hex_sha1(hex_sha1( this.password ));

        //需要想后端发送的登录参数
        let loginParam = {
          account: this.account,
          password_sha
        };

        //设置在登录状态
        this.isLoging = true;

        //请求后端,比如:
        /*this.$http.post( 'example.com/login.php', {
         param: loginParam).then((response) => {
         if(response.data.code == 1){
         let expireDays = 1000 * 60 * 60 * 24 * 15;
         this.setCookie('session', response.data.session, expireDays);
         //登录成功后
         this.$router.push('/user_info');
         }
         }, (response) => {
         //Error
         });
         */
        let expireDays = 1000 * 60 * 60 * 24 * 15;
        this.setCookie('session','blablablablabla...', expireDays);
        this.isLoging = false;
        //登录成功后
        this.$router.push('/');
      }
    }
  }
</script>

<style scoped>

</style>
