<template>
  <div id="news-list-model">
    <div class="content">
      <div class="content-title">
        <h2>公告列表</h2>
        <router-link to="/information/releaseNews" class="add" v-if="root == 10002||root == 10004||root == 10005"><i class="el-icon-plus"></i></router-link>
      </div>
      <div class="content-table">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          :default-sort = "{prop: 'date', order: 'descending'}"
        >
          <el-table-column
            type="index"
            label="序号"
            sortable
            width="50">
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题"
            sortable
            min-width="240">
            <template scope="scope">
              <router-link :to="{ path: 'releaseNews', query: { code: scope.row.ID ,view: true}}">
                <span class="content-table-link">{{scope.row.title}}</span>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="发布类型"
            sortable
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="submitter"
            label="提交人"
            sortable
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="date"
            label="提交日期	"
            min-width="80">
          </el-table-column>
          <el-table-column
            prop="ID"
            label="ID"
            min-width="100" v-if="false">
          </el-table-column>
          <el-table-column label="操作" width="70" fixed="right" v-if="root == 10002||root == 10004||root == 10005">
            <template scope="scope">
              <router-link :to="{ path: 'releaseNews', query: { code: scope.row.ID ,view: false}}">
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
      this.$store.state.adminleftnavnum="/information/newsList";
    },
    data () {
      return {
        tableData: [],
        root: localStorage.root
      }
    },
    methods: {
      //读取表格数据
      getTableData(ev){
        this.$http.post('api/information/newsList/tableData',{})
          .then((res) => {
            this.tableData = res.data.form;
          }, (err) => {
            this.$message({
              message: '读取公告列表失败，请检查网络环境！',
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
