<template>
  <div id="internship-add" class="add-form-head">
    <div class="add-header">
      <h2><span v-if="!$route.query.code">创建实习</span><span v-if="$route.query.code">编辑实习</span></h2>
      <router-link to="/internshipProgram/internshipTyping" class="back"><i class="el-icon-d-arrow-left"></i>返回</router-link>
    </div>
    <div class="add-content">
      <div class="add-form">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="实习名称：" prop="name">
            {{form.name}}
          </el-form-item>
          <el-form-item label="实习代码：" prop="code">
            {{form.code}}
          </el-form-item>
          <el-form-item label="所属组织：" prop="org">
            {{form.org}}
          </el-form-item>
          <el-form-item label="学期：" prop="term">
            {{form.term}}
          </el-form-item>
          <el-form-item label="学年：" prop="schoolYearValue">
            {{form.schoolYearValue}}
          </el-form-item>
          <el-form-item label="实习年级：" prop="gradeValue">
            {{form.gradeValue}}
          </el-form-item>
          <el-form-item label="开始日期：">
            <el-col :span="10">
              <el-form-item prop="date1">
                {{form.date1}}
              </el-form-item>
            </el-col>
            <el-col class="line" :span="4"><div>结束日期：</div></el-col>
            <el-col :span="10">
              <el-form-item prop="date2">
                {{form.date2}}
              </el-form-item>
            </el-col>
          </el-form-item>
          <div class="score-percent-form">
            <h2>校内外教师评分比例分配</h2>
            <el-form-item label="校内教师：">
              <el-col :span="9">
                <el-form-item prop="internTeacherPercent">
                  {{form.internTeacherPercent}}
                </el-form-item>
              </el-col>
              <el-col class="line" :span="4"><div>校外教师：</div></el-col>
              <el-col :span="10">
                <el-form-item prop="externalTeacherPercent">
                  {{form.externalTeacherPercent}}
                </el-form-item>
              </el-col>
            </el-form-item>
          </div>
          <el-form-item label="实习目标：" prop="target">
            {{form.target}}
          </el-form-item>
          <el-form-item label="实习要求：" prop="requirement">
            {{form.requirement}}
          </el-form-item>
          <el-form-item label="实习内容：" prop="content">
            {{form.content}}
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
      this.getEditInfo();
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
        }
      }
    },
    methods: {
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
