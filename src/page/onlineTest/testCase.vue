<template>
  <div id="online-test-model">
    <div class="header">
      <el-input
        placeholder="请输入学生名称、学号"
        v-model="form.searchContent" v-if="root != 10001">
      </el-input>
      <el-select v-model="form.internshipList" placeholder="请选择">
        <el-option
          v-for="item in setting.internshipListOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="form.score" multiple placeholder="请选择">
        <el-option
          v-for="item in setting.ScoreSection"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <el-button type="primary" icon="search" @click="getTableData">查询</el-button>
    </div>
    <div class="content">
      <div class="content-title">
        <h2>考试情况列表</h2>
        <router-link to="/internshipProgram/studentAdd" class="add" v-if="root == 10001">开始考试</router-link>
        <el-button type="text" v-if="root != 10001"><i class="el-icon-document"></i>导出数据</el-button>
      </div>
      <div class="content-table">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          :default-sort = "{prop: 'date', order: 'descending'}"
        >
          <el-table-column label="操作" width="70" fixed="right">
            <template scope="scope">
              <router-link :to="{ path: 'testCaseView', query: { code: scope.row.code }}">
                <el-button
                  size="small">查看</el-button></router-link>
            </template>
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            sortable
            min-width="50">
          </el-table-column>
          <el-table-column
            prop="studentName"
            label="姓名"
            sortable
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="code"
            label="学号"
            sortable
            min-width="100">
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
          <el-table-column
            prop="internScore"
            label="实习分数"
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
      this.getInternList();
      this.$store.state.adminleftnavnum="/onlineTest/testCase";
    },
    data () {
      return {
        activeIndex: 'index',
        setting: {
          ScoreSection : ["60分以下","60-70分","70-80分","80-90分","90-100分"],
          internshipListOptions: []
        },
        form: {
          searchContent: "",
          internshipList: [],
          score: ""
        },
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
        this.$http.post('api/onlineTest/testCase/tableData',{
          internshipList: this.form.internshipList,
          searchContent: this.form.searchContent,
          score: this.form.score,
          currentPage: this.page.currentPage,
          pageSize: this.page.pageSize
        })
          .then((res) => {
            this.tableData = res.data.tableData.testCaseList;
            this.page.total = res.data.tableData.total;
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
      }
    }
  }
</script>

<style lang="less">

</style>
