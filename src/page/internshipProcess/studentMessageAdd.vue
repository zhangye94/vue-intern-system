<template>
  <div id="student-message-add-model" class="add-form-head">
    <div class="add-header">
      <h2>创建留言</h2>
      <router-link to="/internshipProcess/studentMessage" class="back"><i class="el-icon-d-arrow-left"></i>返回</router-link>
    </div>
    <div class="add-content">
      <div class="add-form">
        <el-form :rules="rules" ref="form" :model="form" label-width="100px">
          <el-form-item label="选择教师" prop="teacher" required>
            <el-select v-model="form.teacher" placeholder="请选择">
              <el-option
                v-for="item in setting.teacherListOptions"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="留言标题" prop="title" required>
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="留言内容" prop="content" required>
            <el-input type="textarea" v-model="form.content" class="add-form-textarea"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
            <el-button><router-link to="/internshipProcess/studentMessage">取消</router-link></el-button>
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
      this.checkRoot();
      this.getTeacherList();
      this.$store.state.adminleftnavnum="/internshipProcess/studentMessage";
    },
    data () {
      return {
        root: localStorage.root,
        setting: {
          teacherListOptions: ["赵老师", "钱老师", "孙老师", "周老师", "郑老师", "吴老师", "王老师"]
        },
        form: {
          title: "",
          content: "",
          teacher: ""
        },
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入实习总结', trigger: 'blur' },
            { min: 200, message: '实习总结需要至少200字', trigger: 'blur' }
          ],
          teacher: [
            { required: true, message: '请选择教师', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('api/internshipProcess/studentMessage/add',{
              form: this.form
            })
              .then((res) => {
                this.$message({
                  message: '创建留言成功',
                  type: 'info',
                  duration: 1500,
                  showClose: true
                });
                this.resetForm('form');
              }, (err) => {
                this.$message({
                  message: '创建留言失败，请检查网络环境！',
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
      //读取教师列表信息
      getTeacherList(){
        this.$http.post('api/common/teacherList',{})
          .then((res) => {
            this.setting.teacherListOptions = res.data.teacherList;
            console.log(this.setting.teacherListOptions);
          }, (err) => {
            this.$message({
              message: '读取教师列表失败，请检查网络环境！',
              type: 'error',
              duration: 1500,
              showClose: true
            });
          });
      },
      //检查权限
      checkRoot(){
        if(this.root != 10001){
          this.$router.push('/internshipProcess/studentMessage');
        }
      },
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    watch: {
      '$route' (to, from) {
        if(to.path === '/internshipProcess/studentMessageAdd'){
          this.checkRoot();
        }
        this.$refs['form'].resetFields();
      }
    }
  }
</script>

<style lang="less">

</style>
