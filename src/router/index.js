import Vue from 'vue'
import Router from 'vue-router'
//首页
import indexPage from '@/page/index'
//在线考试路由
import onlineTestPage from '@/page/onlineTest'
import testCasePage from '@/page/onlineTest/testCase'
import paperManagementPage from '@/page/onlineTest/paperManagement'
import testStandardPage from '@/page/onlineTest/testStandard'
//实习安排
import internshipProgramPage from '@/page/internshipProgram'
import internshipTypingPage from '@/page/internshipProgram/internshipTyping'
import teacherArrangementPage from '@/page/internshipProgram/teacherArrangement'
import informationAcquisitionPage from '@/page/internshipProgram/informationAcquisition'
import studentListPage from '@/page/internshipProgram/studentList'

import teacherAddPage from '@/page/internshipProgram/teacherAdd'
import studentAddPage from '@/page/internshipProgram/studentAdd'
import internshipAddPage from '@/page/internshipProgram/internshipAdd'
//实习过程
import internshipProcessPage from '@/page/internshipProcess'
import guidanceRecordPage from '@/page/internshipProcess/guidanceRecord'
import processTrackingPage from '@/page/internshipProcess/processTracking'
import aidedTrackingPage from '@/page/internshipProcess/aidedTracking'
import studentMessagePage from '@/page/internshipProcess/studentMessage'

import guidanceRecordAddPage from '@/page/internshipProcess/guidanceRecordAdd'
import processTrackingAddPage from '@/page/internshipProcess/processTrackingAdd'
import studentMessageAddPage from '@/page/internshipProcess/studentMessageAdd'
import studentMessageReplyPage from '@/page/internshipProcess/studentMessageReply'
//考核评价
import assessmentPage from '@/page/assessment'
import internalTeacherAssessmentPage from '@/page/assessment/internalTeacherAssessment'
import externalTeacherAssessmentPage from '@/page/assessment/externalTeacherAssessment'
import studentAssessmentPage from '@/page/assessment/studentAssessment'
import indexSettingPage from '@/page/assessment/indexSetting'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: indexPage
    },
    {
      path: '/onlineTest',
      component: onlineTestPage,
      redirect: '/onlineTest/testCase',
      children: [
        {
          path: 'testCase',
          component: testCasePage
        },
        {
          path: 'paperManagement',
          component: paperManagementPage
        },
        {
          path: 'testStandard',
          component: testStandardPage
        }
      ]
    },
    {
      path: '/internshipProgram',
      component: internshipProgramPage,
      redirect: '/internshipProgram/internshipTyping',
      children: [
        {
          path: 'internshipTyping',
          component: internshipTypingPage
        },
        {
          path: 'internshipAdd',
          component: internshipAddPage
        },
        {
          path: 'teacherArrangement',
          component: teacherArrangementPage
        },
        {
          path: 'teacherAdd',
          component: teacherAddPage
        },
        {
          path: 'informationAcquisition',
          component: informationAcquisitionPage
        },
        {
          path: 'studentList',
          component: studentListPage
        },
        {
          path: 'studentAdd',
          component: studentAddPage
        }
      ]
    },
    {
      path: '/internshipProcess',
      component: internshipProcessPage,
      redirect: '/internshipProcess/guidanceRecord',
      children: [
        {
          path: 'guidanceRecord',
          component: guidanceRecordPage
        },
        {
          path: 'guidanceRecordAdd',
          component: guidanceRecordAddPage
        },
        {
          path: 'processTracking',
          component: processTrackingPage
        },
        {
          path: 'processTrackingAdd',
          component: processTrackingAddPage
        },
        {
          path: 'aidedTracking',
          component: aidedTrackingPage
        },
        {
          path: 'studentMessage',
          component: studentMessagePage
        },
        {
          path: 'studentMessageAdd',
          component: studentMessageAddPage
        },
        {
          path: 'studentMessageReply',
          component: studentMessageReplyPage
        }
      ]
    },
    {
      path: '/assessment',
      component: assessmentPage,
      redirect: '/assessment/internalTeacherAssessment',
      children: [
        {
          path: 'internalTeacherAssessment',
          component: internalTeacherAssessmentPage
        },
        {
          path: 'externalTeacherAssessment',
          component: externalTeacherAssessmentPage
        },
        {
          path: 'studentAssessment',
          component: studentAssessmentPage
        },
        {
          path: 'indexSetting',
          component: indexSettingPage
        }
      ]
    },
  ]
})
