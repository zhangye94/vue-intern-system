<template>
  <div id="student-add">
    <div class="add-header">
      <h2>新建学生</h2>
      <router-link to="/internshipProgram/studentList" class="back"><i class="el-icon-d-arrow-left"></i>返回</router-link>
    </div>
    <div class="add-content">
      <div class="add-form">
        <el-form :rules="rules" ref="form" :model="form" label-width="100px">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="学号" prop="code">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
          <el-form-item label="专业" prop="major">
            <el-input v-model="form.major"></el-input>
          </el-form-item>
          <el-form-item label="班级" prop="class">
            <el-input v-model="form.class"></el-input>
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
          <el-form-item label="联系电话" prop="telephone">
            <el-input v-model="form.telephone"></el-input>
          </el-form-item>
          <el-form-item label="实习岗位" prop="position">
            <el-input v-model="form.position"></el-input>
          </el-form-item>
          <el-form-item label="参与实习">
            <el-select v-model="form.internshipList" multiple placeholder="请选择">
              <el-option
                v-for="item in setting.internshipListOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="自我介绍" prop="content">
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
    },
    data () {
      return {
        activeIndex: 'index',
        setting: {
          internshipListOptions: [{
            value: '选项1',
            label: '片儿川'
          }, {
            value: '选项2',
            label: '虾爆鳝面'
          }, {
            value: '选项3',
            label: '葱油拌面'
          }, {
            value: '选项4',
            label: '蟹粉小笼包'
          }, {
            value: '选项5',
            label: '鹅肝'
          }],
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
        },
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入学号', trigger: 'blur' }
          ],
          major: [
            { required: true, message: '请输入专业', trigger: 'blur' }
          ],
          telephone: [
            { required: true, message: '请输入电话号码', trigger: 'blur' },
            { type: 'number', min: 11, max: 11, message: '请输入11位手机号', trigger: 'blur' }
          ],
          class: [
            { required: true, message: '请输入班级', trigger: 'blur' }
          ],
          gradeValue: [
            { required: true, message: '请选择年级', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.form);
            this.$http.post('api/internshipProgram/studentAdd',{studentFormData:this.form})
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
                  major: '',
                  class: '',
                  gradeValue: '',
                  telephone: '',
                  position: '',
                  internshipList: [],
                  content: ''
                };
              }, (err) => {
                this.$message({
                  message: '新建学生失败，请检查网络环境！',
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
    }
  }
</script>

<style lang="less">
  #student-add{
    padding: 10px 20px 10px 20px;
  }
</style>
