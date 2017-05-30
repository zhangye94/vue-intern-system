<template>
  <div id="modified-password" class="add-form-head">
    <div class="add-header">
      <h2>修改密码</h2>
    </div>
    <div class="add-content">
      <div class="add-form">
        <el-form :rules="rules" ref="form" :model="form" label-width="100px">
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input type="password" v-model="form.oldPassword" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="设置新密码" prop="newPassword">
            <el-input type="password" v-model="form.newPassword" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="confirmPassword">
            <el-input type="password" v-model="form.confirmPassword" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">修改</el-button>
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
      this.$store.state.adminleftnavnum="/accountManagement/modifiedPassword";
    },
    data () {
      var confirmPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        root: localStorage.root,
        form: {
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        },
        rules: {
          oldPassword: [
            { required: true, message: '请输入旧密码', trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          ],
          newPassword: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
          ],
          confirmPassword: [
            { required: true, message: '请再次输入新密码', trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
            { validator: confirmPass, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('api/accontManagement/modifiedPassword',{
              oldPassword: this.form.oldPassword,
              newPassword: this.form.newPassword
            })
              .then((res) => {
                this.$message({
                  message: '修改密码成功',
                  type: 'info',
                  duration: 1500,
                  showClose: true
                });
              }, (err) => {
                this.$message({
                  message: '修改密码失败，旧密码不正确或者网络环境不稳定！',
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
      }
    }
  }
</script>

<style lang="less">

</style>
