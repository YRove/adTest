/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入组件
import index from '@/pages/index.vue'
import basePersionalInformation from '@/pages/basePersionalInformation/basePersionalInformation'
import articlePath from '@/pages/articlePath/articlePath.vue'
import managelogin from '@/login/manageLogin'
import aside from '@/components/aside/index'
import adExamOne from '@/components/exam/adExamOne'
import constantValue from '@/components/exam/constantValue'
import errorCode from '@/components/exam/errorCode'
import protocol from '@/components/exam/protocol'
import sequence from '@/components/exam/sequence'
import newInterface from '@/components/interface/newInterface/newInterface'
import essentialInformation from '@/components/interface/interfaceAll/essentialInformation'
import routeConfiguration from '@/components/interface/interfaceAll/routeConfiguration'
import valiRequest from '@/components/interface/routeConfiguration/valiRequest'
import valiResponse from '@/components/interface/routeConfiguration/valiResponse'
import assemble from '@/components/interface/routeConfiguration/assemble'
import errorMap from '@/components/interface/routeConfiguration/errorMap'
import parser from '@/components/interface/routeConfiguration/parser'
import communication from '@/components/interface/routeConfiguration/communication'
import login from '@/login/login'
import notFound from '@/components/common/404'
import serverRouteConfiguration from '@/components/interface/interfaceAll/serverRouteConfiguration'
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
            },
            {
                path: '/aside/newInterface',
                component: newInterface,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/aside/essentialInformation',
                component: essentialInformation,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/aside/routeConfiguration',
                component: routeConfiguration,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/aside/serverRouteConfiguration',
                component: serverRouteConfiguration,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/aside/valiRequest',
                component: valiRequest,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/aside/valiResponse',
                component: valiResponse,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/aside/assemble',
                component: assemble,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/aside/errorMap',
                component: errorMap,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/aside/parser',
                component: parser,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/aside/communication',
                component: communication,
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
        path: '/',
        redirect: 'login'
    }, {
        path: "/404",
        name: "notFound",
        component: notFound
    }, {
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
//     this.$axios.get('api/isLogin').then(res => {

//         islogin = res.data;

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
