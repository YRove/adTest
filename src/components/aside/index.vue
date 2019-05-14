<template>
    <el-container  v-if="type == 1">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246);">
            <el-menu class="el-menu-vertical-demo" :default-active="$route.path" @select="handleSelect">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-setting"></i>记忆力检测模块</template>
                    <el-menu-item-group>
                        <router-link :to="{path:'/aside/adExamOne',query:{institutionCode:code}}">
                            <el-menu-item index="/aside/adExamOne">记忆检测试卷一</el-menu-item>
                        </router-link>
                        <router-link :to="{path:'/aside/errorCode',query:{institutionCode:code}}">
                            <el-menu-item index="1-3">记忆检测试卷二</el-menu-item>
                        </router-link>
                        <router-link :to="{path:'/aside/protocol',query:{institutionCode:code}}">
                            <el-menu-item index="1-4">记忆检测试卷三</el-menu-item>
                        </router-link>
                        <router-link :to="{path:'/aside/constantValue',query:{institutionCode:code}}">
                            <el-menu-item index="1-5">记忆检测试卷四</el-menu-item>
                        </router-link>
                        <router-link :to="{path:'/aside/sequence',query:{institutionCode:code}}">
                            <el-menu-item index="1-6">记忆检测试卷五</el-menu-item>
                        </router-link>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-menu"></i>记忆力训练模块</template>
                    <el-menu-item-group>
                        <router-link :to="{path:'/aside/logicTrain',query:{institutionCode:code}}">
                            <el-menu-item index="/aside/logicTrain">逻辑训练</el-menu-item>
                        </router-link>
                        <router-link :to="{path:'/aside/eyeTrain',query:{institutionCode:code}}">
                            <el-menu-item index="/aside/eyeTrain">眼力游戏训练</el-menu-item>
                        </router-link>
                        <router-link :to="{path:'/aside/memoryExplanation',query:{institutionCode:code}}">
                            <el-menu-item index="/aside/memoryExplanation">记忆法讲解及训练</el-menu-item>
                        </router-link>
                        <router-link :to="{path:'/aside/memoryTimeCapsule',query:{institutionCode:code}}">
                            <el-menu-item index="/aside/memoryTimeCapsule">记忆时间囊</el-menu-item>
                        </router-link>
                    </el-menu-item-group>
                </el-submenu>
                <router-link :to="{path:'/aside/articlePath',query:{institutionCode:code}}">
                    <el-menu-item index="/aside/articlePath">
                        <template slot="title"><i class="el-icon-star-off"></i>文章模块</template>
                    </el-menu-item>
                </router-link>
                <router-link :to="{path:'/aside/basePersionalInformation',query:{institutionCode:code}}">
                    <el-menu-item index="/aside/basePersionalInformation">
                        <template slot="title"><i class="el-icon-document"></i>个人基本情况表</template>
                    </el-menu-item>
                </router-link>
                <router-link :to="{path:'/aside/testPaperResult',query:{institutionCode:code}}">
                    <el-menu-item index="aside/testPaperResult">
                        <template slot="title"><i class="el-icon-search"></i>试卷成绩</template>
                    </el-menu-item>
                </router-link>
                <router-link :to="{path:'/aside/statAnalysis',query:{institutionCode:code}}">
                    <el-menu-item index="/aside/statAnalysis">
                        <template slot="title"><i class="el-icon-edit"></i>统计分析</template>
                    </el-menu-item>
                </router-link>
                <router-link :to="{path:'/aside/gradeStandard',query:{institutionCode:code}}">
                    <el-menu-item index="/aside/gradeStandard">
                        <template slot="title"><i class="el-icon-star-off"></i>量表评分规范</template>
                    </el-menu-item>
                </router-link>
                <router-link :to="{path:'/aside/communityMessage',query:{institutionCode:code}}">
                    <el-menu-item index="/aside/communityMessage">
                        <template slot="title"><i class="el-icon-document"></i>社区卫生中心信息</template>
                    </el-menu-item>
                </router-link>
            </el-menu>
        </el-aside>
        <router-view></router-view>
    </el-container>
    <el-container  v-else-if="type == 2">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246);">
            <el-menu class="el-menu-vertical-demo">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-setting"></i>题库管理</template>
                    <el-menu-item-group>
                        <router-link :to="{path:'/aside/questionManage',query:{institutionCode:code}}">
                            <el-menu-item index="/aside/questionManage">题目汇总</el-menu-item>
                        </router-link>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-menu"></i>用户信息管理</template>
                    <el-menu-item-group>
                        <router-link :to="{path:'/aside/userMessageAdmin',query:{institutionCode:code}}">
                            <el-menu-item index="/aside/userMessageAdmin">用户信息管理</el-menu-item>
                        </router-link>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>
        <router-view></router-view>
    </el-container>
    <el-container  v-else-if="type == 3">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246);">
            <el-menu class="el-menu-vertical-demo">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-setting"></i>题库管理</template>
                    <el-menu-item-group>
                        <router-link :to="{path:'/aside/questionManage',query:{institutionCode:code}}">
                            <el-menu-item index="/aside/questionManage">题目汇总</el-menu-item>
                        </router-link>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-menu"></i>用户信息管理</template>
                    <el-menu-item-group>
                        <router-link :to="{path:'/aside/userMessageAdmin',query:{institutionCode:code}}">
                            <el-menu-item index="/aside/userMessageAdmin">用户信息管理</el-menu-item>
                        </router-link>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>
        <router-view></router-view>
    </el-container>
    <el-container  v-else-if="type == 4">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246);">
            <el-menu class="el-menu-vertical-demo" :default-active="$route.path">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-setting"></i>题库管理</template>
                    <el-menu-item-group>
                        <router-link :to="{path:'/aside/questionManage',query:{institutionCode:code}}">
                            <el-menu-item index="/aside/questionManage">题目汇总</el-menu-item>
                        </router-link>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-menu"></i>社区用户信息管理</template>
                    <el-menu-item-group>
                        <router-link :to="{path:'/aside/userMessageAdmin',query:{institutionCode:code}}">
                            <el-menu-item index="/aside/userMessageAdmin">用户信息管理</el-menu-item>
                        </router-link>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>
        <router-view></router-view>
    </el-container>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                data: [],
                datas: [],
                code1: [],
                code: '',
                form: {},
                type: 0,
                activeIndex: '/aside/basePersionalInformation'
            }
        },
        created() {
            this.type = this.$route.query.type;
            this.code = this.$route.query.institutionCode;
            // this.init();
            this.$root.eventHub.$on('onSubmit', ()=>{
                this.init();
            });
        },
        mounted() {
            //this.init();
        },
        watch: {
            $route() {
                this.handleSelect(this.activeIndex);
            }
        },
        methods: {
            handleSelect(index) {
                this.activeIndex = index;
            },
            init() {
                axios.get('api/transCode/getTransCodeByInstanceCode', {
                    params: {
                        instanceCode: this.code
                    }
                }).then(res => {
                    //alert("param init");
                    this.data = res.data.data;
                    this.form = this.$route.params.form;
                    if (this.form !== undefined) {
                        this.datas.push(this.form);
                    }
                    this.selectData(this.code);
                    this.hideLoading();
                }).catch(error => {
                    this.hideLoading();
                });
            },
            hideLoading() {
                this.loading = true;
            },
            selectData(code) {
                //   const isBigEnough = x => x === code;
                function isBigEnough(x) {
                    return x.institutionCode === code;
                }
            }
        },
        beforeDestroy() {
            this.$root.eventHub.$off('onSubmit');
        },
    }
