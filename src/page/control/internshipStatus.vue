<template>
  <div id="internship-status-model">
    <div class="header">
      <el-select v-model="form.internshipList" placeholder="请选择" @change="getStatus">
        <el-option
          v-for="item in setting.internshipListOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="content">
      <div class="content-title">
        <h2>实习状态控制</h2>
      </div>
      <div class="content-table">
        <h2 class="step-title" v-if="!form.internshipList">请选择要控制的实习</h2>
        <h2 class="step-title" v-if="form.internshipList">现在进行{{form.internshipList}}的控制</h2>
        <div class="step-contain">
          <el-steps space="20%" :active="step" finish-status="success">
            <el-step title="状态 1：确认信息中" description="确认实习和个人信息"></el-step>
            <el-step title="状态 2：参加考试" description="参加实习考试"></el-step>
            <el-step title="状态 3：参与实习中" description="请用户持续参与实习工作，学生请及时签到"></el-step>
            <el-step title="状态 4：实习评价中" description="填写个人总结和评价"></el-step>
            <el-step title="状态 5：结束实习" description="结束实习"></el-step>
          </el-steps>
        </div>
        <el-button type="primary" @click="nextStepMessageBox" class="next-step-button">
          下一步<i class="el-icon-arrow-right el-icon--right"></i>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import ElForm from "../../../node_modules/element-ui/packages/form/src/form";
  export default {
    components: {
      ElForm
    },
    created: function () {
      this.getInternList();
    },
    data () {
      return {
        activeIndex: 'index',
        form: {
          internshipList: "",
        },
        setting: {
          internshipListOptions: []
        },
        step: 0
      }
    },
    methods: {
      //读取实习列表信息
      getInternList(){
        this.$http.post('api/internshipProgram/internList',{})
          .then((res) => {
            this.setting.internshipListOptions = res.data.internList;
          }, (err) => {
            this.$message({
              message: '读取实习列表失败，请检查网络环境！',
              type: 'error',
              duration: 1500,
              showClose: true
            });
          });
      },
      //读取表格数据
      getStatus(ev){
        this.$http.post('api/control/status/read',{
          internship: this.form.internshipList
        })
          .then((res) => {
            this.step = res.data.internshipControl.step;
          }, (err) => {
            this.$message({
              message: '读取实习状态失败，请检查网络环境！',
              type: 'error',
              duration: 1500,
              showClose: true
            });
          });
      },
      //下一步模态窗
      nextStepMessageBox(){
        if(this.form.internshipList){
          this.$alert('确定控制实习进入下一阶段么？', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              if(`${ action }` == 'confirm'){
                this.nextStep();
              }
            }
          });
        }else{
          this.$message({
            message: '请选择实习后操作',
            type: 'error',
            duration: 1500,
            showClose: true
          });
        }
      },
      //下一步
      nextStep(){
        this.$http.post('api/control/status/next',{
          internship: this.form.internshipList
        })
          .then((res) => {
            this.$message({
              message: '修改实习状态成功！',
              type: 'info',
              duration: 1500,
              showClose: true
            });
          }, (err) => {
            this.$message({
              message: '修改实习状态失败，请检查网络环境！',
              type: 'error',
              duration: 1500,
              showClose: true
            });
          });
      }
    }
  }
</script>

<style lang="less">
  #internship-status-model{
    .step-title{
      text-align: left;
      margin-top: 10px;
      color: #20a0ff;
      padding-left: 10px;
    }
    .step-contain{
      width: 95%;
      margin: auto;
      margin-top: 20px;
      background-color: #f8f8f8;
      border: 1px solid #ebebeb;
      padding: 20px;
      border-radius: 4px;
    }
    .next-step-button{
      float: right;
      margin-top: 20px;
      margin-right: 5px;
    }
  }
</style>
