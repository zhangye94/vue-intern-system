<template>
  <div id="guidance-record-model">
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
          <el-select v-model="form.processingState" multiple placeholder="请选择" class="processSelecct">
            <el-option label="已处理" value="processed"></el-option>
            <el-option label="未处理" value="untreated"></el-option>
          </el-select>
          <el-button type="primary" icon="search" @click="getTableData">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content">
      <div class="content-title">
        <h2>教师指导记录列表</h2>
        <router-link to="/internshipProcess/guidanceRecordAdd" class="add" v-if="root != 10001"><i class="el-icon-plus"></i></router-link>
        <el-button type="primary" class="check" @click="handleDelete" v-if="root != 10001">删除</el-button>
        <el-button type="text" @click="dialogVisible = true" v-if="root != 10001"><i class="el-icon-upload2"></i>导入数据</el-button>
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
          ref="multipleTable"
          :data="tableData"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
          :default-sort = "{prop: 'date', order: 'descending'}"
        >
          <el-table-column type="selection" width="40" v-if="root != 10001">
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            sortable
            width="50">
          </el-table-column>
          <el-table-column
            prop="tearcherName"
            label="教师姓名"
            sortable
            width="100">
          </el-table-column>
          <el-table-column
            prop="tearcherType"
            label="教师类型"
            sortable
            width="100">
          </el-table-column>
          <el-table-column
            prop="studentName"
            label="学生姓名"
            sortable
            width="100">
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题"
            sortable
            width="150">
          </el-table-column>
          <el-table-column
            prop="guideDate"
            label="指导日期"
            sortable
            width="120">
          </el-table-column>
          <el-table-column
            prop="askDate"
            label="提问日期"
            sortable
            width="120">
          </el-table-column>
          <el-table-column
            prop="guideWay"
            label="指导方式"
            sortable
            width="120">
          </el-table-column>
          <el-table-column
            prop="processingConditions"
            label="处理情况"
            sortable
            width="100">
          </el-table-column>
          <el-table-column v-if="false"
            prop="ID"
            label="ID"
            sortable
            width="100">
          </el-table-column>
          <el-table-column label="操作" width="70" fixed="right" v-if="root == 10002||root == 10003||root == 10004">
            <template scope="scope">
              <router-link :to="{ path: 'guidanceRecordAdd', query: { code: scope.row.ID }}">
                <el-button
                  size="small">编辑</el-button></router-link>
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
      this.$store.state.adminleftnavnum="/internshipProcess/guidanceRecord";
    },
    data () {
      return {
        dialogVisible: false,
        form: {
          date1: '',
          date2: '',
          processingState: [],
        },
        tableData: [],
        multipleSelection: [],
        fileList: [],
        root: localStorage.root
      }
    },
    methods: {
      //删除
      handleDelete() {
        let IdGroup = [];
        for(let i=0;i<this.multipleSelection.length;i++){
          IdGroup.push(this.multipleSelection[i].ID);
        }
        this.$http.post('api/internshipProcess/guidanceRecord/delete',{
          code: IdGroup,
        })
        .then((res) => {
          this.$message({
            message: '删除指导记录成功',
            type: 'info',
            duration: 1500,
            showClose: true
          });
        }, (err) => {
          this.$message({
            message: '删除指导记录失败，请检查网络环境！',
            type: 'error',
            duration: 1500,
            showClose: true
          });
        });
      },
      //弹出窗
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
        this.$http.post('api/internshipProcess/guidanceRecord/tableData',{
          startDate: this.form.date1,
          endDate: this.form.date2,
          processingState: this.form.processingState
        })
          .then((res) => {
            this.tableData = res.data.guidanceRecord;
          }, (err) => {
            this.$message({
              message: '读取指导记录失败，请检查网络环境！',
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
  #guidance-record-model{
    .header{
      padding: 20px 0 0 0;
    }
    .check{
      margin-bottom: 5px;
      margin-left: 20px;
      float: right;
    }
  }
  .header{
    .line{
      width: 10%;
      div{
        text-align: right;
        padding-right: 12px;
      }
    }
    .processSelecct{
      margin-left: 20px;
      margin-right: 15px;
    }
  }
</style>
