<template>
  <div id="teacher-view">
    <div class="add-header">
      <h2><span v-if="!$route.query.code">创建教师</span><span v-if="$route.query.code">编辑教师</span></h2>
      <router-link to="/internshipProgram/teacherArrangement" class="back"><i class="el-icon-d-arrow-left"></i>返回</router-link>
    </div>
    <div class="add-content">
      <div class="add-form">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="教师名称：" prop="name">
            {{form.name}}
          </el-form-item>
          <el-form-item label="教工号：" prop="code">
            {{form.code}}
          </el-form-item>
          <el-form-item label="教师类型：" prop="teacherType">
            {{form.teacherType}}
          </el-form-item>
          <el-form-item label="专/兼职：" prop="teacherAttribute">
            {{form.teacherAttribute}}
          </el-form-item>
          <el-form-item label="负责实习：">
            {{form.internshipList}}
          </el-form-item>
          <el-form-item label="教师简介：" prop="content">
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
        }
      }
    },
    methods: {
      //读取编辑信息
      getEditInfo(){
        this.$http.post('api/internshipProgram/read',{
          code: this.$route.query.code,
          type: "teacher"
        })
          .then((res) => {
            if(res.data.form.code){
              this.$message({
                message: '读取教师信息成功',
                type: 'info',
                duration: 1500,
                showClose: true
              });
              this.form = res.data.form;
            }
          }, (err) => {
            if(res.data.form.code) {
              this.$message({
                message: '读取教师信息失败，请检查网络环境！',
                type: 'error',
                duration: 1500,
                showClose: true
              });
            }
          });
      },
    },
    watch: {
      '$route' (to, from) {
        this.getEditInfo();
      }
    }
  }
</script>

<style lang="less">
  #teacher-add{
    padding: 10px 20px 10px 20px;
  }
</style>
