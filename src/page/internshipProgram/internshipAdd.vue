<template>
  <div id="internship-add">
    <div class="add-header">
      <h2>新建实习</h2>
      <router-link to="/internshipProgram/internshipTyping" class="back"><i class="el-icon-d-arrow-left"></i>返回</router-link>
    </div>
    <div class="add-content">
      <div class="add-form">
        <el-form :rules="rules" ref="form" :model="form" label-width="100px">
          <el-form-item label="实习名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="实习代码" prop="code">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
          <el-form-item label="所属组织" prop="org">
            <el-input v-model="form.org"></el-input>
          </el-form-item>
          <el-form-item label="学期" prop="term">
            <el-select v-model="form.term">
              <el-option label="第一学期" value="firstTerm"></el-option>
              <el-option label="第二学期" value="secondTerm"></el-option>
              <el-option label="小学期" value="shortTerm"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学年" prop="schoolYearValue">
            <el-select v-model="form.schoolYearValue" placeholder="请选择">
              <el-option
                v-for="item in setting.schoolYear"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
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
          <el-form-item label="开始日期" required>
            <el-col :span="10">
              <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="4"><div>结束日期</div></el-col>
            <el-col :span="10">
              <el-form-item prop="date2">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <div class="score-percent-form">
            <h2>校内外教师评分比例分配</h2>
            <el-form-item label="校内教师" required>
              <el-col :span="9">
                <el-form-item prop="internTeacherPercent">
                  <el-input v-model="form.internTeacherPercent"></el-input>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="4"><div>校外教师</div></el-col>
              <el-col :span="10">
                <el-form-item prop="externalTeacherPercent">
                  <el-input v-model="form.externalTeacherPercent" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
          </div>
          <el-form-item label="实习目标" prop="target">
            <el-input type="textarea" v-model="form.target" class="add-form-textarea"></el-input>
          </el-form-item>
          <el-form-item label="实习要求" prop="requirement">
            <el-input type="textarea" v-model="form.requirement" class="add-form-textarea"></el-input>
          </el-form-item>
          <el-form-item label="实习内容" prop="content">
            <el-input type="textarea" v-model="form.content" class="add-form-textarea"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
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
    },
    data () {
      return {
        activeIndex: 'index',
        setting: {
          schoolYear: [{
            value: '2017-2018',
            label: '2017-2018'
          }, {
            value: '2016-2017',
            label: '2016-2017'
          }, {
            value: '2015-2016',
            label: '2015-2016'
          }, {
            value: '2014-2015',
            label: '2014-2015'
          }, {
            value: '2013-2014',
            label: '2013-2014'
          }],
          grade: [{
            value: '2018',
            label: '2018'
          }, {
            value: '2017',
            label: '2017'
          }, {
            value: '2016',
            label: '2016'
          }, {
            value: '2015',
            label: '2015'
          }, {
            value: '2014',
            label: '2014'
          }],
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
            { required: true, message: '请输入实习名称', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入实习代码', trigger: 'blur' }
          ],
          org: [
            { required: true, message: '请输入所属组织', trigger: 'blur' },
            { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          target: [
            { required: true, message: '请输入实习目标', trigger: 'blur' }
          ],
          requirement: [
            { required: true, message: '请填写实习要求', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请填写实习内容', trigger: 'blur' }
          ],
          term: [
            { required: true, message: '请选择学期', trigger: 'change' }
          ],
          schoolYearValue: [
            { required: true, message: '请选择学年', trigger: 'change' }
          ],
          gradeValue: [
            { required: true, message: '请选择实习年级', trigger: 'change' }
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
              type: "internship"
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
              externalTeacherPercent: 0
            };
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
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    watch: {
      'form.internTeacherPercent': function (val, oldVal) {
        this.form.externalTeacherPercent = 100 - this.form.internTeacherPercent;
      },
    }
  }
</script>

<style lang="less">
#internship-add{
  padding: 10px 20px 10px 20px;
}
.add-header{
  padding: 10px 5px 10px 5px;
  border-bottom: 2px solid rgb(32,160,255);
  overflow: hidden;
  h2{
    font-weight: bold;
    float: left;
  }
  .back{
    float: right;
    color: rgb(32,160,255);
    i{
      margin-right: 5px;
    }
  }
}
.add-content{
  padding: 20px;
  .add-form{
    .line{
      div{
        text-align: right;
        padding-right: 12px;
      }
    }
    .add-form-textarea{
      textarea{
        height: 100px;
      }
    }
    .score-percent-form{
      border: 1px solid #ccc;
      border-radius: 5px;
      margin-bottom: 20px;
      h2{
        padding: 20px;
        font-weight: bold;
      }
    }
  }
}
</style>
