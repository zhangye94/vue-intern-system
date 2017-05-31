<template>
  <div id="student-view" class="add-form-head">
    <div class="add-header">
      <h2>学生详情查看</h2>
      <router-link to="/internshipProgram/studentList" class="back"><i class="el-icon-d-arrow-left"></i>返回</router-link>
    </div>
    <div class="add-content">
      <div class="add-form">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="姓名：" prop="name">
            {{form.name}}
          </el-form-item>
          <el-form-item label="学号：" prop="code">
            {{form.code}}
          </el-form-item>
          <el-form-item label="专业：" prop="major">
            {{form.major}}
          </el-form-item>
          <el-form-item label="班级：" prop="class">
            {{form.class}}
          </el-form-item>
          <el-form-item label="实习年级：" prop="gradeValue">
            {{form.gradeValue}}
          </el-form-item>
          <el-form-item label="联系电话：" prop="telephone">
            {{form.telephone}}
          </el-form-item>
          <el-form-item label="实习岗位：" prop="position">
            {{form.position}}
          </el-form-item>
          <el-form-item label="参与实习：">
            {{form.internshipList}}
          </el-form-item>
          <el-form-item label="自我介绍：" prop="content">
            {{form.content}}
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
      this.getEditInfo();
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
        }
      }
    },
    methods: {
      //读取编辑信息
      getEditInfo(){
        this.$http.post('api/internshipProgram/read',{
          code: this.$route.query.code,
          type: "student"
        })
          .then((res) => {
            if(res.data.form.code) {
              this.$message({
                message: '读取学生信息成功',
                type: 'info',
                duration: 1500,
                showClose: true
              });
              this.form = res.data.form;
            }
          }, (err) => {
            if(res.data.form.code) {
              this.$message({
                message: '读取学生信息失败，请检查网络环境！',
                type: 'error',
                duration: 1500,
                showClose: true
              });
            }
          });
      }
    },
    watch: {
      '$route' (to, from) {
        this.getEditInfo();
      }
    }
  }
</script>

<style lang="less">

</style>
