<template>
  <div id="aided-tracking-model">
    <div class="header">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="开始日期">
          <el-col :span="5">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line"><div>结束日期</div></el-col>
          <el-col :span="5">
            <el-form-item prop="date2">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-input v-model="form.search" placeholder="学生姓名、学号" class="search" v-if="root != 10001"></el-input>
          <el-button type="primary" icon="search" @click="getTableData" class="marginLeft20">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content">
      <div class="content-title">
        <h2>考勤信息列表</h2>
        <el-button type="primary" class="check" @click="handleDelete" v-if="root == 10004||root == 10005">删除</el-button>
        <el-button type="text" class="download"><i class="el-icon-document"></i>导出数据</el-button>
      </div>
      <div class="content-table">
        <el-table
          ref="multipleTable"
          :data="tableData"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="40" v-if="root == 10004||root == 10005">
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            sortable
            min-width="50">
          </el-table-column>
          <el-table-column
            prop="studentName"
            label="学生姓名"
            sortable
            min-width="90">
          </el-table-column>
          <el-table-column
            prop="code"
            label="学号"
            sortable
            min-width="150">
          </el-table-column>
          <el-table-column
            prop="internName"
            label="实习名称"
            sortable
            min-width="200">
          </el-table-column>
          <el-table-column
            prop="checkInDate"
            label="签到日期"
            sortable
            min-width="150">
          </el-table-column>
          <el-table-column
            prop="location"
            label="地理位置"
            sortable
            min-width="320">
          </el-table-column>
          <el-table-column
            prop="ID"
            label="ID"
            min-width="100" v-if="false">
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
      this.$store.state.adminleftnavnum="/internshipProcess/aidedTracking";
    },
    data () {
      return {
        //用户身份
        status: true,
        form: {
          date1: "",
          date2: "",
          search: ""
        },
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
      //读取表格数据
      getTableData(ev) {
        this.$http.post('api/internshipProcess/aidedTracking/tableData',{
          startDate: this.form.date1,
          endDate: this.form.date2,
          search: this.form.search,
          currentPage: this.page.currentPage,
          pageSize: this.page.pageSize
        })
          .then((res) => {
            this.tableData = res.data.aidedTracking.aidedTrackingList;
            this.page.total = res.data.aidedTracking.total;
          }, (err) => {
            this.$message({
              message: '读取失败，请检查网络环境！',
              type: 'error',
              duration: 1500,
              showClose: true
            });
          });
      },
      //删除
      handleDelete(){
        let IdGroup = [];
        for(let i=0;i<this.multipleSelection.length;i++){
          IdGroup.push(this.multipleSelection[i].ID);
        }
        this.$http.post('api/internshipProcess/processTracking/delete',{
          ID: IdGroup
        })
          .then((res) => {
            this.$message({
              message: '删除考勤信息成功',
              type: 'info',
              duration: 1500,
              showClose: true
            });
            this.getTableData();
          }, (err) => {
            this.$message({
              message: '删除考勤信息失败，请检查网络环境！',
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
  #aided-tracking-model{
    .marginLeft20{
      margin-left: 20px;
    }
    .header{
      padding: 20px 0 0 0;
    }
    .search{
      width: 200px;
      margin-left: 25px;
      margin-right: 20px;
    }
    .check{
      margin-bottom: 5px;
      float: right;
    }
    .download{
      margin-right: 20px;
    }
  }
</style>
