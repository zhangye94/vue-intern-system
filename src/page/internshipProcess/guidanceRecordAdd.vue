<template>
  <div id="guidance-record-add">
    <div class="add-header">
      <h2>添加指导记录</h2>
      <router-link to="/internshipProcess/guidanceRecord" class="back"><i class="el-icon-d-arrow-left"></i>返回</router-link>
    </div>
    <div class="add-content">
      <div class="add-form">
        <el-form :rules="rules" ref="form" :model="form" label-width="100px">
          <el-form-item label="指导教师" required>
            <el-input v-model="form.teacherName" disabled ></el-input>
          </el-form-item>

          <el-form-item label="指导日期" required>
            <el-col :span="10">
              <el-form-item prop="date">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item label="指导学生" required>
            <el-checkbox :indeterminate="guidingStudentCheckSetting.isIndeterminate" v-model="guidingStudentCheckSetting.checkAll" @change="handleCheckAllStudentChange">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="form.checkedGuidingStudent" @change="handleCheckedStudentChange">
              <el-checkbox v-for="guidingStudent in guidingStudentCheckSetting.guidingStudents" :label="guidingStudent" :key="guidingStudent">{{guidingStudent}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="指导类型" prop="guidingType" required>
            <el-checkbox :indeterminate="guidingTypeCheckSetting.isIndeterminate" v-model="guidingTypeCheckSetting.checkAll" @change="handleCheckAllTypeChange">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="form.checkedGuidingType" @change="handleCheckedTypeChange">
              <el-checkbox v-for="guidingType in guidingTypeCheckSetting.guidingTypes" :label="guidingType" :key="guidingType">{{guidingType}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="指导内容" prop="guideContent" required>
            <el-input type="textarea" v-model="form.guideContent" class="add-form-textarea"></el-input>
          </el-form-item>
          <el-form-item label="指导情况" prop="guideSituation" required>
            <el-input type="textarea" v-model="form.guideSituation" class="add-form-textarea"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
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
    data () {
      return {
        activeIndex: 'index',
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
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          guideContent: [
            { required: true, message: '请填写指导内容', trigger: 'blur' }
          ],
          guideSituation: [
            { required: true, message: '请填写指导情况', trigger: 'blur' }
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
            this.$http.post('api/internshipProcess/add',{
              form: this.form,
              type: "guidanceRecord",
              code: this.query.code
            })
            .then((res) => {
              this.$message({
                message: '创建成功',
                type: 'info',
                duration: 1500,
                showClose: true
              });
              //清空表单，方便继续创建
              form = {
                date: '',
                checkedGuidingType: [],
                checkedGuidingStudent: [],
                guideContent: "",
                guideSituation: ""
              };
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
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    watch: {
      '$route' (to, from) {

      }
    }
  }
</script>

<style lang="less">
  #guidance-record-add{
    padding: 10px 20px 10px 20px;
  }
</style>
