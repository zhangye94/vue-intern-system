require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


var apiRouter = express.Router();
//通用
var common = require("../mockDB/commonDB.json");
//获取用户信息
apiRouter.post('/common/user',function(req,res){
  res.json({
    user: common.user
  });
});
//获取当前用户的教师列表
apiRouter.post('/common/teacherList',function(req,res){
  res.json({
    teacherList: common.teacherList
  });
});

//消息公告
var information = require("../mockDB/informationDB.json");
//公告列表
apiRouter.post('/information/newsList/tableData',function(req,res){
  res.json({
    form: information.newsListTable
  });
});
//考核评价
var assessment = require("../mockDB/assessmentDB.json");
//校内教师考核
apiRouter.post('/assessment/internalTeacherAssessment/tableData',function(req,res){
  res.json({
    form: assessment.internalTeacherAssessmentTable
  });
});
//校外教师考核
apiRouter.post('/assessment/externalTeacherAssessment/tableData',function(req,res){
  res.json({
    form: assessment.externalTeacherAssessmentTable
  });
});
//学生考核
apiRouter.post('/assessment/studentAssessment/tableData',function(req,res){
  res.json({
    form: assessment.studentAssessmentTable
  });
});
//实习安排
var internshipProgram = require("../mockDB/internshipDB.json");
//年级列表
apiRouter.post('/internshipProgram/gradeList',function(req,res){
  res.json({
    gradeList: internshipProgram.gradeList
  });
});
//实习列表
apiRouter.post('/internshipProgram/internList',function(req,res){
  res.json({
    internList: internshipProgram.internList
  });
});
//学年列表
apiRouter.post('/internshipProgram/schoolYear',function(req,res){
  res.json({
    schoolYear: internshipProgram.schoolYear
  });
});
//查询
apiRouter.post('/internshipProgram/read',function(req,res){
  var type = req.body.type;
  var code = req.body.code;
  if(type === 'teacher'){
    res.json({
      form: internshipProgram.teacherQuery
    });
  }else if(type === 'internship'){
    res.json({
      form: internshipProgram.internshipQuery
    });
  }else if(type === 'student'){
    res.json({
      form: internshipProgram.studentQuery
    });
  }
});
//表格数据渲染
apiRouter.post('/internshipProgram/tableData',function(req,res){
  var type = req.body.type;
  if(type === 'teacher'){
    res.json({
      form: internshipProgram.teacherData
    });
  }else if(type === 'internship'){
    res.json({
      form: internshipProgram.internshipData
    });
  }else if(type === 'student'){
    res.json({
      form: internshipProgram.studentData
    });
  }
});

//实习过程
var internshipProcess = require("../mockDB/internshipProcessDB.json");
//指导记录表格渲染
apiRouter.post('/internshipProcess/guidanceRecord/tableData',function(req,res){
  res.json({
    guidanceRecord: internshipProcess.guidanceRecord
  });
});
//指导记录编辑内容读取
apiRouter.post('/internshipProcess/guidanceRecord/read',function(req,res){
  var code = req.body.code;
  if(code){
    res.json({
      form: internshipProcess.guidanceRecordEdit
    });
  }else{
    res.json({
      form: internshipProcess.guidanceRecordEmpty
    });
  }
});
//过程跟踪表格渲染
apiRouter.post('/internshipProcess/processTracking/tableData',function(req,res){
  res.json({
    processTracking: internshipProcess.processTracking
  });
});
//过程跟踪编辑内容读取
apiRouter.post('/internshipProcess/processTracking/read',function(req,res){
  var code = req.body.code;
  res.json({
    form: internshipProcess.processTrackingEdit
  });
});
//辅助跟踪表格渲染
apiRouter.post('/internshipProcess/aidedTracking/tableData',function(req,res){
  res.json({
    aidedTracking: internshipProcess.aidedTracking
  });
});
//留言表格渲染
apiRouter.post('/internshipProcess/studentMessage/tableData',function(req,res){
  res.json({
    studentMessage: internshipProcess.studentMessage
  });
});
//获取回复信息
apiRouter.post('/internshipProcess/studentMessage/getReplyContent',function(req,res){
  res.json({
    replyList: internshipProcess.replyList
  });
});


//在线考试模块
var onlineTest = require("../mockDB/onlineTestDB.json");
//考试情况
apiRouter.post('/onlineTest/testCase/tableData',function(req,res){
  res.json({
    tableData: onlineTest.testCase
  });
});
//考试情况查看
apiRouter.post('/onlineTest/testCase/view',function(req,res){
  res.json({
    form: onlineTest.problemList
  });
});
//考试标准
apiRouter.post('/onlineTest/testStandard/tableData',function(req,res){
  res.json({
    testStandard: onlineTest.testStandard
  });
});
//考试标准编辑内容读取
apiRouter.post('/onlineTest/testStandard/read',function(req,res){
  var code = req.body.code;
  res.json({
    form: onlineTest.testStandardEdit
  });
});
//试卷管理
apiRouter.post('/onlineTest/paperManagement/tableData',function(req,res){
  res.json({
    tableData: onlineTest.paperManagement
  });
});
//考题查看
apiRouter.post('/onlineTest/paperManagement/view',function(req,res){
  res.json({
    form: onlineTest.problem
  });
});

app.use('/api', apiRouter);

// var apiRouter = express.Router()
// var fs = require('fs')
// apiRouter.route('/:apiName')
// .all(function (req, res) {
//   fs.readFile('./db.json', 'utf8', function (err, data) {
//     if (err) throw err
//     var data = JSON.parse(data)
//     if (data[req.params.apiName]) {
//       res.json(data[req.params.apiName])
//     }
//     else {
//       res.send('no such api name')
//     }
//
//   })
// })
//
//
// apiServer.use('/api', apiRouter);




var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
