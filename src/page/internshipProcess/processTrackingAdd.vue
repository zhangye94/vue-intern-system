<template>
  <div id="process-tracking-add-model">
    <div class="add-header">
      <h2><span v-if="!$route.query.code">创建实习总结</span><span v-if="$route.query.code">编辑实习总结</span></h2>
      <router-link to="/internshipProcess/processTracking" class="back"><i class="el-icon-d-arrow-left"></i>返回</router-link>
    </div>
    <div class="add-content">
      <div class="add-form">
        <el-form :rules="rules" ref="form" :model="form" label-width="100px">
          <el-form-item label="选择实习" prop="internshipList">
            <el-select v-model="form.internshipList" placeholder="请选择">
              <el-option
                v-for="item in setting.internshipListOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="总结标题" prop="title" required>
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="总结内容" prop="content" required>
            <el-input type="textarea" v-model="form.content" class="add-form-textarea internshipSummary"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
            <el-button><router-link to="/internshipProcess/processTracking">取消</router-link></el-button>
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
      this.getEditInfo();
      this.$store.state.adminleftnavnum="/internshipProcess/processTracking";
    },
    data () {
      return {
        query: {
          code: this.$route.query.code || ''
        },
        setting: {
          internshipListOptions: []
        },
        form: {
          title: "",
          content: "",
          internshipList: ""
        },
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入实习总结', trigger: 'blur' },
            { min: 200, message: '实习总结需要至少200字', trigger: 'blur' }
          ],
          internshipList: [
            { required: true, message: '请选择实习', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('api/internshipProcess/processTracking/add',{
              form: this.form,
              code: this.query.code
            })
              .then((res) => {
                this.$message({
                  message: '创建成功',
                  type: 'info',
                  duration: 1500,
                  showClose: true
                });
                this.resetForm('form');
              }, (err) => {
                this.$message({
                  message: '创建实习总结失败，请检查网络环境！',
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
      getEditInfo(){
        this.$http.post('api/internshipProcess/processTracking/read',{
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
            }else{
              this.resetForm('form');
            }
          }, (err) => {
            if(this.$route.query.code) {
              this.$message({
                message: '读取失败，请检查网络环境！',
                type: 'error',
                duration: 1500,
                showClose: true
              });
            }else{
              this.form = {
                title: "",
                content: "",
                internshipList: ""
              }
            }
          });
      },
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    watch: {
      '$route' (to, from) {
        this.query.code = to.query.code;
        if(to.path === "/internshipProcess/processTrackingAdd"){
          this.getEditInfo();
        }
      }
    }
  }
</script>

<style lang="less">
  #process-tracking-add-model{
    padding: 10px 20px 10px 20px;
    .internshipSummary{
      textarea{
        height: 300px;
      }
    }
  }
</style>
