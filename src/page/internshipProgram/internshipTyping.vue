<template>
  <div id="internship-typing-model">
    <div class="header">
      <el-input
        placeholder="请输入实习名称、实习代码"
        icon="search"
        v-model="searchContent"
        :on-icon-click="getTableData">
      </el-input>
    </div>
    <div class="content">
      <div class="content-title">
        <h2>实习列表</h2>
        <router-link to="/internshipProgram/internshipAdd" class="add" v-if="root == 10004||root == 10005"><i class="el-icon-plus"></i></router-link>
        <el-button type="primary" class="batchDelete" @click="handleDelete" v-if="root == 10004||root == 10005">删除</el-button>
        <el-button type="text" @click="dialogVisible = true" v-if="root == 10004||root == 10005"><i class="el-icon-upload2"></i>导入数据</el-button>
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
          @selection-change="handleSelectionChange"
          :default-sort = "{prop: 'date', order: 'descending'}"
        >
          <el-table-column type="selection" width="40" v-if="root == 10004||root == 10005">
          </el-table-column>
          <el-table-column label="操作" width="70" fixed="right" v-if="root == 10004||root == 10005">
            <template scope="scope">
              <router-link :to="{ path: 'internshipAdd', query: { code: scope.row.code ,view: false}}">
              <el-button
                size="small">编辑</el-button></router-link>
            </template>
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            sortable
            min-width="50">
          </el-table-column>
          <el-table-column
            prop="code"
            label="实习代码"
            sortable
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="internName"
            label="实习名称"
            sortable
            min-width="140">
            <template scope="scope">
              <router-link :to="{ path: 'internshipAdd', query: { code: scope.row.code ,view: true}}">
                <span class="content-table-link">{{scope.row.internName}}</span>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="orgName"
            label="所属组织"
            sortable
            min-width="170">
          </el-table-column>
          <el-table-column
            prop="grade"
            label="实习年级"
            sortable
            min-width="120">
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
            prop="startDate"
            label="开始日期"
            sortable
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="endDate"
            label="结束日期"
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
      this.$store.state.adminleftnavnum="/internshipProgram/internshipTyping";
    },
    data () {
      return {
        searchContent: '',
        dialogVisible: false,
        fileList: [],
        tableData: [],
        multipleSelection: [],
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
      //多选表格方法
      handleSelectionChange(val) {
        this.multipleSelection = val;
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
      //删除
      handleDelete() {
        let IdGroup = [];
        for(let i=0;i<this.multipleSelection.length;i++){
          IdGroup.push(this.multipleSelection[i].code);
        }
        this.$http.post('api/internshipProgram/delete',{
            code: IdGroup,
            type: "internship"
        })
          .then((res) => {
            this.$message({
              message: '删除实习成功',
              type: 'info',
              duration: 1500,
              showClose: true
            });
          }, (err) => {
            this.$message({
              message: '删除实习失败，请检查网络环境！',
              type: 'error',
              duration: 1500,
              showClose: true
            });
          });
      },
      //读取表格数据
      getTableData(ev){
        this.$http.post('api/internshipProgram/tableData',{
          type: "internship",
          searchContent: this.searchContent,
          currentPage: this.page.currentPage,
          pageSize: this.page.pageSize
        })
          .then((res) => {
            this.tableData = res.data.form.internList;
            this.page.total = res.data.form.total;
          }, (err) => {
            this.$message({
              message: '读取实习列表失败，请检查网络环境！',
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
