<template>
  <div id="teacher-add">
    <div class="add-header">
      <h2>新建教师</h2>
      <router-link to="/internshipProgram/teacherArrangement" class="back"><i class="el-icon-d-arrow-left"></i>返回</router-link>
    </div>
    <div class="add-content">
      <div class="add-form">
        <el-form :rules="rules" ref="form" :model="form" label-width="100px">
          <el-form-item label="教师名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="教工号" prop="code">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
          <el-form-item label="教师类型" prop="teacherType">
            <el-select v-model="form.teacherType">
              <el-option label="校内教师" value="internalTeacher"></el-option>
              <el-option label="校外教师" value="externalTeacher"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="专/兼职" prop="teacherAttribute">
            <el-select v-model="form.teacherAttribute">
              <el-option label="专职" value="fulltime"></el-option>
              <el-option label="兼职" value="parttime"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="负责实习">
            <el-select v-model="form.internshipList" multiple placeholder="请选择">
              <el-option
                v-for="item in setting.internshipListOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="教师简介" prop="content">
            <el-input type="textarea" v-model="form.content" class="add-form-textarea"></el-input>
          </el-form-item>
          <el-form-item>
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
      this.getEditInfo();
      this.getInternList();
    },
    data () {
      return {
        activeIndex: 'index',
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
            { required: true, message: '请输入教师名称', trigger: 'blur' },
            { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入教工号', trigger: 'blur' }
          ],
          teacherType: [
            { required: true, message: '请选择教师类型', trigger: 'change' }
          ],
          teacherAttribute: [
            { required: true, message: '请选择专/兼职', trigger: 'change' }
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
                message: '创建成功',
                type: 'info',
                duration: 1500,
                showClose: true
              });
              this.resetForm('form');
            }, (err) => {
              this.$message({
                message: '新建教师失败，请检查网络环境！',
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
            if(res.data.form.code){
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
            if(res.data.form.code) {
              this.$message({
                message: '读取失败，请检查网络环境！',
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
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
  #teacher-add{
    padding: 10px 20px 10px 20px;
  }
</style>
