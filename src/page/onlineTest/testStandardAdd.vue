<template>
  <div id="test-standard-add-model" class="add-form-head">
    <div class="add-header">
      <h2><span v-if="!$route.query.code">新建考试标准</span><span v-if="$route.query.code">编辑考试标准</span></h2>
      <router-link to="/onlineTest/testStandard" class="back"><i class="el-icon-d-arrow-left"></i>返回</router-link>
    </div>
    <div class="add-content">
      <div class="add-form">
        <el-form :rules="rules" ref="form" :model="form" label-width="100px">
          <el-form-item label="实习列表" prop="internship">
            <el-select v-model="form.internship" placeholder="请选择">
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
            <el-button type="primary" @click="onSubmit('form')">
              <span v-if="!$route.query.code">立即创建</span>
              <span v-if="$route.query.code">修改</span>
            </el-button>
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
      this.checkRoot();
      this.getInternList();
      this.getEditInfo();
      this.$store.state.adminleftnavnum="/onlineTest/testStandard";
    },
    data () {
      return {
        root: localStorage.root,
        setting: {
          internshipListOptions: []
        },
        form: {
          passScore: "",
          internship: ""
        },
        rules: {
          passScore: [
            { required: true, message: '请输入及格分数', trigger: 'blur' }
          ],
          internship: [
            { required: true, message: '请选择实习', trigger: 'change' }
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
      //读取编辑信息
      getEditInfo(){
        this.$http.post('api/onlineTest/testStandard/read',{
          code: this.$route.query.code,
        })
          .then((res) => {
            if(this.$route.query.code) {
              this.$message({
                message: '读取考试标准成功',
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
                message: '读取考试标准失败，请检查网络环境！',
                type: 'error',
                duration: 1500,
                showClose: true
              });
            }
          });
      },
      //检查权限
      checkRoot(){
        if(this.root == 10001||this.root == 10002||this.root == 10003){
          this.$router.push('/onlineTest/testStandard');
        }
      },
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    watch: {
      '$route' (to, from) {
        if(to.path === '/onlineTest/testStandardAdd'){
          this.checkRoot();
        }
        this.getEditInfo();
      }
    }
  }
</script>

<style lang="less">

</style>
