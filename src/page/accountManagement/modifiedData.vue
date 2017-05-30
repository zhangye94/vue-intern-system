<template>
  <div id="student-add" class="add-form-head">
    <div class="add-header">
      <h2>修改资料</h2>
    </div>
    <div class="add-content">
      <div class="add-form">
        <el-form :rules="rules" ref="form" :model="form" label-width="100px">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="学号" prop="code">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
          <el-form-item label="专业" prop="major">
            <el-input v-model="form.major"></el-input>
          </el-form-item>
          <el-form-item label="班级" prop="class">
            <el-input v-model="form.class"></el-input>
          </el-form-item>
          <el-form-item label="实习年级" prop="gradeValue">
            <el-select v-model="form.gradeValue" placeholder="请选择">
              <el-option
                v-for="item in setting.grade "
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系电话" prop="telephone">
            <el-input v-model="form.telephone"></el-input>
          </el-form-item>
          <el-form-item label="实习岗位" prop="position">
            <el-input v-model="form.position"></el-input>
          </el-form-item>
          <el-form-item label="参与实习">
            <el-select v-model="form.internList" multiple placeholder="请选择">
              <el-option
                v-for="item in setting.internshipListOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="自我介绍" prop="content">
            <el-input type="textarea" v-model="form.content" class="add-form-textarea"></el-input>
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
      this.getInternList();
      this.getGradeList();
      this.getEditInfo();
      this.$store.state.adminleftnavnum="/accountManagement/modifiedData";
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
          internList: ["选项2"],
          content: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入学号', trigger: 'blur' }
          ],
          major: [
            { required: true, message: '请输入专业', trigger: 'blur' }
          ],
          telephone: [
            { required: true, message: '请输入电话号码', trigger: 'blur' },
            { min: 11, max: 11, message: '请输入11位手机号', trigger: 'blur' }
          ],
          class: [
            { required: true, message: '请输入班级', trigger: 'blur' }
          ],
          gradeValue: [
            { required: true, message: '请选择年级', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.form);
            this.$http.post('api/accontManagement/modifiedData',{
              form: this.form,
            })
              .then((res) => {
                this.$message({
                  message: '修改资料成功',
                  type: 'info',
                  duration: 1500,
                  showClose: true
                });
              }, (err) => {
                this.$message({
                  message: '修改资料失败，请检查网络环境！',
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
        this.$http.post('api/common/user',{})
          .then((res) => {
            this.form = res.data.user;
          }, (err) => {
            this.$message({
              message: '读取用户信息失败，请检查网络环境！',
              type: 'error',
              duration: 1500,
              showClose: true
            });
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
    },
    watch: {
      '$route' (to, from) {
        if(to.path === '/internshipProgram/studentAdd'){
          this.checkRoot();
        }
        this.getEditInfo();
      }
    }
  }
</script>

<style lang="less">

</style>
