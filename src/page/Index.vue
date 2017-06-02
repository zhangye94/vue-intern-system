<template>
  <div id="index-model">
    <div class="index-content">
      <div class="index-contain">
        <h2 class="index-contain-title">用户信息</h2>
        <div class="index-contain-content">
          <ul class="index-contain-content-column">
            <li>
              <span>姓名：</span>
              <span>{{user.name}}</span>
            </li>
            <li>
              <span>学号：</span>
              <span>{{user.code}}</span>
            </li>
            <li>
              <span>专业：</span>
              <span>{{user.major}}</span>
            </li>
          </ul>
          <ul class="index-contain-content-column">
            <li>
              <span>班级：</span>
              <span>{{user.class}}</span>
            </li>
            <li>
              <span>联系电话：</span>
              <span>{{user.telephone}}</span>
            </li>
            <li>
              <span>实习岗位：</span>
              <span>{{user.position}}</span>
            </li>
          </ul>
          <ul class="index-contain-content-column">
            <li>
              <span>实习年级：</span>
              <span>{{user.gradeValue}}</span>
            </li>
          </ul>
        </div>
        <router-link :to="{ path: '/accountManagement/modifiedData', query: { code: user.code }}" class="index-contain-link">修改资料</router-link>
      </div>
      <div class="index-contain">
        <h2 class="index-contain-title">实习信息</h2>
        <div class="index-contain-content">
          <ul class="index-contain-content-column">
            <li>
              <span>实习名称：</span>
              <span>{{internInfo.name}}</span>
            </li>
            <li>
              <span>实习代码：</span>
              <span>{{internInfo.code}}</span>
            </li>
            <li>
              <span>所属组织：</span>
              <span>{{internInfo.org}}</span>
            </li>
          </ul>
          <ul class="index-contain-content-column">
            <li>
              <span>实习年级：</span>
              <span>{{internInfo.gradeValue}}</span>
            </li>
            <li>
              <span>学年：</span>
              <span>{{internInfo.schoolYearValue}}</span>
            </li>
            <li>
              <span>学期：</span>
              <span>{{internInfo.term}}</span>
            </li>
          </ul>
          <ul class="index-contain-content-column">
            <li>
              <span>开始日期：</span>
              <span>{{internInfo.date1}}</span>
            </li>
            <li>
              <span>结束日期：</span>
              <span>{{internInfo.date2}}</span>
            </li>
            <li>
              <span>指导老师：</span>
              <span>{{internInfo.name}}</span>
            </li>
          </ul>
        </div>
        <router-link :to="{ path: '/internshipProgram/internshipView', query: { code: user.code }}" class="index-contain-link">查看详情</router-link>
      </div>
      <div class="index-contain">
        <h2 class="index-contain-title">实习状态</h2>
        <div class="index-contain-content">
          <el-steps :space="285" :active="2" finish-status="success">
            <el-step title="状态 1：确认信息中" description="确认实习和个人信息"></el-step>
            <el-step title="状态 2：参与实习中" description="请用户持续参与实习工作，学生请及时签到"></el-step>
            <el-step title="状态 3：实习评价中" description="填写个人总结和评价"></el-step>
            <el-step title="状态 4：结束实习" description="结束实习"></el-step>
          </el-steps>
        </div>
        <router-link :to="{ path: 'processTrackingAdd'}" class="index-contain-link" v-if="root != 10001">控制状态</router-link>
      </div>
      <div class="index-contain">
        <h2 class="index-contain-title">最新公告<span class="index-contain-subtitle">只显示最近的五条公告</span></h2>
        <div class="index-contain-content">
          <el-table
            ref="multipleTable"
            :data="informationList"
            border
            style="width: 100%"
            v-if="root == 10001||root == 10002||root == 10003"
          >
            <el-table-column
              type="index"
              label="序号"
              sortable
              width="70">
            </el-table-column>
            <el-table-column
              prop="title"
              label="标题"
              sortable
              min-width="240">
              <template scope="scope">
                <router-link :to="{ path: '/information/releaseNews', query: { code: scope.row.ID ,view: true}}">
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
          </el-table>
        </div>
        <router-link :to="{ path: '/information/newsList'}" class="index-contain-link">
          <span>查看公告</span>
        </router-link>
      </div>
      <div class="index-contain">
        <h2 class="index-contain-title">留言信息<span class="index-contain-subtitle">只显示最近的五条留言</span></h2>
        <div class="index-contain-content">
          <el-table
            ref="multipleTable"
            :data="messageList"
            border
            style="width: 100%"
            v-if="root == 10001||root == 10002||root == 10003"
          >
            <el-table-column
              type="index"
              label="序号"
              sortable
              width="70">
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
              min-width="300">
              <template scope="scope">
                <router-link :to="{ path: '/internshipProcess/studentMessageReply', query: { code: scope.row.ID , view: true}}">
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
            <el-table-column label="操作" fixed="right" v-if="root == 10002||root == 10003||root == 10001">
              <template scope="scope">
                <router-link :to="{ path: '/internshipProcess/studentMessageReply', query: { code: scope.row.ID }}">
                  <el-button
                    size="small">回复</el-button></router-link>
              </template>
            </el-table-column>
          </el-table>
          <el-table v-if="root == 10004||root == 10005">
          </el-table>
        </div>
        <router-link :to="{ path: '/internshipProcess/studentMessage'}" class="index-contain-link">
          <span v-if="root == 10004||root == 10005">查看留言</span>
          <span v-if="root == 10001||root == 10002||root == 10003">回复留言</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    created: function () {
      this.getMessageData();
      this.getInformationData();
      this.getUserInfo();
      this.getInternInfo();
    },
    data () {
      return {
        activeIndex: '/index',
        root: localStorage.root,
        messageList: [],
        informationList: [],
        user: "",
        internInfo: ""
      }
    },
    methods: {
      //读取留言表格数据
      getMessageData(ev) {
        this.$http.post('api/internshipProcess/studentMessage/tableData', {

        })
          .then((res) => {
            let indexMessage = [];
            for(let i = 0;i<5;i++){
              if(res.data.studentMessage[i]){
                indexMessage.push(res.data.studentMessage[i]);
              }else{
                break;
              }
            }
            this.messageList = indexMessage;
          }, (err) => {
            this.$message({
              message: '读取失败，请检查网络环境！',
              type: 'error',
              duration: 1500,
              showClose: true
            });
          });
      },
      //读取公告表格数据
      getInformationData(ev){
        this.$http.post('api/information/newsList/tableData',{})
          .then((res) => {
            let indexInformation = [];
            for(let i = 0;i<5;i++){
              if(res.data.form[i]){
                indexInformation.push(res.data.form[i]);
              }else{
                break;
              }
            }
            this.informationList = indexInformation;

            for(let i=0;i<res.data.form.length;i++){
              if(res.data.form[i].show){
                this.$notify.info({
                  title: '最新公告',
                  message: res.data.form[i].title,
                  duration: 4500+500*i,
                  offset: 60+100*i
                });
              }
            }
          }, (err) => {
            this.$message({
              message: '读取公告列表失败，请检查网络环境！',
              type: 'error',
              duration: 1500,
              showClose: true
            });
          });
      },
      //读取用户信息
      getUserInfo(){
        this.$http.post('api/common/user',{})
          .then((res) => {
            this.user = res.data.user;
          }, (err) => {
            this.$message({
              message: '读取用户信息失败，请检查网络环境！',
              type: 'error',
              duration: 1500,
              showClose: true
            });
          });
      },
      //读取编辑信息
      getInternInfo(){
        this.$http.post('api/internshipProgram/read',{
          type: "internship"
        })
          .then((res) => {
            this.internInfo = res.data.form;
          }, (err) => {
            this.$message({
              message: '读取实习信息失败，请检查网络环境！',
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
  #index-model {
    background-color: #fff;
    width: 90%;
    margin: auto;
    margin-top: 20px;
    min-height: 400px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    .index-content {
      padding: 30px;
      .index-contain {
        position: relative;
        background-color: rgb(248, 248, 248);
        min-height: 100px;
        border-radius: 4px;
        border: 1px solid rgb(235, 235, 235);
        margin-bottom: 20px;
        .index-contain-title {
          color: #20a0ff;
          padding: 10px;
        }
        .index-contain-subtitle{
          color: #aaa;
          font-size: 12px;
          padding-left: 30px;
        }
        .index-contain-content{
          margin-bottom: 25px;
          padding: 20px;
          overflow: hidden;
          .index-contain-content-column{
            width: 30%;
            min-height: 30px;
            float: left;
            li{
              line-height: 24px;
            }
          }
          .content-table-link{
            text-decoration: underline;
            color: #20a0ff;
          }
        }
        .index-contain-link {
          color: #20a0ff;
          position: absolute;
          right: 15px;
          bottom: 15px;
          text-decoration: underline;
        }
      }
    }
  }
</style>
