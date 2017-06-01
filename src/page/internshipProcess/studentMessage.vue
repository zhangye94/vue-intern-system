<template>
  <div id="student-message-model">
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
          <el-input v-model="form.search" placeholder="教师姓名、教工号" class="search" v-if="root == 10004||root == 10005"></el-input>
          <el-button type="primary" icon="search" @click="getTableData" class="marginLeft20">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content">
      <div class="content-title">
        <h2>留言本列表</h2>
        <router-link to="/internshipProcess/studentMessageAdd" class="add" v-if="root == 10001"><i class="el-icon-plus"></i></router-link>
        <el-button type="primary" class="check" @click="handleDelete" v-if="root == 10004||root == 10005">删除</el-button>
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
            prop="teacherName"
            label="教师姓名"
            sortable
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="code"
            label="教师类型"
            sortable
            min-width="150">
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题"
            sortable
            min-width="280">
            <template scope="scope">
              <router-link :to="{ path: 'studentMessageReply', query: { code: scope.row.ID , view: true}}">
                <span class="content-table-link">{{scope.row.title}}</span>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="date"
            label="提问日期"
            sortable
            min-width="160">
          </el-table-column>
          <el-table-column
            prop="state"
            label="处理状态"
            sortable
            min-width="130">
          </el-table-column>
          <el-table-column
            prop="ID"
            label="ID"
            min-width="100" v-if="false">
          </el-table-column>
          <el-table-column label="操作" width="70" fixed="right" v-if="root == 10002||root == 10003||root == 10001">
            <template scope="scope">
              <router-link :to="{ path: 'studentMessageReply', query: { code: scope.row.ID ,view: false}}">
                <el-button
                  size="small">回复</el-button></router-link>
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
      this.$store.state.adminleftnavnum="/internshipProcess/studentMessage";
    },
    data () {
      return {
        form: {
          date1: "",
          date2: "",
          search: ""
        },
        tableData: [],
        multipleSelection: [],
        root: localStorage.root
      }
    },
    methods: {
      //多选表格方法
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //读取表格数据
      getTableData(ev) {
        this.$http.post('api/internshipProcess/studentMessage/tableData',{
          startDate: this.form.date1,
          endDate: this.form.date2,
          search: this.form.search
        })
          .then((res) => {
            this.tableData = res.data.studentMessage;
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
        this.$http.post('api/internshipProcess/studentMessage/delete',{
          ID: IdGroup
        })
          .then((res) => {
            this.$message({
              message: '删除学生留言成功',
              type: 'info',
              duration: 1500,
              showClose: true
            });
            this.getTableData();
          }, (err) => {
            this.$message({
              message: '删除学生留言失败，请检查网络环境！',
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
  #student-message-model{
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
  }
</style>
