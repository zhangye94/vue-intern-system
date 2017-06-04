<template>
  <div id="teacher-add">
    <div class="add-header">
      <h2>
        <span v-if="!$route.query.code&&!$route.query.view">创建教师信息</span>
        <span v-if="$route.query.code&&!$route.query.view">编辑教师信息</span>
        <span v-if="$route.query.code&&$route.query.view">查看教师信息</span>
      </h2>
      <router-link to="/internshipProgram/teacherArrangement" class="back"><i class="el-icon-d-arrow-left"></i>返回</router-link>
    </div>
    <div class="add-content">
      <div class="add-form">
        <el-form :rules="rules" ref="form" :model="form" label-width="100px">
          <el-form-item :label="!$route.query.view?'教师名称':'教师名称：'" prop="name">
            <span v-if="$route.query.view">{{form.name}}</span>
            <el-input v-model="form.name" v-if="!$route.query.view"></el-input>
          </el-form-item>
          <el-form-item :label="!$route.query.view?'教工号':'教工号：'" prop="code">
            <span v-if="$route.query.view">{{form.code}}</span>
            <el-input v-model="form.code" v-if="!$route.query.view"></el-input>
          </el-form-item>
          <el-form-item :label="!$route.query.view?'教师类型':'教师类型：'" prop="teacherType">
            <span v-if="$route.query.view">{{form.teacherType}}</span>
            <el-select v-model="form.teacherType" v-if="!$route.query.view">
              <el-option label="校内教师" value="internalTeacher"></el-option>
              <el-option label="校外教师" value="externalTeacher"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="!$route.query.view?'专/兼职':'专/兼职：'" prop="teacherAttribute">
            <span v-if="$route.query.view">{{form.teacherAttribute}}</span>
            <el-select v-model="form.teacherAttribute" v-if="!$route.query.view">
              <el-option label="专职" value="fulltime"></el-option>
              <el-option label="兼职" value="parttime"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="!$route.query.view?'负责实习':'负责实习：'">
            <span v-if="$route.query.view">{{form.internshipList}}</span>
            <el-select v-model="form.internshipList" multiple placeholder="请选择" v-if="!$route.query.view">
              <el-option
                v-for="item in setting.internshipListOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="!$route.query.view?'教师简介':'教师简介：'" prop="content">
            <span v-if="$route.query.view">{{form.content}}</span>
            <el-input type="textarea" v-model="form.content" class="add-form-textarea" v-if="!$route.query.view"></el-input>
          </el-form-item>
          <el-form-item v-if="!$route.query.view">
            <el-button type="primary" @click="onSubmit('form')">
              <span v-if="!$route.query.code">立即创建</span>
              <span v-if="$route.query.code">修改</span>
            </el-button>
            <el-button @click="resetForm('form')">重置</el-button>
            <el-button><router-link to="/internshipProgram/teacherArrangement">取消</router-link></el-button>
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
      this.getEditInfo();
      this.getInternList();
      this.$store.state.adminleftnavnum="/internshipProgram/teacherArrangement";
    },
    data () {
      return {
        root: localStorage.root,
        query: {
            code: this.$route.query.code || ''
        },
        setting: {
          internshipListOptions: []
        },
        form: {
          name: '',
          code: '',
          teacherType: '',
          teacherAttribute: '',
          internshipList: [],
          content: ''
        },
        rules: {
          name: [
            { required: this.$route.query.view? false : true, message: '请输入教师名称', trigger: 'blur' },
            { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
          ],
          code: [
            { required: this.$route.query.view? false : true, message: '请输入教工号', trigger: 'blur' }
          ],
          teacherType: [
            { required: this.$route.query.view? false : true, message: '请选择教师类型', trigger: 'change' }
          ],
          teacherAttribute: [
            { required: this.$route.query.view? false : true, message: '请选择专/兼职', trigger: 'change' }
          ],
        }
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('api/internshipProgram/add',{
              form: this.form,
              type: "teacher",
              code: this.query.code
            })
            .then((res) => {
              this.$message({
                message: '创建教师成功',
                type: 'info',
                duration: 1500,
                showClose: true
              });
              this.resetForm('form');
            }, (err) => {
              this.$message({
                message: '创建教师失败，请检查网络环境！',
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
      //读取编辑信息
      getEditInfo(){
        this.$http.post('api/internshipProgram/read',{
          code: this.$route.query.code,
          type: "teacher"
        })
          .then((res) => {
            if(this.$route.query.code){
              this.$message({
                message: '读取教师信息成功',
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
                message: '读取教师信息失败，请检查网络环境！',
                type: 'error',
                duration: 1500,
                showClose: true
              });
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
      //检查权限
      checkRoot(){
        if((this.root == 10001||this.root == 10002||this.root == 10003)&&!this.$route.query.view){
          this.$router.push('/internshipProgram/teacherArrangement');
        }
      },
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    watch: {
      '$route' (to, from) {
        if(to.path === '/internshipProgram/teacherAdd'){
          this.checkRoot();
          this.getEditInfo();
        }
      }
    }
  }
</script>

<style lang="less">
  #teacher-add{
    padding: 10px 20px 10px 20px;
  }
</style>
