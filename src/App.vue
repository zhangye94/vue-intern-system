<template>
  <div id="app">
    <div class="container">
      <transition name="fade">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
export default {

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
  height: 100%;
  .add-form-head{
    padding: 10px 20px 10px 20px;
  }
  .app-head {
    background: #363636;
    color: #b2b2b2;
    width: 100%;
    position: fixed;
    z-index: 9;
    top: 0;
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
  .app-contain{
    padding-top: 60px;
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
    height: 100%;
    /*padding-top: 60px;*/
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
