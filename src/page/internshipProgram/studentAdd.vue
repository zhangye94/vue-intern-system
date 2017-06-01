<template>
  <div id="student-add" class="add-form-head">
    <div class="add-header">
      <h2>
        <span v-if="!$route.query.code&&!$route.query.view">创建学生信息</span>
        <span v-if="$route.query.code&&!$route.query.view">编辑学生信息</span>
        <span v-if="$route.query.code&&$route.query.view">查看学生信息</span>
      </h2>
      <router-link to="/internshipProgram/studentList" class="back"><i class="el-icon-d-arrow-left"></i>返回</router-link>
    </div>
    <div class="add-content">
      <div class="add-form">
        <el-form :rules="rules" ref="form" :model="form" label-width="100px">
          <el-form-item :label="!$route.query.view?'姓名':'姓名：'" prop="name">
            <span v-if="$route.query.view">{{form.name}}</span>
            <el-input v-model="form.name" v-if="!$route.query.view"></el-input>
          </el-form-item>
          <el-form-item :label="!$route.query.view?'学号':'学号：'" prop="code">
            <span v-if="$route.query.view">{{form.code}}</span>
            <el-input v-model="form.code" v-if="!$route.query.view"></el-input>
          </el-form-item>
          <el-form-item :label="!$route.query.view?'专业':'专业：'" prop="major">
            <span v-if="$route.query.view">{{form.major}}</span>
            <el-input v-model="form.major" v-if="!$route.query.view"></el-input>
          </el-form-item>
          <el-form-item :label="!$route.query.view?'班级':'班级：'" prop="class">
            <span v-if="$route.query.view">{{form.class}}</span>
            <el-input v-model="form.class" v-if="!$route.query.view"></el-input>
          </el-form-item>
          <el-form-item :label="!$route.query.view?'实习年级':'实习年级：'" prop="gradeValue">
            <span v-if="$route.query.view">{{form.gradeValue}}</span>
            <el-select v-model="form.gradeValue" placeholder="请选择" v-if="!$route.query.view">
              <el-option
                v-for="item in setting.grade "
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="!$route.query.view?'联系电话':'联系电话：'" prop="telephone">
            <span v-if="$route.query.view">{{form.telephone}}</span>
            <el-input v-model="form.telephone" v-if="!$route.query.view"></el-input>
          </el-form-item>
          <el-form-item :label="!$route.query.view?'实习岗位':'实习岗位：'" prop="position">
            <span v-if="$route.query.view">{{form.position}}</span>
            <el-input v-model="form.position" v-if="!$route.query.view"></el-input>
          </el-form-item>
          <el-form-item :label="!$route.query.view?'参与实习':'参与实习：'">
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
          <el-form-item :label="!$route.query.view?'自我介绍':'自我介绍：'" prop="content">
            <span v-if="$route.query.view">{{form.content}}</span>
            <el-input type="textarea" v-model="form.content" class="add-form-textarea" v-if="!$route.query.view"></el-input>
          </el-form-item>
          <el-form-item v-if="!$route.query.view">
            <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
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
      this.getGradeList();
      this.$store.state.adminleftnavnum="/internshipProgram/studentList";
    },
    data () {
      return {
        root: localStorage.root,
        query: {
          code: this.$route.query.code || ''
        },
        setting: {
          internshipListOptions: [],
          grade: [],
        },
        form: {
          name: '',
          code: '',
          major: '',
          class: '',
          gradeValue: '',
          telephone: '',
          position: '',
          internshipList: [],
          content: ''
        },
        rules: {
          name: [
            { required: this.$route.query.view? false : true, message: '请输入姓名', trigger: 'blur' },
            { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
          ],
          code: [
            { required: this.$route.query.view? false : true, message: '请输入学号', trigger: 'blur' }
          ],
          major: [
            { required: this.$route.query.view? false : true, message: '请输入专业', trigger: 'blur' }
          ],
          telephone: [
            { required: this.$route.query.view? false : true, message: '请输入电话号码', trigger: 'blur' },
            { min: 11, max: 11, message: '请输入11位手机号', trigger: 'blur' }
          ],
          class: [
            { required: this.$route.query.view? false : true, message: '请输入班级', trigger: 'blur' }
          ],
          gradeValue: [
            { required: this.$route.query.view? false : true, message: '请选择年级', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.form);
            this.$http.post('api/internshipProgram/add',{
              form: this.form,
              type: "student",
              code: this.query.code
            })
            .then((res) => {
              this.$message({
                message: '创建学生成功',
                type: 'info',
                duration: 1500,
                showClose: true
              });
              this.resetForm('form');
            }, (err) => {
              this.$message({
                message: '新建学生失败，请检查网络环境！',
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
          type: "student"
        })
          .then((res) => {
            if(this.$route.query.code) {
              this.$message({
                message: '读取学生信息成功',
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
                message: '读取学生信息失败，请检查网络环境！',
                type: 'error',
                duration: 1500,
                showClose: true
              });
            }
          });
      },
      //读取实习年级列表信息
      getGradeList(){
        this.$http.post('api/internshipProgram/gradeList',{})
          .then((res) => {
            this.setting.grade = res.data.gradeList;
          }, (err) => {
            this.$message({
              message: '读取实习年级列表失败，请检查网络环境！',
              type: 'error',
              duration: 1500,
              showClose: true
            });
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
        if((this.root == 10001||this.root == 10003)&&!this.$route.query.view){
          this.$router.push('/internshipProgram/studentList');
        }
      },
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    watch: {
      '$route' (to, from) {
        if(to.path === '/internshipProgram/studentAdd'){
          this.checkRoot();
          this.getEditInfo();
        }
      }
    }
  }
</script>

<style lang="less">

</style>
