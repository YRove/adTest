<template>
    <el-header style="font-size: 14px;width:100%;">
        <router-link :to="{path:'/first'}">
            <span class="el-header-index"><i class="el-icon-star-on"></i>注册页</span>
        </router-link>
    </el-header>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                data: [],
                pagesize: 10,
                crossId: 1
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
            }, handleCommand(command) {

                if (command === 'logout') {

                    // 登录
                    axios.get('/logout').then(res => {

                        if (res.data.resultCode === '0') {

                            this.$message.warning('登出成功！')
                            this.$router.push({path: `/login`});

                        } else {

                            this.$message.warning('登出失败！')
                            return false
                        }


                    })
                }
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
</style>
