<template>
  <div id="release-news-model" class="add-form-head">
    <div class="add-header">
      <h2>
        <span v-if="!$route.query.code&&!$route.query.view">发布公告</span>
        <span v-if="$route.query.code&&!$route.query.view">编辑公告</span>
        <span v-if="$route.query.code&&$route.query.view">查看公告</span>
      </h2>
      <router-link to="/information/newsList" class="back"><i class="el-icon-d-arrow-left"></i>返回</router-link>
    </div>
    <div class="add-content">
      <div class="add-form">
        <el-form :rules="rules" ref="form" :model="form" label-width="100px">
          <el-form-item :label="!$route.query.view?'标题':'标题：'" prop="title" :required="!$route.query.view">
            <span v-if="$route.query.view">{{form.title}}</span>
            <el-input v-model="form.title" v-if="!$route.query.view"></el-input>
          </el-form-item>
          <el-form-item label="提交人：" prop="submitter" v-if="$route.query.view">
            <span v-if="$route.query.view">{{form.submitter}}</span>
          </el-form-item>
          <el-form-item label="提交日期：" prop="date" v-if="$route.query.view">
            <span v-if="$route.query.view">{{form.date}}</span>
          </el-form-item>
          <el-form-item :label="!$route.query.view?'发布类型':'发布类型：'" prop="releaseType" :required="!$route.query.view">
            <el-checkbox :indeterminate="releaseTypeCheckSetting.isIndeterminate" v-model="releaseTypeCheckSetting.checkAll" @change="handleCheckAllTypeChange" :disabled="$route.query.view">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="form.checkedReleaseType" @change="handleCheckedTypeChange">
              <el-checkbox v-for="releaseType in releaseTypeCheckSetting.releaseTypes" :label="releaseType" :key="releaseType" :disabled="$route.query.view">{{releaseType}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <quill-editor ref="myTextEditor" v-model="form.content" :config="editorOption" class="editor" v-if="!$route.query.view">
          </quill-editor>
          <el-form-item label="公告内容：" prop="content" v-if="$route.query.view">
            <div v-html="form.content" class="editor-content">
            </div>
          </el-form-item>

          <el-form-item v-if="!$route.query.view" class="fr">
            <el-button type="primary" @click="onSubmit('form')">
              <span v-if="!$route.query.code">立即创建</span>
              <span v-if="$route.query.code">修改</span>
            </el-button>
            <el-button @click="resetForm('form')">重置</el-button>
            <el-button><router-link to="/information/newsList">取消</router-link></el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import { quillEditor } from 'vue-quill-editor'; // 导入quillEditor组件
  export default {
    components: {
      quillEditor
    },
    created: function () {
      this.checkRoot();
      this.getEditInfo();
      this.$store.state.adminleftnavnum="/information/releaseNews";
    },
    data () {
      return {
        editorOption: [
          { size: [ 'small', false, 'large', 'huge' ]}
        ],
        root: localStorage.root,
        query: {
          code: this.$route.query.code || ''
        },
        //多选框设置
        releaseTypeCheckSetting: {
          checkAll: true,
          isIndeterminate: true,
          releaseTypes:['学生', '校内教师', '校外教师'],
        },
        form: {
          title: '',
          checkedReleaseType: [],
          content: '',
        },
        rules: {
          title: [
            { required: this.$route.query.view? false : true, message: '请填写标题', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleCheckAllTypeChange(event) {
        this.form.checkedReleaseType = event.target.checked ? this.releaseTypeCheckSetting.releaseTypes : [];
        this.releaseTypeCheckSetting.isIndeterminate = false;
      },
      handleCheckedTypeChange(value) {
        let checkedCount = value.length;
        this.releaseTypeCheckSetting.checkAll = checkedCount === this.releaseTypeCheckSetting.releaseTypes.length;
        this.releaseTypeCheckSetting.isIndeterminate = checkedCount > 0 && checkedCount < this.releaseTypeCheckSetting.releaseTypes.length;
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('api/internshipProcess/guidanceRecord/add',{
              form: this.form,
              code: this.$route.query.code,
            })
              .then((res) => {
                this.$message({
                  message: '创建公告成功',
                  type: 'info',
                  duration: 1500,
                  showClose: true
                });
                this.resetForm('form');
              }, (err) => {
                this.$message({
                  message: '创建公告失败，请检查网络环境！',
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
        this.$http.post('api/information/releaseNews/read',{
          code: this.$route.query.code,
        })
          .then((res) => {
            if(this.$route.query.code) {
              this.$message({
                message: '读取公告详情成功',
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
                message: '读取公告详情失败，请检查网络环境！',
                type: 'error',
                duration: 1500,
                showClose: true
              });
            }
          });
      },
      //检查权限
      checkRoot(){
        if(this.root == 10001&&!this.$route.query.view){
          this.$router.push('/information/newsList');
        }
      },
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
        if(this.form.content){
          this.form.content = '';
        }
      }
    },
    watch: {
      '$route' (to, from) {
        if(to.path === '/information/releaseNews'){
          this.checkRoot();
          this.getEditInfo();
        }
      }
    }
  }
</script>

<style lang="less">
  #release-news-model{
    padding: 10px 20px 10px 20px;
    .editor{
      margin-bottom: 25px;
      margin-left: 100px;
      .ql-container{
        min-height: 300px;
      }
    }
    .editor-content{
      h1{
        font-size: 26px;
      }
      h2{
        font-size: 20px;
      }
    }
  }
</style>
