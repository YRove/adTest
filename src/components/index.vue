<template>
    <el-header style="font-size: 14px;width:100%;">
        <span class="el-header-index"><i class="el-icon-star-on"></i>普通用户</span>
        <el-dropdown>
            <span class="el-dropdown-link">
                <span class="user-image"><img :src="headImage" alt=""></span>
                <span>{{userData.userName}}</span>
            </span>
            <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <el-dropdown-item>
                <a>
                查看个人信息
                <i class="fa fa-id-card-o fa-fw"></i>
                </a>
            </el-dropdown-item>
            <el-dropdown-item>
                <a>
                修改密码
                <i class="fa fa-key fa-fw"></i>
                </a>
            </el-dropdown-item>
            <el-dropdown-item>
                <a @click="loginOut">
                退出登录
                <i class="fa fa-sign-out fa-lg"></i>
                </a>
            </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </el-header>
</template>

<script>
    import axios from 'axios';
    import constant from '../assets/js/constant';

    export default {
        props:{
        userData: {
            type: Object,
            default: function () {
            return {

            }
            }
        }
        },
        data() {
            return {
                data: [],
                pagesize: 10,
                crossId: 1,
                headImage: require('../assets/img/userdefault.png')
            }
        },
        created() {
            //this.init();
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {

            },
            toDetail(id) {
                this.$router.push({path: `/index/${id}`});
                this.crossId = id;
            },
            hideLoading() {
                this.loading = false;
            }, 
            // handleCommand(command) {

                // if (command === 'logout') {

                //     // 登录
                //     axios.get('/logout').then(res => {

                //         if (res.data.resultCode === '0') {

                //             this.$message.warning('登出成功！')
                //             this.$router.push({path: `/login`});

                //         } else {

                //             this.$message.warning('登出失败！')
                //             return false
                //         }


                //     })
                // }
            // },
            loginOut(){
                // this.$axios.post('/logout').then(response => {
                // let res = response;
                //     if (res.status == 0) {
                //         this.$message.success('退出成功')
                //         this.$router.push({name:'EndLogin'})
                //     }
                // })
                this.$router.push({path: '/select'});
            }
        }
    }
</script>

<style>
    body {
        margin: 0;
        padding: 0;
    }

    a, a:hover {
        text-decoration: none;
    }

    a:hover {
        color: #47c0e6;
    }

    .el-menu-item-group__title {
        display: none;
    }
</style>

<style scoped lang="scss">
    a {
        color: #333;
    }

    .el-header {
        background-color: rgb(123,104,238);
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

    .el-menu {
        height: 100%;
        border-right: 3px solid #ebf0f3;
        & li {
            text-align: left;
        }
    }
    .user-dropdown{
    font-size: 13px;
    a i{
      float: right;
      line-height: 36px;
    }
    }
    .user-image{
        display: inline-block;
        width: 30px;
        height:30px;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 8px;
        overflow: hidden;
        cursor: pointer;
        img{
        display: block;
        width: 100%;
        }
    }
</style>
