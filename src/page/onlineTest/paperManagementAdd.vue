<template>
  <div id="paper-management-add-model">
    <div class="add-header">
      <h2>创建考题</h2>
      <router-link to="/onlineTest/papermanagement" class="back"><i class="el-icon-d-arrow-left"></i>返回</router-link>
    </div>
    <div class="add-content">
      <div class="add-form">
        <el-form :rules="rules" ref="form" :model="form" label-width="100px">
          <el-form-item label="考试题目" prop="problemName">
            <el-input v-model="form.problemName" placeholder="请输入考试题目"></el-input>
          </el-form-item>
          <el-form-item label="题目类型" prop="problemType">
            <el-select v-model="form.problemType" placeholder="请选择">
              <el-option
                v-for="item in setting.problemTypes"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-for="(answerItem, index) in form.answerItems"
            :label="'选项' + setting.options[index]"
            :prop="'answerItems.' + index + '.value'">
            <el-checkbox v-model="answerItem.correct"></el-checkbox>
            <el-input v-model="answerItem.value" class="answer-items"></el-input>
            <el-button @click.prevent="removeAnswerItem(answerItem)" class="answer-delete">删除</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
            <el-button @click="addAnswerItem">新增选项</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
            <el-button><router-link to="/onlineTest/paperManagement">取消</router-link></el-button>
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
      this.resetForm('form');
    },
    data () {
      return {
        setting: {
          problemTypes: ["单选题","多选题"],
          options: ["A","B","C","D","E","F","G","H"]
        },
        form: {
          problemType: "",
          problemName: "",
          answerItems: [{
            value: "",
            correct: false
          }]
        },
        rules: {
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
      removeAnswerItem(item) {
        var index = this.form.answerItems.indexOf(item)
        if (index !== -1) {
          this.form.answerItems.splice(index, 1)
        }
      },
      addAnswerItem() {
        this.form.answerItems.push({
          value: '',
          correct: ''
        });
      },
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    watch: {
      '$route' (to, from) {
        this.resetForm('form');
      }
    }
  }
</script>

<style lang="less">
  #paper-management-add-model {
    padding: 10px 20px 10px 20px;
    .answer-items{
      width: 600px;
    }
    .answer-delete{
      margin-left: 10px;
    }
  }
</style>
