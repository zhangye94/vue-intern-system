<template>
  <div id="guidance-record-add-model" class="add-form-head">
    <div class="add-header">
      <h2>
        <span v-if="!$route.query.code&&!$route.query.view">创建指导记录</span>
        <span v-if="$route.query.code&&!$route.query.view">编辑指导记录</span>
        <span v-if="$route.query.code&&$route.query.view">查看指导记录</span>
      </h2>
      <router-link to="/internshipProcess/guidanceRecord" class="back"><i class="el-icon-d-arrow-left"></i>返回</router-link>
    </div>
    <div class="add-content">
      <div class="add-form">
        <el-form :rules="rules" ref="form" :model="form" label-width="100px">
          <el-form-item :label="!$route.query.view?'指导教师':'指导教师：'" :required="!$route.query.view">
            <span v-if="$route.query.view">{{form.teacherName}}</span>
            <el-input v-model="form.teacherName" disabled v-if="!$route.query.view"></el-input>
          </el-form-item>

          <el-form-item :label="!$route.query.view?'指导日期':'指导日期：'" :required="!$route.query.view">
            <el-col :span="10">
              <el-form-item prop="date">
                <span v-if="$route.query.view">{{form.date}}</span>
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;" v-if="!$route.query.view"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item :label="!$route.query.view?'指导学生':'指导学生：'" :required="!$route.query.view">
            <el-checkbox :indeterminate="guidingStudentCheckSetting.isIndeterminate" v-model="guidingStudentCheckSetting.checkAll" @change="handleCheckAllStudentChange" :disabled="$route.query.view">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="form.checkedGuidingStudent" @change="handleCheckedStudentChange">
              <el-checkbox v-for="guidingStudent in guidingStudentCheckSetting.guidingStudents" :label="guidingStudent" :key="guidingStudent" :disabled="$route.query.view">{{guidingStudent}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item :label="!$route.query.view?'指导类型':'指导类型：'" prop="guidingType" :required="!$route.query.view">
            <el-checkbox :indeterminate="guidingTypeCheckSetting.isIndeterminate" v-model="guidingTypeCheckSetting.checkAll" @change="handleCheckAllTypeChange" :disabled="$route.query.view">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="form.checkedGuidingType" @change="handleCheckedTypeChange">
              <el-checkbox v-for="guidingType in guidingTypeCheckSetting.guidingTypes" :label="guidingType" :key="guidingType" :disabled="$route.query.view">{{guidingType}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item :label="!$route.query.view?'指导内容':'指导内容：'" prop="guideContent" :required="!$route.query.view">
            <span v-if="$route.query.view">{{form.guideContent}}</span>
            <el-input type="textarea" v-model="form.guideContent" class="add-form-textarea" v-if="!$route.query.view"></el-input>
          </el-form-item>
          <el-form-item :label="!$route.query.view?'指导情况':'指导情况：'" prop="guideSituation" :required="!$route.query.view">
            <span v-if="$route.query.view">{{form.guideSituation}}</span>
            <el-input type="textarea" v-model="form.guideSituation" class="add-form-textarea" v-if="!$route.query.view"></el-input>
          </el-form-item>

          <el-form-item v-if="!$route.query.view">
            <el-button type="primary" @click="onSubmit('form')">
              <span v-if="!$route.query.code">立即创建</span>
              <span v-if="$route.query.code">修改</span>
            </el-button>
            <el-button @click="resetForm('form')">重置</el-button>
            <el-button><router-link to="/internshipProcess/guidanceRecord">取消</router-link></el-button>
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
      this.getUserInfo();
      this.getEditInfo();
      this.$store.state.adminleftnavnum="/internshipProcess/guidanceRecord";
    },
    data () {
      return {
        root: localStorage.root,
        query: {
          code: this.$route.query.code || ''
        },
        //多选框设置
        guidingTypeCheckSetting: {
          checkAll: true,
          isIndeterminate: true,
          guidingTypes:['现场指导', '电话指导', 'QQ指导', '微信指导', '邮件指导', '平台留言板', '手机app', '其他'],
        },
        guidingStudentCheckSetting: {
          checkAll: true,
          isIndeterminate: true,
          guidingStudents:['赵同学', '钱同学', '孙同学', '李同学', '周同学', '吴同学', '郑同学', '王同学'],
        },
        form: {
          teacherName: '',
          date: '',
          checkedGuidingType: [],
          checkedGuidingStudent: [],
          guideContent: "",
          guideSituation: ""
        },
        rules: {
          date: [
            { type: 'date', required: this.$route.query.view? false : true, message: '请选择日期', trigger: 'change' }
          ],
          guideContent: [
            { required: this.$route.query.view? false : true, message: '请填写指导内容', trigger: 'blur' }
          ],
          guideSituation: [
            { required: this.$route.query.view? false : true, message: '请填写指导情况', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      //多选框事件
      handleCheckAllStudentChange(event) {
        this.form.checkedGuidingStudent = event.target.checked ? this.guidingStudentCheckSetting.guidingStudents : [];
        this.guidingStudentCheckSetting.isIndeterminate = false;
      },
      handleCheckedStudentChange(value) {
        let checkedCount = value.length;
        this.guidingStudentCheckSetting.checkAll = checkedCount === this.guidingStudentCheckSetting.guidingStudents.length;
        this.guidingStudentCheckSetting.isIndeterminate = checkedCount > 0 && checkedCount < this.guidingStudentCheckSetting.guidingStudents.length;
      },
      handleCheckAllTypeChange(event) {
        this.form.checkedGuidingType = event.target.checked ? this.guidingTypeCheckSetting.guidingTypes : [];
        this.guidingTypeCheckSetting.isIndeterminate = false;
      },
      handleCheckedTypeChange(value) {
        let checkedCount = value.length;
        this.guidingTypeCheckSetting.checkAll = checkedCount === this.guidingTypeCheckSetting.guidingTypes.length;
        this.guidingTypeCheckSetting.isIndeterminate = checkedCount > 0 && checkedCount < this.guidingTypeCheckSetting.guidingTypes.length;
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('api/internshipProcess/guidanceRecord/add',{
              form: this.form,
              code: this.query.code
            })
            .then((res) => {
              this.$message({
                message: '创建指导记录成功',
                type: 'info',
                duration: 1500,
                showClose: true
              });
              this.resetForm('form');
            }, (err) => {
              this.$message({
                message: '添加指导记录失败，请检查网络环境！',
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
      //读取用户信息
      getUserInfo(){
        this.$http.post('api/common/user',{})
          .then((res) => {
            this.form.teacherName = res.data.user.name;
          }, (err) => {
            this.$message({
              message: '读取用户信息失败，请检查网络环境！',
              type: 'error',
              duration: 1500,
              showClose: true
            });
          });
      },
      //读取编辑信息
      getEditInfo(){
        this.$http.post('api/internshipProcess/guidanceRecord/read',{
          code: this.$route.query.code,
        })
          .then((res) => {
            if(this.$route.query.code) {
              this.$message({
                message: '读取指导记录成功',
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
                message: '读取指导记录失败，请检查网络环境！',
                type: 'error',
                duration: 1500,
                showClose: true
              });
            }
          });
      },
      //检查权限
      checkRoot(){
        if((this.root == 10001||this.root == 10005)&&!this.$route.query.view){
          this.$router.push('/internshipProcess/guidanceRecord');
        }
      },
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    watch: {
      '$route' (to, from) {
        if(to.path === '/internshipProcess/guidanceRecordAdd'){
          this.checkRoot();
          this.getEditInfo();
        }
      }
    }
  }
</script>

<style lang="less">
  #guidance-record-add-model{
    padding: 10px 20px 10px 20px;
  }
</style>
