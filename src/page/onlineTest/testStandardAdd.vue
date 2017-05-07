<template>
  <div id="test-standard-add-model">
    <div class="add-header">
      <h2>新建考试标准</h2>
      <router-link to="/onlineTest/testStandard" class="back"><i class="el-icon-d-arrow-left"></i>返回</router-link>
    </div>
    <div class="add-content">
      <div class="add-form">
        <el-form :rules="rules" ref="form" :model="form" label-width="100px">
          <el-form-item label="实习列表" prop="internshipList">
            <el-select v-model="form.internshipList" placeholder="请选择">
              <el-option
                v-for="item in setting.internshipListOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="及格分数" prop="passScore">
            <el-input v-model="form.passScore" placeholder="请输入0-100"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
            <el-button><router-link to="/onlineTest/testStandard">取消</router-link></el-button>
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
      this.getInternList();
    },
    data () {
      return {
        activeIndex: 'index',
        setting: {
          internshipListOptions: []
        },
        form: {
          passScore: "",
          internshipList: []
        },
        rules: {
          passScore: [
            { required: true, message: '请输入及格分数', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('api/onlineTest/testStandard/add',{
              form: this.form,
            })
              .then((res) => {
                this.$message({
                  message: '创建考试标准成功',
                  type: 'info',
                  duration: 1500,
                  showClose: true
                });
                this.resetForm('form');
              }, (err) => {
                this.$message({
                  message: '创建考试标准失败，请检查网络环境！',
                  type: 'error',
                  duration: 1500,
                  showClose: true
                });
              });
          } else {
            this.$message({
              message: '请完整填写表单',
              type: 'warning',
              duration: 1500,
              showClose: true
            });
            return false;
          }
        });
      },
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
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="less">
  #test-standard-add-model{
    padding: 10px 20px 10px 20px;
  }
</style>
