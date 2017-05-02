<template>
  <div id="internship-typing-model">
    <div class="header">
      <el-input
        placeholder="请输入学生名称、学号"
        icon="search"
        v-model="searchContent"
        :on-icon-click="handleIconClick">
      </el-input>
      <el-input
        placeholder="请输入实习名称"
        icon="search"
        v-model="searchContent"
        :on-icon-click="handleIconClick">
      </el-input>
      <el-select v-model="ifIntern" multiple placeholder="请选择">
        <el-option
          v-for="item in setting.ifIntern"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" icon="search">查询</el-button>
    </div>
    <div class="content">
      <div class="content-title">
        <h2>学生名单</h2>
        <router-link to="/internshipProgram/studentAdd" class="add"><i class="el-icon-plus"></i></router-link>
        <el-button type="text" @click="dialogVisible = true"><i class="el-icon-upload2"></i>导入数据</el-button>
        <el-dialog
          title="提示"
          v-model="dialogVisible"
          size="tiny"
          :before-close="handleClose">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
          </el-upload>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <div class="content-table">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          :default-sort = "{prop: 'date', order: 'descending'}"
        >
          <el-table-column label="操作" width="118">
            <template scope="scope">
              <router-link :to="{ path: 'studentAdd', query: { code: scope.row.code }}">
              <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button></router-link>
              <el-button
                size="small"
                type="primary"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="code"
            label="学号"
            sortable
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="studentName"
            label="姓名"
            sortable
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="gender"
            label="性别"
            sortable
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="telephone"
            label="联系电话"
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="grade"
            label="实习年级"
            sortable
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="jobs"
            label="岗位"
            sortable
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="internName"
            label="实习名称"
            min-width="120">
          </el-table-column>
        </el-table>
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
        setting: {
          ifIntern: [{
            value: 'alreadyIntern',
            label: '已有实习'
          }, {
            value: 'noIntern',
            label: '未安排实习'
          }],
        },
        ifIntern: [],
        fileList: [],
        searchContent: '',
        dialogVisible: false,
        tableData: [{
          code: '001',
          studentName: '张三',
          gender: '男',
          grade: '2016级',
          telephone: '133xxxxxxxx',
          jobs: '京东（送快递）',
          internName: '未安排',
        },{
          code: '002',
          studentName: '李四',
          gender: '女',
          grade: '2018级',
          telephone: '133xxxxxxxx',
          jobs: '美团（送外卖）',
          internName: '未安排',
        },{
          code: '003',
          studentName: '老王',
          gender: '男',
          grade: '2012级',
          telephone: '133xxxxxxxx',
          jobs: '世界五百强（沃尔玛搬仓库）',
          internName: '未安排',
        },
        ]
      }
    },
    methods: {
      //模态窗方法
      handleIconClick(ev) {
        console.log(ev);
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      //上传组件方法
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      //表格方法
      handleEdit(index, row) {
      },
      handleDelete(index, row) {
        this.$http.post('api/internshipProgram/delete',{
            code:row.code,
            type: "student"
        })
        .then((res) => {
          this.$message({
            message: '删除学生成功',
            type: 'info',
            duration: 1500,
            showClose: true
          });
        }, (err) => {
          this.$message({
            message: '删除学生失败，请检查网络环境！',
            type: 'error',
            duration: 1500,
            showClose: true
          });
        });
      }
    }
  }
</script>

<style lang="less">

</style>
