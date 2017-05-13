<template>
  <div id="paper-management-model">
    <div class="header">
      <el-input
        placeholder="请输入题目名称"
        v-model="form.searchContent">
      </el-input>
      <el-select v-model="form.problemType" multiple placeholder="请选择">
        <el-option
          v-for="item in setting.problemTypes"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <el-button type="primary" icon="search" @click="getTableData">查询</el-button>
    </div>
    <div class="content">
      <div class="content-title">
        <h2>试卷题目列表</h2>
        <router-link to="/onlineTest/paperManagementAdd" class="add" v-if="root == 10002||root == 10004||root == 10005"><i class="el-icon-plus"></i></router-link>
        <el-button type="primary" class="batchDelete" @click="handleDelete" v-if="root == 10002||root == 10004||root == 10005">删除</el-button>
        <el-button type="text" @click="dialogVisible = true" v-if="root == 10002||root == 10004||root == 10005"><i class="el-icon-upload2"></i>导入数据</el-button>
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
          <el-table-column label="操作" width="70" fixed="right">
            <template scope="scope">
              <router-link :to="{ path: 'paperManagementView', query: { code: scope.row.ID }}">
                <el-button
                  size="small">查看</el-button></router-link>
            </template>
          </el-table-column>
          <el-table-column type="selection" width="40" v-if="root == 10002||root == 10004||root == 10005">
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            sortable
            width="50">
          </el-table-column>
          <el-table-column
            prop="problemName"
            label="题目名称"
            sortable
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="problemType"
            label="类型"
            sortable
            min-width="100">
          </el-table-column>
          <el-table-column
            v-if="false"
             prop="ID"
             label="ID"
             sortable
             width="100">
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
      this.checkRoot();
      this.getTableData();
      this.$store.state.adminleftnavnum="/onlineTest/paperManagement";
    },
    data () {
      return {
        root: localStorage.root,
        setting: {
          problemTypes: ["单选题","多选题"]
        },
        form: {
          problemType: "",
          searchContent: ""
        },
        dialogVisible: false,
        fileList: [],
        tableData: [],
        multipleSelection: [],
        root: localStorage.root
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
      //读取表格数据
      getTableData(ev){
        this.$http.post('api/onlineTest/paperManagement/tableData',{
          problemType: this.form.problemType,
          searchContent: this.form.searchContent
        })
          .then((res) => {
            this.tableData = res.data.tableData;
          }, (err) => {
            this.$message({
              message: '读取试卷列表失败，请检查网络环境！',
              type: 'error',
              duration: 1500,
              showClose: true
            });
          });
      },
      //删除
      handleDelete() {
        let IdGroup = [];
        for(let i=0;i<this.multipleSelection.length;i++){
          IdGroup.push(this.multipleSelection[i].ID);
        }
        this.$http.post('api/onlineTest/paperManagement/delete',{
          code: IdGroup
        })
          .then((res) => {
            this.$message({
              message: '删除题目成功',
              type: 'info',
              duration: 1500,
              showClose: true
            });
          }, (err) => {
            this.$message({
              message: '删除题目失败，请检查网络环境！',
              type: 'error',
              duration: 1500,
              showClose: true
            });
          });
      },
      //检查权限
      checkRoot(){
        if(this.root == 10001){
          this.$router.back();
        }
      }
    },
    watch: {
      '$route' (to, from) {
        if(to.path === '/onlineTest/paperManagement'){
          this.checkRoot();
        }
      }
    }
  }
</script>

<style lang="less">

</style>
