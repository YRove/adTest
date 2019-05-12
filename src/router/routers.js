/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入组件
import index from '@/pages/index.vue'
import select from '@/pages/select/select'
import basePersionalInformation from '@/pages/basePersionalInformation/basePersionalInformation'
import communityMessage from '@/pages/communityMessage/communityMessage'
import gradeStandard from '@/pages/gradeStandard/gradeStandard'
import statAnalysis from '@/pages/statAnalysis/statAnalysis'
import testPaperResult from '@/pages/testPaperResult/testPaperResult'
import articlePath from '@/pages/articlePath/articlePath.vue'
import logicTrain from '@/pages/memoryTrain/logicTrain'
import eyeTrain from '@/pages/memoryTrain/eyeTrain'
import memoryExplanation from '@/pages/memoryTrain/memoryExplanation'
import memoryTimeCapsule from '@/pages/memoryTrain/memoryTimeCapsule'
import userMessageAdmin from '@/pages/userMessageAdmin/userMessageAdmin'
import aside from '@/components/aside/index'
import adExamOne from '@/components/exam/adExamOne'
import constantValue from '@/components/exam/constantValue'
import errorCode from '@/components/exam/errorCode'
import protocol from '@/components/exam/protocol'
import sequence from '@/components/exam/sequence'

import login from '@/login/login'
import managelogin from '@/login/manageLogin'
import healthCareLogin from '@/login/healthCareLogin'
import communityLogin from '@/login/communityLogin'
import notFound from '@/components/common/404'
import FrontRegister from '@/pages/register/register'


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
                path: '/aside/communityMessage',component: communityMessage
            },
            {
                path: '/aside/gradeStandard',component: gradeStandard
            },
            {
                path: '/aside/statAnalysis',component: statAnalysis
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
                path: '/aside/constantValue',
                component: constantValue,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/aside/errorCode',
                component: errorCode,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/aside/protocol',
                component: protocol,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/aside/sequence',
                component: sequence,
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
