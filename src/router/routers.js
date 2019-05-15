/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入组件
import index from '@/pages/index.vue'
import select from '@/pages/select/select'
//个人基本信息路由
import basePersionalInformation from '@/pages/basePersionalInformation/basePersionalInformation'
import communityPersonalInformation from '@/pages/basePersionalInformation/communityPersonalInformation'
import hCarePersonalInformation from '@/pages/basePersionalInformation/hCarePersonalInformation'
import scientificPersonalInformation from '@/pages/basePersionalInformation/scientificPersonalInformation'

import communityMessage from '@/pages/communityMessage/communityMessage'
import gradeStandard from '@/pages/gradeStandard/gradeStandard'
import statAnalysis from '@/pages/statAnalysis/statAnalysis'
import wholeStatAnalysis from '@/pages/statAnalysis/wholeStatAnalysis'
import testPaperResult from '@/pages/testPaperResult/testPaperResult'
import articlePath from '@/pages/articlePath/articlePath.vue'
import logicTrain from '@/pages/memoryTrain/logicTrain'
import eyeTrain from '@/pages/memoryTrain/eyeTrain'
import memoryExplanation from '@/pages/memoryTrain/memoryExplanation'
import memoryTimeCapsule from '@/pages/memoryTrain/memoryTimeCapsule'
import userMessageAdmin from '@/pages/userMessageAdmin/userMessageAdmin'
import aside from '@/components/aside/index'
import adExamOne from '@/components/exam/adExamOne'
import questionManage from '@/pages/questionManage/questionManage'

import login from '@/login/login'
import managelogin from '@/login/manageLogin'
import healthCareLogin from '@/login/healthCareLogin'
import communityLogin from '@/login/communityLogin'
import FrontRegister from '@/pages/register/register'

import notFound from '@/components/common/404'

import adExamTwo from '@/components/exam/adExamTwo'
import adExamThree from '@/components/exam/adExamThree'
import adExamFour from '@/components/exam/adExamFour'
import adExamFive from '@/components/exam/adExamFive'


// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter)

const routes = [
    { path: '/index', name: 'index', component: index,
        // meta: {
        //     requiresAuth: true
        // },
      children: [
        { path: '/frontregister', name: 'frontregister', component: FrontRegister}
      ]
    },
    {
        path: '/login', name: 'login', component: login,
    },
    {
        path: '/managelogin', name: 'managelogin' , component: managelogin
    },
    {
        path: '/healthCareLogin', name: 'healthCareLogin' , component: healthCareLogin
    },
    {
        path: '/communityLogin', name: 'communityLogin', component: communityLogin
    },
    {
        path: '/aside',name: 'aside',mode: 'history', base: '/ttms/',component: aside,props: true,
        children: [
            {
                path: '/aside/adExamOne',component: adExamOne,
                // meta: {
                //     requiresAuth: true
                // }
            },
            {
                path: '/aside/basePersionalInformation',component: basePersionalInformation
            },
            {
                path: '/aside/communityPersonalInformation',component: communityPersonalInformation
            },
            {
                path: '/aside/hCarePersonalInformation',component: hCarePersonalInformation
            },
            {
                path: '/aside/scientificPersonalInformation',component: scientificPersonalInformation
            },
            {
                path: '/aside/communityMessage',component: communityMessage
            },
            {
                path: '/aside/gradeStandard',component: gradeStandard
            },
            {
                path: '/aside/statAnalysis',component: statAnalysis
            },
            {
                path: '/aside/wholeStatAnalysis', component: wholeStatAnalysis
            },
            {
                path: '/aside/testPaperResult',component: testPaperResult
            },
            {
                path: '/aside/logicTrain',component: logicTrain
            },
            {
                path: '/aside/eyeTrain',component: eyeTrain
            },
            {
                path: '/aside/memoryExplanation',component: memoryExplanation
            },
            {
                path: '/aside/memoryTimeCapsule',component: memoryTimeCapsule
            },
            {
                path: '/aside/userMessageAdmin',component: userMessageAdmin
            },
            {
                path: '/aside/articlePath',component: articlePath
            },
            {
                path: '/aside/questionManage', component: questionManage
            },
            {
                path: '/aside/adExamTwo',
                component: adExamTwo,
                // meta: {
                //     requiresAuth: true
                // }
            },
            {
                path: '/aside/adExamThree',
                component: adExamThree,
                // meta: {
                //     requiresAuth: true
                // }
            },
            {
                path: '/aside/adExamFour',
                component: adExamFour,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/aside/adExamFive',
                component: adExamFive,
                meta: {
                    requiresAuth: true
                }
            }
        ]
    },
    {
        path: '/frontregister',
        name: 'FrontRegister',
        component: FrontRegister
    },
    {
        path: "/select",
        name: "select",
        component: select
    },
    {
        path: '/',
        redirect: 'select'
    },
    {
        path: "/404",
        name: "notFound",
        component: notFound
    },
    {
        path: "*", // 此处需特别注意置于最底部
        redirect: "/404"
    }
]


var router = new VueRouter({
    routes
})

// router.beforeEach((to, from, next) => {
//     // 可以在路由元信息指定哪些页面需要登录权限
//     var islogin = false // 假设没有登录（这里应从接口获取）
//     this.$axios.post('api/login').then(res => {

//         islogin = res;

//         if (to.meta.requiresAuth && !islogin) { // 需要登录授权，这里还需要判断是否登录
//             next('/login')// 跳转到登录
//             return;
//         }

//         next()
//     }).catch(error => {
//         // this.hideLoading();
//     });


// })

// eslint-disable-next-line eol-last
export default router
