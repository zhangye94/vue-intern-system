<template>
  <div id="test-case-view-model">
    <div class="add-header">
      <h2>查看考试情况</h2>
      <router-link to="/onlineTest/testCase" class="back"><i class="el-icon-d-arrow-left"></i>返回</router-link>
    </div>
    <div class="add-content">
      <div class="add-form">
        <el-form ref="form" :model="form" label-width="80px" label-position="top" :inline="false">
          <el-form-item :label="'题目名称：'+problemItem.problemLabel" v-for="(problemItem ,index) in form.problemList">
            <h3 class="problem-type">【{{problemItem.problemType}}】</h3>
            <h3 class="problem-type" v-if="problemItem.ifCorrect" v-bind:class="{ 'correct': problemItem.ifCorrect, 'error': !problemItem.ifCorrect }">【回答正确】</h3>
            <h3 class="problem-type" v-if="!problemItem.ifCorrect" v-bind:class="{ 'correct': problemItem.ifCorrect, 'error': !problemItem.ifCorrect }">【回答错误】</h3>
            <el-checkbox-group v-model="problemItem.problemAnswer">
              <el-checkbox disabled v-for="(item ,index) in problemItem.problemItems" :key="item" :value="item.name" :label="setting.options[index]+'、'+item.name"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
    },
    created: function () {
      this.getEditInfo();
      this.$store.state.adminleftnavnum="/onlineTest/testCase";
    },
    data () {
      return {
        setting: {
          options: ["A","B","C","D","E","F","G","H"]
        },
        form: {
          problemList: [{
            problemAnswer: []
          }]
        },
      }
    },
    methods: {
      //读取编辑信息
      getEditInfo(){
        this.$http.post('api/onlineTest/testCase/view',{
          code: this.$route.query.code,
        })
          .then((res) => {
            if(this.$route.query.code) {
              this.$message({
                message: '读取成功',
                type: 'info',
                duration: 1500,
                showClose: true
              });
              this.form.problemList = res.data.form;
              for(let i=0;i<res.data.form.length;i++){
                for(let j=0;j<res.data.form[i].problemItems.length;j++){
                  if(res.data.form[i].problemItems[j].value){
                    this.form.problemList[i].problemAnswer.push(this.setting.options[j] + "、" + res.data.form[i].problemItems[j].name);
                  }
                }
              }
            }
          }, (err) => {
            if(this.$route.query.code) {
              this.$message({
                message: '读取失败，请检查网络环境！',
                type: 'error',
                duration: 1500,
                showClose: true
              });
            }
          });
      }
    }
  }
</script>

<style lang="less">
  #test-case-view-model{
    padding: 10px 20px 10px 20px;
    .add-form{
      min-height: 370px;
      background-color: rgb(250,250,250);
      border-radius: 10px;
      padding: 20px;
      .el-checkbox-group{
        label{
          display: block;
          margin-left: 0;
        }
      }
      .problem-type{
        color: #20a0ff;
        display: inline-block;
      }
      .correct{
        color: rgb(87,215,141);
      }
      .error{
        color: rgb(232,76,61);
      }
    }
  }
</style>
