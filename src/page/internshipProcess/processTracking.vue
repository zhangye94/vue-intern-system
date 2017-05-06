<template>
  <div id="process-tracking-model">
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
          <el-input v-model="form.search" placeholder="学生姓名、学号" class="search"></el-input>
          <el-button type="primary" icon="search" @click="getTableData">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content">
      <div class="content-title">
        <h2>实习总结</h2>
        <router-link to="/internshipProcess/processTrackingAdd" class="add"><i class="el-icon-plus"></i></router-link>
        <el-button type="primary" class="check" @click="review">审阅</el-button>
        <el-button type="primary" class="check delete" @click="handleDelete">删除</el-button>
      </div>
      <div class="content-table">
        <el-table
          ref="multipleTable"
          :data="tableData"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="40">
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            sortable
            width="50">
          </el-table-column>
          <el-table-column
            prop="studentName"
            label="学生姓名"
            sortable
            width="100">
          </el-table-column>
          <el-table-column
            prop="code"
            label="学号"
            sortable
            width="150">
          </el-table-column>
          <el-table-column
            prop="internName"
            label="实习名称"
            sortable
            width="180">
          </el-table-column>
          <el-table-column
            prop="internAssessment"
            label="实习评分"
            sortable
            width="120">
          </el-table-column>
          <el-table-column
            prop="title"
            label="总结标题"
            sortable
            width="190">
          </el-table-column>
          <el-table-column
            prop="condition"
            label="审阅情况"
            sortable
            width="100">
          </el-table-column>
          <el-table-column
            prop="ID"
            label="ID"
            width="100" v-if="false">
          </el-table-column>
          <el-table-column label="操作" width="70" fixed="right">
            <template scope="scope">
              <router-link :to="{ path: 'processTrackingAdd', query: { code: scope.row.ID }}" v-if="status">
                <el-button
                  size="small">编辑</el-button></router-link>
              <router-link :to="{ path: 'processTrackingAdd', query: { code: scope.row.ID }}" v-if="!status">
                <el-button
                  size="small">审阅</el-button></router-link>
            </template>
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
      this.$store.state.adminleftnavnum="/internshipProcess/processTracking";
    },
    data () {
      return {
        //用户身份
        status: true,
        form: {
          date1: '',
          date2: '',
          search: ''
        },
        tableData: [],
        multipleSelection: []
      }
    },
    methods: {
      //审阅
      review(ev){
        let IdGroup = [];
        for(let i=0;i<this.multipleSelection.length;i++){
          IdGroup.push(this.multipleSelection[i].ID);
        }
        this.$http.post('api/internshipProcess/processTracking/review',{
          ID: IdGroup
        })
          .then((res) => {
            this.$message({
              message: '审阅提交成功',
              type: 'info',
              duration: 1500,
              showClose: true
            });
            this.getTableData();
          }, (err) => {
            this.$message({
              message: '审阅提交失败，请检查网络环境！',
              type: 'error',
              duration: 1500,
              showClose: true
            });
          });
      },
      //多选表格方法
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //删除
      handleDelete() {
        let IdGroup = [];
        for(let i=0;i<this.multipleSelection.length;i++){
          IdGroup.push(this.multipleSelection[i].ID);
        }
        this.$http.post('api/internshipProcess/processTracking/delete',{
          ID: IdGroup
        })
          .then((res) => {
            this.$message({
              message: '删除成功',
              type: 'info',
              duration: 1500,
              showClose: true
            });
          }, (err) => {
            this.$message({
              message: '删除失败，请检查网络环境！',
              type: 'error',
              duration: 1500,
              showClose: true
            });
          });
      },
      //读取表格数据
      getTableData(ev) {
        this.$http.post('api/internshipProcess/processTracking/tableData',{
          startDate: this.form.date1,
          endDate: this.form.date2,
          search: this.form.search
        })
          .then((res) => {
            this.tableData = res.data.processTracking;
          }, (err) => {
            this.$message({
              message: '读取失败，请检查网络环境！',
              type: 'error',
              duration: 1500,
              showClose: true
            });
          });
      },
    }
  }
</script>

<style lang="less">
  #process-tracking-model{
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
    .delete{
      margin-right: 5px;
    }
  }
</style>
