<template>
  <div id="internship-add" class="add-form-head">
    <div class="add-header">
      <h2>
        <span v-if="!$route.query.code&&!$route.query.view">创建实习</span>
        <span v-if="$route.query.code&&!$route.query.view">编辑实习</span>
        <span v-if="$route.query.code&&$route.query.view">查看实习</span>
      </h2>
      <router-link to="/internshipProgram/internshipTyping" class="back"><i class="el-icon-d-arrow-left"></i>返回</router-link>
    </div>
    <div class="add-content">
      <div class="add-form">
        <el-form :rules="rules" ref="form" :model="form" label-width="100px">
          <el-form-item :label="!$route.query.view?'实习名称':'实习名称：'" prop="name">
            <span v-if="$route.query.view">{{form.name}}</span>
            <el-input v-model="form.name" v-if="!$route.query.view"></el-input>
          </el-form-item>
          <el-form-item :label="!$route.query.view?'实习代码':'实习代码：'" prop="code">
            <span v-if="$route.query.view">{{form.code}}</span>
            <el-input v-model="form.code" v-if="!$route.query.view"></el-input>
          </el-form-item>
          <el-form-item :label="!$route.query.view?'所属组织':'所属组织：'" prop="org">
            <span v-if="$route.query.view">{{form.org}}</span>
            <el-input v-model="form.org" v-if="!$route.query.view"></el-input>
          </el-form-item>
          <el-form-item :label="!$route.query.view?'学期':'学期：'" prop="term">
            <span v-if="$route.query.view">{{form.term}}</span>
            <el-select v-model="form.term" v-if="!$route.query.view">
              <el-option label="第一学期" value="firstTerm"></el-option>
              <el-option label="第二学期" value="secondTerm"></el-option>
              <el-option label="小学期" value="shortTerm"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="!$route.query.view?'学年':'学年：'" prop="schoolYearValue">
            <span v-if="$route.query.view">{{form.schoolYearValue}}</span>
            <el-select v-model="form.schoolYearValue" placeholder="请选择" v-if="!$route.query.view">
              <el-option
                v-for="item in setting.schoolYear"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
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
          <el-form-item :label="!$route.query.view?'开始日期':'开始日期：'" :required="!$route.query.view">
            <el-col :span="10">
              <el-form-item prop="date1">
                <span v-if="$route.query.view">{{form.date1}}</span>
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;" v-if="!$route.query.view"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="4"><div><span v-if="!$route.query.view">结束日期</span><span v-if="$route.query.view">结束日期：</span></div></el-col>
            <el-col :span="10">
              <el-form-item prop="date2">
                <span v-if="$route.query.view">{{form.date2}}</span>
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%;" v-if="!$route.query.view"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <div class="score-percent-form">
            <h2>校内外教师评分比例分配</h2>
            <el-form-item :label="!$route.query.view?'校内教师':'校内教师：'" :required="!$route.query.view">
              <el-col :span="9">
                <el-form-item prop="internTeacherPercent">
                  <span v-if="$route.query.view">{{form.internTeacherPercent}}</span>
                  <el-input v-model="form.internTeacherPercent" v-if="!$route.query.view"></el-input>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="4"><div><span v-if="!$route.query.view">校外教师</span><span v-if="$route.query.view">校外教师：</span></div></el-col>
              <el-col :span="10">
                <el-form-item prop="externalTeacherPercent">
                  <span v-if="$route.query.view">{{form.externalTeacherPercent}}</span>
                  <el-input v-model="form.externalTeacherPercent" :disabled="true" v-if="!$route.query.view"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
          </div>
          <el-form-item :label="!$route.query.view?'实习目标':'实习目标：'" prop="target">
            <span v-if="$route.query.view">{{form.target}}</span>
            <el-input type="textarea" v-model="form.target" class="add-form-textarea" v-if="!$route.query.view"></el-input>
          </el-form-item>
          <el-form-item :label="!$route.query.view?'实习要求':'实习要求：'" prop="requirement">
            <span v-if="$route.query.view">{{form.requirement}}</span>
            <el-input type="textarea" v-model="form.requirement" class="add-form-textarea" v-if="!$route.query.view"></el-input>
          </el-form-item>
          <el-form-item :label="!$route.query.view?'实习内容':'实习内容：'" prop="content">
            <span v-if="$route.query.view">{{form.content}}</span>
            <el-input type="textarea" v-model="form.content" class="add-form-textarea" v-if="!$route.query.view"></el-input>
          </el-form-item>
          <el-form-item v-if="!$route.query.view">
            <el-button type="primary" @click="onSubmit('form')">
              <span v-if="!$route.query.code">立即创建</span>
              <span v-if="$route.query.code">修改</span>
            </el-button>
            <el-button @click="resetForm('form')">重置</el-button>
            <el-button><router-link to="/internshipProgram/internshipTyping">取消</router-link></el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item";
  export default {
    components: {
      ElFormItem
    },
    created: function () {
      this.checkRoot();
      this.getEditInfo();
      this.getGradeList();
      this.getSchoolYearList();
      this.$store.state.adminleftnavnum="/internshipProgram/internshipTyping";
    },
    data () {
      return {
        root: localStorage.root,
        query: {
          code: this.$route.query.code || ''
        },
        setting: {
          schoolYear: [],
          grade: [],
        },
        form: {
          name: '',
          code: '',
          org: '',
          date1: '',
          date2: '',
          target: '',
          requirement: '',
          content: '',
          term: '',
          schoolYearValue: '',
          gradeValue: '',
          internTeacherPercent: 100,
          externalTeacherPercent: 0,
        },
        rules: {
          name: [
            { required: this.$route.query.view? false : true, message: '请输入实习名称', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          code: [
            { required: this.$route.query.view? false : true, message: '请输入实习代码', trigger: 'blur' }
          ],
          org: [
            { required: this.$route.query.view? false : true, message: '请输入所属组织', trigger: 'blur' },
            { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
          ],
          date1: [
            { type: 'date', required: this.$route.query.view? false : true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: this.$route.query.view? false : true, message: '请选择时间', trigger: 'change' }
          ],
          target: [
            { required: this.$route.query.view? false : true, message: '请输入实习目标', trigger: 'blur' }
          ],
          requirement: [
            { required: this.$route.query.view? false : true, message: '请填写实习要求', trigger: 'blur' }
          ],
          content: [
            { required: this.$route.query.view? false : true, message: '请填写实习内容', trigger: 'blur' }
          ],
          term: [
            { required: this.$route.query.view? false : true, message: '请选择学期', trigger: 'change' }
          ],
          schoolYearValue: [
            { required: this.$route.query.view? false : true, message: '请选择学年', trigger: 'change' }
          ],
          gradeValue: [
            { required: this.$route.query.view? false : true, message: '请选择实习年级', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('api/internshipProgram/add',{
              form: this.form,
              type: "internship",
              code: this.query.code
            })
              .then((res) => {
                this.$message({
                  message: '创建实习成功',
                  type: 'info',
                  duration: 1500,
                  showClose: true
                });
                this.resetForm('form');
              }, (err) => {
                this.$message({
                  message: '新建实习失败，请检查网络环境！',
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
          type: "internship"
        })
          .then((res) => {
            if(this.$route.query.code) {
              this.$message({
                message: '读取实习信息成功',
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
                message: '读取实习信息失败，请检查网络环境！',
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
      //读取学年列表信息
      getSchoolYearList(){
        this.$http.post('api/internshipProgram/schoolYear',{})
          .then((res) => {
            this.setting.schoolYear = res.data.schoolYear;
          }, (err) => {
            this.$message({
              message: '读取学年列表失败，请检查网络环境！',
              type: 'error',
              duration: 1500,
              showClose: true
            });
          });
      },
      //检查权限
      checkRoot(){
        if((this.root == 10001||this.root == 10002||this.root == 10003)&&!this.$route.query.view){
          this.$router.push('/internshipProgram/internshipTyping');
        }
      },
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    watch: {
      'form.internTeacherPercent': function (val, oldVal) {
        this.form.externalTeacherPercent = 100 - this.form.internTeacherPercent;
      },
      '$route' (to, from) {
        if(to.path === '/internshipProgram/internshipAdd'){
          this.checkRoot();
          this.getEditInfo();
        }
      }
    }
  }
</script>

<style lang="less">
</style>
