<template>
  <div id="external-teacher-assessment-model">
    <div class="content">
      <div class="content-title">
        <h2>校外教师考核列表</h2>
        <router-link to="/externalTeacherAssessment/assssmentAdd" class="add" v-if="root == 10001"><i class="el-icon-plus"></i></router-link>
        <el-button type="text" @click="dialogVisible = true" v-if="root == 10001"><i class="el-icon-upload2"></i>导入数据</el-button>
        <el-button type="text"><i class="el-icon-document"></i>导出数据</el-button>
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
            <el-button type="text" class="fl"><i class="el-icon-document"></i>导出模板</el-button>
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
          <el-table-column
            type="index"
            label="序号"
            sortable
            min-width="50">
          </el-table-column>
          <el-table-column
            prop="teacherName"
            label="被评教师"
            sortable
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="studentName"
            label="评价人"
            sortable
            min-width="140">
          </el-table-column>
          <el-table-column
            prop="schoolYear"
            label="学年"
            sortable
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="semester"
            label="学期"
            min-width="80">
          </el-table-column>
          <el-table-column
            prop="score"
            label="得分"
            sortable
            min-width="120">
          </el-table-column>
        </el-table>
        <div class="content-table-paging">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
    },
    created: function () {
      this.getTableData();
      this.$store.state.adminleftnavnum="/assessment/externalTeacherAssessment";
    },
    data () {
      return {
        dialogVisible: false,
        fileList: [],
        tableData: [],
        root: localStorage.root,
        page: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        }
      }
    },
    methods: {
      //模态窗方法
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
      //分页
      handleSizeChange(val) {
        this.page.pageSize = val;
        this.page.currentPage = 1;
      },
      handleCurrentChange(val) {
        this.page.currentPage = val;
        this.getTableData();
      },
      //读取表格数据
      getTableData(ev){
        this.$http.post('api/assessment/externalTeacherAssessment/tableData',{
          currentPage: this.page.currentPage,
          pageSize: this.page.pageSize
        })
          .then((res) => {
            this.tableData = res.data.form.externalTeacherAssessmentList;
            this.page.total = res.data.form.total;
          }, (err) => {
            this.$message({
              message: '读取评价列表失败，请检查网络环境！',
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
.content-title{
  .el-button{
    margin-left: 10px;
  }
}

</style>
