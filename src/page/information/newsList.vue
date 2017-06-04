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
      this.$store.state.adminleftnavnum="/information/newsList";
    },
    data () {
      return {
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
        this.$http.post('api/information/newsList/tableData',{
          currentPage: this.page.currentPage,
          pageSize: this.page.pageSize
        })
          .then((res) => {
            this.tableData = res.data.form.newsList;
            this.page.total = res.data.form.total;
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
