<template>
  <div id="student-message-reply-model" class="add-form-head">
    <div class="add-header">
      <h2><span v-if="!$route.query.view">回复</span><span v-if="$route.query.view">查看</span>留言</h2>
      <router-link to="/internshipProcess/studentMessage" class="back"><i class="el-icon-d-arrow-left"></i>返回</router-link>
    </div>
    <div class="reply-contain">
      <div v-for="reply in replyList" v-bind:class="{ 'reply-teacher': reply.role === 'teacher', 'reply-student': reply.role === 'student' }">
        <div class="reply-role">{{reply.name}}：</div>
        <div class="reply-content">{{reply.content}}</div>
      </div>
    </div>
    <div class="add-form" v-if="!$route.query.view">
      <el-form :rules="rules" ref="form" :model="form" label-width="90px">
        <el-form-item label="回复内容" prop="content" required>
          <el-input type="textarea" v-model="form.content" class="add-form-textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">回复</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
          <el-button><router-link to="/internshipProcess/studentMessage">取消</router-link></el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
    },
    created: function () {
      this.getReplyContent();
      this.$store.state.adminleftnavnum="/internshipProcess/studentMessage";
    },

    data () {
      return {
        form: {
          content: "",
        },
        query: {
          code: this.$route.query.code || '',
          view: this.$route.query.view || false
        },
        replyList: [],
        rules: {
          content: [
            { required: true, message: '请输入回复内容', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('api/internshipProcess/studentMessage/reply',{
              code: this.$route.query.code,
              form: this.form
            })
              .then((res) => {
                this.$message({
                  message: '回复成功',
                  type: 'info',
                  duration: 1500,
                  showClose: true
                });
                this.resetForm('form');
              }, (err) => {
                this.$message({
                  message: '回复失败，请检查网络环境！',
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
      //获取回复信息
      getReplyContent(){
        this.$http.post('api/internshipProcess/studentMessage/getReplyContent',{
          code: this.$route.query.code
        })
          .then((res) => {
            this.$message({
              message: '读取留言板成功',
              type: 'info',
              duration: 1500,
              showClose: true
            });
            this.replyList = res.data.replyList;
            if(!this.$route.query.view){
              this.$refs['form'].resetFields();
            }
          }, (err) => {
            this.$message({
              message: '读取留言板失败，请检查网络环境！',
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
        if(this.$route.query.view === false) {
          this.$refs['form'].resetFields();
        }
      }
    }
  }
</script>

<style lang="less">
  #student-message-reply-model{
    .reply-contain{
      min-height: 200px;
      padding: 20px;
      .reply-teacher,.reply-student{
        border: 1px solid #00c1de;
        box-shadow: 0 0 5px rgba(0,198,226,.5);
        padding: 10px;
        border-radius: 5px;
        width: 50%;
        margin-top: 10px;
        margin-bottom: 10px;
        line-height: 24px;
        .reply-role{
          color: #20a0ff;
          font-weight: bold;
        }
      }
      .reply-teacher{
        float: left;
        text-align: left;
      }
      .reply-student{
        float: right;
        text-align: right;
      }
    }
    .add-form{
      .add-form-textarea{
        textarea{
          height: 150px;
        }
      }
    }
  }
</style>
