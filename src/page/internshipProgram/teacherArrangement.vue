<template>
  <div id="teacher-arrangement-model">
    <div class="header">
      <el-input
        placeholder="请输入教师名称、教工号"
        icon="search"
        v-model="searchContent"
        :on-icon-click="getTableData">
      </el-input>
      <el-select v-model="teacherTypeSelect" placeholder="教师类型">
        <el-option
          v-for="item in teacherTypeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="teacherAttributeSelect" placeholder="专/兼职">
        <el-option
          v-for="item in teacherAttributeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" icon="search" @click="getTableData">查询</el-button>
    </div>
    <div class="content">
      <div class="content-title">
        <h2>教师列表</h2>
        <router-link to="/internshipProgram/teacherAdd" class="add" v-if="root == 10004||root == 10005"><i class="el-icon-plus"></i></router-link>
        <el-button type="primary" class="batchDelete" @click="handleDelete" v-if="root == 10004||root == 10005">删除</el-button>
        <el-button type="text" @click="dialogVisible = true" v-if="root == 10004||root == 10005"><i class="el-icon-upload2"></i>导入数据</el-button>
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
          @selection-change="handleSelectionChange"
          :default-sort = "{prop: 'date', order: 'descending'}"
        >
          <el-table-column type="selection" width="40" v-if="root == 10004||root == 10005">
          </el-table-column>
          <el-table-column label="操作" width="70" fixed="right" v-if="root == 10004||root == 10005">
            <template scope="scope">
              <router-link :to="{ path: 'teacherAdd', query: { code: scope.row.code }}">
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
            label="教工号"
            sortable
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="tearcherName"
            label="教师姓名"
            sortable
            min-width="150">
          </el-table-column>
          <el-table-column
            prop="internName"
            label="实习名称"
            sortable
            min-width="240">
          </el-table-column>
          <el-table-column
            prop="teacherType"
            label="教师类型"
            sortable
            min-width="140">
          </el-table-column>
          <el-table-column
            prop="studentNum"
            label="学生人数"
            sortable
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="teacherAttribute"
            label="专/兼职"
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
      this.getTableData();
      this.$store.state.adminleftnavnum="/internshipProgram/teacherArrangement";
    },
    data () {
      return {
        searchContent: '',
        dialogVisible: false,
        fileList: [],
        tableData: [],
        teacherTypeOptions: [{
          value: '选项1',
          label: '校内教师'
        }, {
          value: '选项2',
          label: '校外教师'
        }],
        teacherTypeSelect: '',
        teacherAttributeOptions: [{
          value: '选项1',
          label: '专职'
        }, {
          value: '选项2',
          label: '兼职'
        }],
        teacherAttributeSelect: '',
        multipleSelection: [],
        root: localStorage.root
      }
    },
    methods: {
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
      //删除
      handleDelete() {
        let IdGroup = [];
        for(let i=0;i<this.multipleSelection.length;i++){
          IdGroup.push(this.multipleSelection[i].code);
        }
        this.$http.post('api/internshipProgram/delete',{
            code: IdGroup,
            type: "teacher"
        })
          .then((res) => {
            this.$message({
              message: '删除教师信息成功',
              type: 'info',
              duration: 1500,
              showClose: true
            });
          }, (err) => {
            this.$message({
              message: '删除教师信息失败，请检查网络环境！',
              type: 'error',
              duration: 1500,
              showClose: true
            });
          });
      },
      //读取表格数据
      getTableData(ev){
        this.$http.post('api/internshipProgram/tableData',{
          type: "teacher",
          teacherAttributeSelect: this.teacherAttributeSelect,
          searchContent: this.searchContent,
          teacherTypeSelect: this.teacherTypeSelect
        })
          .then((res) => {
            this.tableData = res.data.form;
          }, (err) => {
            this.$message({
              message: '读取教师信息失败，请检查网络环境！',
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
