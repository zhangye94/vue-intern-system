<template>
  <div id="internship-typing-model">
    <div class="header">
      <el-input
        placeholder="请输入实习名称、实习代码"
        icon="search"
        v-model="searchContent"
        :on-icon-click="handleIconClick">
      </el-input>
    </div>
    <div class="content">
      <div class="content-title">
        <h2>实习列表</h2>
        <router-link to="/internshipProgram/internshipAdd" class="add"><i class="el-icon-plus"></i></router-link>
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
              <router-link :to="{ path: 'internshipAdd', query: { code: scope.row.code }}">
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
            label="实习代码"
            sortable
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="internName"
            label="实习名称"
            sortable
            min-width="140">
          </el-table-column>
          <el-table-column
            prop="orgName"
            label="所属组织"
            sortable
            min-width="140">
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
        searchContent: '',
        dialogVisible: false,
        fileList: [],
        tableData: [{
          code: '001',
          internName: '搬砖实习',
          orgName: '数据挖掘实验室',
          grade: '2016级',
          schoolYear: '2016-2017',
          semester: '第一学期',
          startDate: '2016-9',
          endDate: '2016-12'
        }, {
          code: '002',
          internName: '搬砖实习2',
          orgName: '数据挖掘实验室2',
          grade: '2017级',
          schoolYear: '2017-2018',
          semester: '第二学期',
          startDate: '2017-9',
          endDate: '2017-12'
        }, {
          code: '003',
          internName: '搬砖实习3',
          orgName: '数据挖掘实验室3',
          grade: '2018级',
          schoolYear: '2018-2019',
          semester: '第一学期',
          startDate: '2018-9',
          endDate: '2018-12'
        }, {
          code: '004',
          internName: '搬砖实习',
          orgName: '数据挖掘实验室',
          grade: '2016级',
          schoolYear: '2016-2017',
          semester: '第一学期',
          startDate: '2016-9',
          endDate: '2016-12'
        }]
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
            code: row.code,
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
      }
    }
  }
</script>

<style lang="less">
  .header{
    padding: 20px;
    background-color: rgb(248,248,248);
    border-bottom: 1px solid #eee;
    .el-input{
      width: 250px;
    }
  }
  .content{
    padding: 10px 20px 10px 20px;
    .content-title{
      border-bottom: 2px solid rgb(32,160,255);
      overflow: hidden;
      .add{
        margin-left: 10px;
        line-height: 34px;
        color: rgb(32,160,255);
      }
      h2{
        padding-left: 10px;
        display: inline-block;
        font-weight: bold;
        float: left;
        line-height: 34px;
      }
      .el-button--text{
        float: right;
        i{
          padding-right: 10px;
        }
        span{
          display: inline-block;
          font-weight: bold;
        }
      }
    }
    .content-table{
      margin-top: 15px;
      .cell{
        font-size: 12px;
        padding: 0px 10px 0px 10px;
        >.el-button{
          margin-left: 5px;
        }
      }
    }
  }
</style>
