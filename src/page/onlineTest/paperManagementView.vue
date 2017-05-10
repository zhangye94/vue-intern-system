<template>
  <div id="paper-management-view-model" class="add-form-head">
    <div class="add-header">
      <h2>查看考题</h2>
      <router-link to="/onlineTest/papermanagement" class="back"><i class="el-icon-d-arrow-left"></i>返回</router-link>
    </div>
    <div class="add-content">
      <div class="add-form">
        <el-form ref="form" :model="form" label-width="80px" label-position="top" :inline="false">
          <el-form-item :label="'题目名称：'+form.problemLabel">
            <h3 class="problem-type">【{{form.problemType}}】</h3>
            <el-checkbox-group v-model="problemAnswer">
              <el-checkbox disabled v-for="(item ,index) in form.problemItems" :key="item" :value="item.name" :label="setting.options[index]+'、'+item.name"></el-checkbox>
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
      this.$store.state.adminleftnavnum="/onlineTest/paperManagement";
    },
    data () {
      return {
        setting: {
          options: ["A","B","C","D","E","F","G","H"]
        },
        form: {
          problemItems: [],
          problemLabel: "",
          problemType: "",
        },
        problemAnswer: []
      }
    },
    methods: {
      //读取编辑信息
      getEditInfo(){
        this.$http.post('api/onlineTest/paperManagement/view',{
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
              this.form = res.data.form;
              for(let i=0;i<res.data.form.problemItems.length;i++){
                if(res.data.form.problemItems[i].value){
                  this.problemAnswer.push(this.setting.options[i] + "、" + res.data.form.problemItems[i].name);
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
      },
    }
  }
</script>

<style lang="less">
  #paper-management-view-model{
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
      }
    }
  }
</style>