</script>

<style scoped lang="scss">
    .el-header {
        background-color: #47c0e6;
        color: #fff;
        line-height: 60px;
        &-index {
            font-size: 20px;
            color: #fff;
            float: left;
        }
    }

    .el-dropdown {
        color: #fff;
        position: absolute;
        right: 80px;
    }

    .el-container {
        height: 100%;
    }

    .el-menu {
        height: 100%;
        border-right: 3px solid #ebf0f3;
        & li {
            text-align: left;
        }
    }

    .el-aside {
        color: #333;
        border-top: 0;
    }

    .el-submenu__title {
        padding: 0 80px;
    }

    .el-submenu {
        .el-menu-item {
            padding: 0 100px;
        }
    }

    .super-title {
        font-size: 30px;
        text-align: left;
        color: black;
        margin: 20px 40px;
        border-bottom: 1px solid #ebf0f3;
    }

    .super-ul {
        display: table;
        width: 100%;
        padding-left: 0;
        li {
            flex: 1;
            float: left;
        }
    }

    .el-form-search {
        margin: -50px 0 0 500px;
    }

    .super-contain {
        width: 295px;
        height: 130px;
        border: 1px solid #67C23A;
        border-radius: 4px;
        margin: 0 10px 20px 12px;
        &-message {
            text-align: right;
            background: #67C23A;
            padding-top: 10px;
            padding-bottom: 5px;
            p {
                margin-right: 20px;
                margin-top: 0;
                color: #fff;
            }
        }
        &-footer {
            color: #67C23A;
            text-align: left;
            margin: 5px 0 0 20px;
        }
    }
</style>
