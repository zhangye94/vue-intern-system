<template>
  <div id="test-standard-model">
    <div class="header">
      <el-select v-model="form.internshipList" placeholder="请选择">
        <el-option
          v-for="item in setting.internshipListOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" icon="search" @click="getTableData">查询</el-button>
    </div>
    <div class="content">
      <div class="content-title">
        <h2>各实习考试及格标准列表</h2>
        <router-link to="/onlineTest/testStandardAdd" class="add"><i class="el-icon-plus"></i></router-link>
        <el-button type="primary" class="batchDelete" @click="handleDelete">删除</el-button>
        <h3>没有特定设置合格分数的专业方向的默认合格分数为60分</h3>
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
              <router-link :to="{ path: 'testStandardAdd', query: { code: scope.row.ID }}">
                <el-button
                  size="small">修改</el-button></router-link>
            </template>
          </el-table-column>
          <el-table-column type="selection" width="40">
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            sortable
            width="50">
          </el-table-column>
          <el-table-column
            prop="internName"
            label="实习名称"
            sortable
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="score"
            label="及格分数"
            sortable
            min-width="100">
          </el-table-column>
          <el-table-column v-if="false"
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
      this.getInternList();
      this.getTableData();
      this.$store.state.adminleftnavnum="/onlineTest/testStandard";
    },
    data () {
      return {
        setting: {
          internshipListOptions: []
        },
        form: {
          internshipList: [],
        },
        tableData: [],
        multipleSelection: []
      }
    },
    methods: {
      //多选表格方法
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //读取表格数据
      getTableData(ev){
        this.$http.post('api/onlineTest/testStandard/tableData',{
          internshipList: this.form.internshipList,
          searchContent: this.form.searchContent,
          score: this.form.score
        })
          .then((res) => {
            this.tableData = res.data.testStandard;
          }, (err) => {
            this.$message({
              message: '读取学生信息失败，请检查网络环境！',
              type: 'error',
              duration: 1500,
              showClose: true
            });
          });
      },
      //读取实习列表信息
      getInternList(){
        this.$http.post('api/internshipProgram/internList',{})
          .then((res) => {
            this.setting.internshipListOptions = res.data.internList;
          }, (err) => {
            this.$message({
              message: '读取实习列表失败，请检查网络环境！',
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
        this.$http.post('api/onlineTest/testStandard/delete',{
          code: IdGroup
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
#test-standard-model{
  .content{
    .content-title{
      h3{
        padding-left: 10px;
        display: inline-block;
        float: right;
        line-height: 34px;
        color: #bbb;
      }
    }
  }
}
</style>
